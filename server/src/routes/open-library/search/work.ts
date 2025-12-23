import { Request, Response } from 'express';
import { EditionType, WorkInfoType } from '../../../types/types';

// GET at /api/open-library/search/work/:key
// searches openLibrary for a specific work by key,
// including its editions.
export default async function searchWork(req: Request, res: Response) {
  const pageParam = req.query.page;
  const page = Number(pageParam);

  const workKey = req.params.key;

  let offset = 0;

  if (Number.isInteger(page) && page > 0) {
    offset = (page - 1) * 10;
  }

  try {
    // fetch work info
    const workInfoResponse = await fetch(`https://openlibrary.org/works/${workKey}.json`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!workInfoResponse.ok) {
      throw new Error(`Failed fetching workInfoResponse (${workKey}): ${workInfoResponse.status}`);
    }
    const workInfo: WorkInfoType = await workInfoResponse.json();

    // fetch work's editions
    const editionsResponse = await fetch(`https://openlibrary.org/works/${workKey}/editions.json?limit=10&offset=${offset}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!editionsResponse.ok) {
      throw new Error(`Failed fetching editions (${workKey}): ${editionsResponse.status}`);
    }
    const workEditions = await editionsResponse.json();

    // fetch authors from keys in workInfo — the more general 'workInfo' sometimes returns different authors than the more specific 'workEditions', so i fetch both. 
    const workInfoAuthors = await Promise.all(
      (workInfo.authors ?? []).map(async (author) => {
        try {
          const response = await fetch(`https://openlibrary.org/${author.author.key}.json`);
          if (!response.ok) {
            console.warn(`workInfo author fetch returned non-ok with ${response.status}`, author);
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

    // get all unique author keys from workEditions, so that you can fetch more info about each author.
    const allUniqueAuthorKeys = new Set<string>();

    workEditions.entries.forEach((entry: EditionType) => {
      if (entry.authors) {
        entry.authors.forEach((author) => {
          const key = author.key;
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

    // put all author info in a map object so that you can easily populate each edition with more author info.
    const uniqueAuthorInfoMap = new Map(
      allUniqueAuthorInfo.map((author) => {
        return [author.key, author]
      })
    )

    const workEditionsWithAuthors = workEditions.entries.map((entry: EditionType) => {
      if (entry.authors && entry.authors.length > 0) {
        const entryAuthors = entry.authors.map((author) => {
          if (uniqueAuthorInfoMap.has(author.key)) {
            return uniqueAuthorInfoMap.get(author.key);
          }
        })

        // keep all previous info about the edition entry, but add the newly collected authors' info. 
        return {
          ...entry,
          authors: entryAuthors,
        }
      } else {
        // if the edition entry does not have any authors, use the authors from workInfo instead.
        return {
          ...entry,
          authors: workInfoAuthors,
        }
      }
    });

    // for all editions, if the edition entry contains a 'covers' array, convert it to a URL for easier handling later.
    workEditionsWithAuthors.map((entry: any) => {
      entry.covers ? entry.coverUrl = `https://covers.openlibrary.org/b/id/${entry.covers[0]}-L.jpg` : entry.coverUrl = null
    });

    // send the response back to the client in three parts: general workInfo, the workInfo authors, and the work's editions with added author information.
    const response = {
      workInfo: workInfo,
      workInfoAuthors: workInfoAuthors,
      workEditions: workEditionsWithAuthors,
      numberOfEditions: workEditions.size,
    };

    res.json(response);
  } catch (error) {
    console.error('searchWork error:', error);
  }
}
