import express from 'express';

const searchRouter = express.Router();

import { Request, Response } from 'express';

// GET at '/api/open-library/search' 
export async function searchAll(req: Request, res: Response) {
    const q = req.query.q;

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=0&limit=10&lang=en&fields=author_key,author_name,cover_i,first_publish_year,key,title,subtitle`, {
            headers: {
                'Content-type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error('could not fetch search from open library at searchAll(). check network tab');
        }
    
        const bookArray = await response.json();
    
        res.json(bookArray);
    } catch (error: any) {
    res.status(500).json({ message: error.message });
    }
}

searchRouter.get('/', searchAll);

// GET at '/api/open-library/search/titles' 
export async function searchTitles(req: Request, res: Response) {
    const q = req.query.q;
    // const type = req.query.type;

    try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${q}&fields=key,title,author_key,author_name,cover_edition_key,first_publish_year&limit=10&page=1`, {
            headers: {
                'Content-type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error('could not fetch titles from open library at searchTitles(). check network tab');
        }
    
        const bookArray = await response.json();
    
        res.json(bookArray);
    } catch (error: any) {
    res.status(500).json({ message: error.message });
    }
}

searchRouter.get('/titles', searchTitles);


// GET at '/api/open-library/search/authors'
export async function searchAuthors(req: Request, res: Response) {
    const q = req.query.q;

    try {
        const response = await fetch(`https://openlibrary.org/search/authors.json?q=${q}&fields=key,name,work_count,birth_date&limit=10&offset=0`, {
            headers: {
                'Content-type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error('could not fetch authors from open library at searchAuthors(). check network tab');
        }
    
        const authorArray = await response.json();
    
        res.json(authorArray);
    } catch (error: any) {
    res.status(500).json({ message: error.message });
    }
}

searchRouter.get('/authors', searchAuthors);


// GET at '/api/open-library/search/isbn/:isbn'
export async function searchISBN(req: Request, res: Response) {
    const isbn = req.params.isbn;
    console.log('isbn from searchISBN:', isbn);

    try {
        const isbnResponse = await fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
            headers: {
                'Content-type': 'application/json'
            },
        });

        console.log('isbnResponse:', isbnResponse);
    
        if (!isbnResponse.ok) {
            throw new Error('could not fetch isbn from open library at searchISBNs(). check network tab');
        }
    
        const edition = await isbnResponse.json();

        console.log('edition:', edition);

        // START
        // 3) collect all unique author keys across all entries
        if (edition.authors) {
          const allAuthorKeys = edition.authors.map((author: { key: string }) => {
            const key = author.key;
            if (key) return key;
            return;
          });
  
          console.log('allAuthorKeys:', allAuthorKeys);
  
          // 4) fetch each unique author safely and build a map key->json (null if failed)
          const authorPromises = allAuthorKeys.map(async (authorKey: any) => {
            try {
              const response = await fetch(`https://openlibrary.org${authorKey}.json`, 
                { headers: { 'Content-Type': 'application/json' } }
              );
  
              if (!response.ok) {
                console.error(`Author fetch failed for ${authorKey}: ${response.status}`);
                return [authorKey, null] as const;
              }
  
              const author = await response.json();
  
              return author;
            } catch (err) {
              console.error(`Author fetch/parse error for ${authorKey}:`, err);
              return [authorKey, null] as const;
            }
          });
  
          const authorEntries = await Promise.all(authorPromises);
  
          console.log('authorEntries:', authorEntries);
          
          const editionWithAuthors = 
              {
                ...edition,
                coverUrl: edition.covers ? `https://covers.openlibrary.org/b/id/${edition.covers[0]}-L.jpg` : '',
                authors: authorEntries,
              } 
  
  
  
          console.log('editionWithAuthors:', editionWithAuthors);
  
          return res.json(editionWithAuthors);
        } else {
          return res.json({
            ...edition,
            coverUrl: edition.covers ? `https://covers.openlibrary.org/b/id/${edition.covers[0]}-L.jpg` : '',
            authors: [],
          })
        }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
}

searchRouter.get('/isbn/:isbn', searchISBN);


// GET at /api/open-library/search/author/:key
export async function searchAuthor(req: Request, res: Response) {
  const authorKey = req.params.key;

  try {
    const authorResponse = await fetch(`https://openlibrary.org/authors/${authorKey}.json`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!authorResponse.ok) {
      throw new Error(`Failed fetching authorResponse (${authorKey}): ${authorResponse.status}`);
    }

    const authorInfo = await authorResponse.json();

    const authorWorksResponse = await fetch(`https://openlibrary.org/authors/${authorKey}/works.json?limit=10&offset=0`);

    if (!authorWorksResponse.ok) {
      throw new Error(`Failed fetching authorWorksResponse (${authorKey}): ${authorWorksResponse.status}`);
    }

    const authorWorksInfo = await authorWorksResponse.json();

    const response = {
      authorInfo: authorInfo,
      authorWorksInfo: authorWorksInfo,
    };

    return res.json(response);
  } catch (error: any) {
    console.error('searchAuthor error:', error);
    return res.status(500).json({ message: error?.message ?? String(error) });
  }
}

searchRouter.get('/author/:key', searchAuthor);


// GET at /api/open-library/search/work/:key
export async function searchWork(req: Request, res: Response) {
  const workKey = req.params.key;
  try {
    // 1) fetch work info
    const workInfoResponse = await fetch(`https://openlibrary.org/works/${workKey}.json`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!workInfoResponse.ok) {
      throw new Error(`Failed fetching workInfo (${workKey}): ${workInfoResponse.status}`);
    }
    const workInfo = await workInfoResponse.json();

    // 2) fetch editions
    const editionsResp = await fetch(`https://openlibrary.org/works/${workKey}/editions.json`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!editionsResp.ok) {
      throw new Error(`Failed fetching editions (${workKey}): ${editionsResp.status}`);
    }
    const workEditions = await editionsResp.json();

    const workInfoAuthors = await Promise.all(
      (workInfo.authors || []).map(async (author: { author: { key: string } }) => {
        try {
          const response = await fetch(`https://openlibrary.org/${author.author.key}.json`);
          if (!response.ok) {
            console.warn('workInfo author fetch returned non-ok', author);
            return 'Unknown Author';
          }
          const authorResponse = await response.json();
          return authorResponse;
        } catch (err) {
          console.error('workInfo author fetch error', err);
          return 'Unknown Author';
        }
      })
    );

    // for every entry in workEditions.entries, check if it has entry.authors. 
    // if it contains entry.authors and the array is not empty, fetch author info for each author in entry.authors.
    // return the entire entry (...entry), but replace entry.authors with the array of authorInfo Promises. 
    // if entry does not contain entry.authors, or if entry.authors is empty, return the entire entry (...entry), but add/replace entry.authors with workInfo.authors.

    const allUniqueAuthorKeys = new Set<string>();

    workEditions.entries.forEach((entry: any) => {
      if (entry.authors) {
        entry.authors.forEach((author: any) => {
          const key = author?.key || (author?.author && author.author.key);
          if (key) allUniqueAuthorKeys.add(key);
        });
      }
    })

    const allUniqueAuthorInfo = await Promise.all(
      Array.from(allUniqueAuthorKeys).map(async (key) => {
        try{
          const response = await fetch(`https://openlibrary.org${key}.json`, 
            { headers: { 'Content-Type': 'application/json' } }
          );
    
          if (!response.ok) {
            throw new Error(`Author fetch failed for ${key}: ${response.status}`)
          }

          const authorInfo = response.json();

          return authorInfo;
        } catch(error) {
          console.error(error);
        }
    }));

    const uniqueAuthorInfoMap = new Map(
      allUniqueAuthorInfo.map((author) => {
        return [author.key, author]
      })
    )

    const workEditionsWithAuthors = workEditions.entries.map((entry: any) => {
      if (entry.authors && entry.authors.length > 0) {
        const entryAuthors = entry.authors.map((author: any) => {
          if (uniqueAuthorInfoMap.has(author.key)) {
            return uniqueAuthorInfoMap.get(author.key);
          }
        })

        return {
          ...entry,
          authors: entryAuthors,
        }
      } else {
        return {
          ...entry,
          authors: workInfoAuthors,
        }
      }
    });

    workEditionsWithAuthors.map((entry: any) => {
      entry.covers ? entry.coverUrl = `https://covers.openlibrary.org/b/id/${entry.covers[0]}-L.jpg` : entry.coverUrl = null
    });

    const response = {
      workInfo: workInfo,
      workInfoAuthors: workInfoAuthors,
      workEditions: workEditionsWithAuthors,
    };

    return res.json(response);
  } catch (error: any) {
    console.error('searchWork error:', error);
    return res.status(500).json({ message: error?.message ?? String(error) });
  }
}

searchRouter.get('/work/:key', searchWork);


// GET at /api/open-library/search/edition/:key
export async function searchEdition(req: Request, res: Response) {
  const workKey = req.params.key;
  try {
    // 1) fetch work info
    const workInfoResponse = await fetch(`https://openlibrary.org/works/${workKey}.json`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!workInfoResponse.ok) {
      throw new Error(`Failed fetching workInfo (${workKey}): ${workInfoResponse.status}`);
    }
    const workInfo = await workInfoResponse.json();

    // 2) fetch editions
    const editionsResp = await fetch(`https://openlibrary.org/works/${workKey}/editions.json`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!editionsResp.ok) {
      throw new Error(`Failed fetching editions (${workKey}): ${editionsResp.status}`);
    }
    const workEditions = await editionsResp.json();

    const workInfoAuthors = await Promise.all(
      (workInfo.authors || []).map(async (author: { author: { key: string } }) => {
        try {
          const response = await fetch(`https://openlibrary.org/${author.author.key}.json`);
          if (!response.ok) {
            console.warn('workInfo author fetch returned non-ok', author);
            return 'Unknown Author';
          }
          const authorResponse = await response.json();
          return authorResponse;
        } catch (err) {
          console.error('workInfo author fetch error', err);
          return 'Unknown Author';
        }
      })
    );

    // for every entry in workEditions.entries, check if it has entry.authors. 
    // if it contains entry.authors and the array is not empty, fetch author info for each author in entry.authors.
    // return the entire entry (...entry), but replace entry.authors with the array of authorInfo Promises. 
    // if entry does not contain entry.authors, or if entry.authors is empty, return the entire entry (...entry), but add/replace entry.authors with workInfo.authors.

    const allUniqueAuthorKeys = new Set<string>();

    workEditions.entries.forEach((entry: any) => {
      if (entry.authors) {
        entry.authors.forEach((author: any) => {
          const key = author?.key || (author?.author && author.author.key);
          if (key) allUniqueAuthorKeys.add(key);
        });
      }
    })

    const allUniqueAuthorInfo = await Promise.all(
      Array.from(allUniqueAuthorKeys).map(async (key) => {
        try{
          const response = await fetch(`https://openlibrary.org${key}.json`, 
            { headers: { 'Content-Type': 'application/json' } }
          );
    
          if (!response.ok) {
            throw new Error(`Author fetch failed for ${key}: ${response.status}`)
          }

          const authorInfo = response.json();

          return authorInfo;
        } catch(error) {
          console.error(error);
        }
    }));

    const uniqueAuthorInfoMap = new Map(
      allUniqueAuthorInfo.map((author) => {
        return [author.key, author]
      })
    )

    const workEditionsWithAuthors = workEditions.entries.map((entry: any) => {
      if (entry.authors && entry.authors.length > 0) {
        const entryAuthors = entry.authors.map((author: any) => {
          if (uniqueAuthorInfoMap.has(author.key)) {
            return uniqueAuthorInfoMap.get(author.key);
          }
        })

        return {
          ...entry,
          authors: entryAuthors,
        }
      } else {
        return {
          ...entry,
          authors: workInfoAuthors,
        }
      }
    });

    workEditionsWithAuthors.map((entry: any) => {
      entry.covers ? entry.coverUrl = `https://covers.openlibrary.org/b/id/${entry.covers[0]}-L.jpg` : entry.coverUrl = null
    });

    const response = {
      workInfo: workInfo,
      workInfoAuthors: workInfoAuthors,
      workEditions: workEditionsWithAuthors,
    };

    return res.json(response);
  } catch (error: any) {
    console.error('searchWork error:', error);
    return res.status(500).json({ message: error?.message ?? String(error) });
  }
}

searchRouter.get('/work/:key', searchWork);


export default searchRouter;