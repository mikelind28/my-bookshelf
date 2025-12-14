import { Request, Response } from 'express';

// GET at /api/open-library/search/author/:key
// searches openLibrary for a specific author by key.
export default async function searchAuthor(req: Request, res: Response) {
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
