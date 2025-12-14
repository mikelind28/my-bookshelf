import { Request, Response } from 'express';

// GET at '/api/open-library/search':
// openLibrary's general search API.
export default async function searchAll(req: Request, res: Response) {
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