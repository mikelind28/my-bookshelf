import { Request, Response } from 'express';
import { EditionType } from '../../../types/types';

// GET at '/api/open-library/search/isbn/:isbn'
// searches openLibrary by ISBN.
export default async function searchISBN(req: Request, res: Response) {
    const isbn = req.params.isbn;

    try {
      const isbnResponse = await fetch(`https://openlibrary.org/isbn/${isbn}.json`, {
          headers: {
              'Content-type': 'application/json'
          },
      });
  
      if (!isbnResponse.ok) {
          res.status(isbnResponse.status).send(undefined);
          throw new Error(`could not fetch isbn from open library at searchISBNs(). response status: ${isbnResponse.status}`);
      }
  
      const edition: EditionType = await isbnResponse.json();

      // collect all unique author keys
      if (edition.authors) {
        const allAuthorKeys = edition.authors.map((author) => {
          const key = author.key;
          if (key) return key;
          return;
        });

        // fetch each unique author and build a map
        const authorPromises = allAuthorKeys.map(async (authorKey?: string) => {
          try {
            const response = await fetch(`https://openlibrary.org${authorKey}.json`, 
              { headers: { 'Content-Type': 'application/json' } }
            );

            if (!response.ok) {
              console.error(`Author fetch failed for ${authorKey}: ${response.status}`);
              // use null if the fetch fails
              return [authorKey, null] as const;
            }

            const author = await response.json();

            return author;
          } catch (error) {
            console.error(`Author fetch/parse error for ${authorKey}:`, error);
            return [authorKey, null] as const;
          }
        });

        const authorEntries = await Promise.all(authorPromises);
        
        // keep all previous edition info, but add a coverUrl and more detailed author info.
        const editionWithAuthors = 
            {
              ...edition,
              coverUrl: edition.covers ? `https://covers.openlibrary.org/b/id/${edition.covers[0]}-L.jpg` : '',
              authors: authorEntries,
            } 

        res.json(editionWithAuthors);
      } else {
        // if the edition does not contain an authors object, use an empty array.
        res.json({
          ...edition,
          coverUrl: edition.covers ? `https://covers.openlibrary.org/b/id/${edition.covers[0]}-L.jpg` : '',
          authors: [],
        })
      }
    } catch (error) {
      console.error(error);
    }
}