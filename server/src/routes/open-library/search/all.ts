import { Request, Response } from 'express';

// GET at '/api/open-library/search':
// openLibrary's general search API.
export default async function searchAll(req: Request, res: Response) {
    const q = req.query.q;
    const pageParam = req.query.page;
    const page = Number(pageParam);

    console.log('page from server:', pageParam);

    let offset = 0;

    if (Number.isInteger(page) && page > 0) {
        offset = (page - 1) * 10;
        console.log('offset', offset);
    }

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=10&lang=en&fields=author_key,author_name,cover_i,first_publish_year,key,title,subtitle`, {
            headers: {
                'Content-type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error(`could not fetch search from open library at searchAll(). response status: ${response.status}`);
        }
    
        const bookArray = await response.json();
    
        res.json(bookArray);
    } catch (error) {
        console.error(error);
    }
}