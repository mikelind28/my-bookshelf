import { Request, Response } from 'express';

// GET at /api/open-library/search/author/:key
// searches openLibrary for a specific author by key.
export default async function searchAuthor(req: Request, res: Response) {
  const pageParam = req.query.page;
  const page = Number(pageParam);

  const authorKey = req.params.key;

  let offset = 0;

  if (Number.isInteger(page) && page > 0) {
    offset = (page - 1) * 10;
  }

  try {
    const authorResponse = await fetch(`https://openlibrary.org/authors/${authorKey}.json`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!authorResponse.ok) {
      throw new Error(`Failed fetching authorResponse (${authorKey}): ${authorResponse.status}`);
    }

    const authorInfo = await authorResponse.json();

    const authorWorksResponse = await fetch(`https://openlibrary.org/authors/${authorKey}/works.json?limit=10&offset=${offset}&sort=new&lang=en`);

    if (!authorWorksResponse.ok) {
      throw new Error(`Failed fetching authorWorksResponse (${authorKey}): ${authorWorksResponse.status}`);
    }

    const authorWorksInfo = await authorWorksResponse.json();

    const response = {
      authorInfo: authorInfo,
      authorWorksInfo: authorWorksInfo,
    };

    res.json(response);
  } catch (error) {
    console.error('searchAuthor error:', error);
  }
}
