import { Request, Response } from 'express';

// GET at '/api/open-library/search/authors'
// searches openLibrary's authors.
export default async function searchAuthors(req: Request, res: Response) {
    const q = req.query.q;

    try {
        const response = await fetch(`https://openlibrary.org/search/authors.json?q=${q}&fields=key,name,work_count,birth_date&limit=10&offset=0`, {
            headers: {
                'Content-type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error(`could not fetch authors from open library at searchAuthors(). response status: ${response.status}`);
        }
    
        const authorArray = await response.json();
    
        res.json(authorArray);
    } catch (error) {
        console.error(error);
    }
}