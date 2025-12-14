// import { Request, Response } from 'express';

// // GET at /api/open-library/search/edition/:key
// // searches openLibrary for a specific edition by key
// export default async function searchEdition(req: Request, res: Response) {
//   const workKey = req.params.key;
//   try {
//     // fetch work info
//     const workInfoResponse = await fetch(`https://openlibrary.org/works/${workKey}.json`, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!workInfoResponse.ok) {
//       throw new Error(`Failed fetching workInfo (${workKey}): ${workInfoResponse.status}`);
//     }
//     const workInfo = await workInfoResponse.json();

//     // fetch editions
//     const editionsResp = await fetch(`https://openlibrary.org/works/${workKey}/editions.json`, {
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!editionsResp.ok) {
//       throw new Error(`Failed fetching editions (${workKey}): ${editionsResp.status}`);
//     }
//     const workEditions = await editionsResp.json();

//     const workInfoAuthors = await Promise.all(
//       (workInfo.authors || []).map(async (author: { author: { key: string } }) => {
//         try {
//           const response = await fetch(`https://openlibrary.org/${author.author.key}.json`);
//           if (!response.ok) {
//             console.warn('workInfo author fetch returned non-ok', author);
//             return 'Unknown Author';
//           }
//           const authorResponse = await response.json();
//           return authorResponse;
//         } catch (err) {
//           console.error('workInfo author fetch error', err);
//           return 'Unknown Author';
//         }
//       })
//     );

//     // for every entry in workEditions.entries, check if it has entry.authors. 
//     // if it contains entry.authors and the array is not empty, fetch author info for each author in entry.authors.
//     // return the entire entry (...entry), but replace entry.authors with the array of authorInfo Promises. 
//     // if entry does not contain entry.authors, or if entry.authors is empty, return the entire entry (...entry), but add/replace entry.authors with workInfo.authors.

//     const allUniqueAuthorKeys = new Set<string>();

//     workEditions.entries.forEach((entry: any) => {
//       if (entry.authors) {
//         entry.authors.forEach((author: any) => {
//           const key = author?.key || (author?.author && author.author.key);
//           if (key) allUniqueAuthorKeys.add(key);
//         });
//       }
//     })

//     const allUniqueAuthorInfo = await Promise.all(
//       Array.from(allUniqueAuthorKeys).map(async (key) => {
//         try{
//           const response = await fetch(`https://openlibrary.org${key}.json`, 
//             { headers: { 'Content-Type': 'application/json' } }
//           );
    
//           if (!response.ok) {
//             throw new Error(`Author fetch failed for ${key}: ${response.status}`)
//           }

//           const authorInfo = response.json();

//           return authorInfo;
//         } catch(error) {
//           console.error(error);
//         }
//     }));

//     const uniqueAuthorInfoMap = new Map(
//       allUniqueAuthorInfo.map((author) => {
//         return [author.key, author]
//       })
//     )

//     const workEditionsWithAuthors = workEditions.entries.map((entry: any) => {
//       if (entry.authors && entry.authors.length > 0) {
//         const entryAuthors = entry.authors.map((author: any) => {
//           if (uniqueAuthorInfoMap.has(author.key)) {
//             return uniqueAuthorInfoMap.get(author.key);
//           }
//         })

//         return {
//           ...entry,
//           authors: entryAuthors,
//         }
//       } else {
//         return {
//           ...entry,
//           authors: workInfoAuthors,
//         }
//       }
//     });

//     workEditionsWithAuthors.map((entry: any) => {
//       entry.covers ? entry.coverUrl = `https://covers.openlibrary.org/b/id/${entry.covers[0]}-L.jpg` : entry.coverUrl = null
//     });

//     const response = {
//       workInfo: workInfo,
//       workInfoAuthors: workInfoAuthors,
//       workEditions: workEditionsWithAuthors,
//     };

//     return res.json(response);
//   } catch (error: any) {
//     console.error('searchEdition error:', error);
//     return;
//   }
// }