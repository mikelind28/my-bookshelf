import { Request, Response } from 'express';

// GET at '/api/open-library/search/titles'
// searches openLibrary by book title.
export default async function searchTitles(req: Request, res: Response) {
    const q = req.query.q;
    const pageParam = req.query.page;
    const page = Number(pageParam);

    let offset = 0;

    if (Number.isInteger(page) && page > 0) {
        offset = (page - 1) * 10;
    }

    try {
        const response = await fetch(`https://openlibrary.org/search.json?title=${q}&offset=${offset}&limit=10&fields=key,title,author_key,author_name,cover_edition_key,first_publish_year`, {
            headers: {
                'Content-type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error(`could not fetch titles from open library at searchTitles(). response status: ${response.status}`);
        }
    
        const bookArray = await response.json();
    
        res.json(bookArray);
    } catch (error) {
        console.error(error);
    }
}
