import { Request, Response } from 'express';

// GET at '/api/open-library/search/isbn/:isbn'
// searches openLibrary by ISBN.
export default async function searchISBN(req: Request, res: Response) {
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