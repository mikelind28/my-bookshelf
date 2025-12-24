import { Request, Response } from 'express';

type AuthorType = {
    birth_date: string;
    key: string;
    name: string;
    work_count: number;
}

// GET at '/api/open-library/search/authors'
// searches openLibrary's authors.
export default async function searchAuthors(req: Request, res: Response) {
    const q = req.query.q;
    const pageParam = req.query.page;
    const page = Number(pageParam);

    let offset = 0;

    if (Number.isInteger(page) && page > 0) {
        offset = (page - 1) * 10;
    }

    try {
        const response = await fetch(`https://openlibrary.org/search/authors.json?q=${q}&offset=${offset}&limit=10&fields=key,name,work_count,birth_date`, {
            headers: {
                'Content-type': 'application/json'
            },
        });
    
        if (!response.ok) {
            throw new Error(`could not fetch authors from open library at searchAuthors(). response status: ${response.status}`);
        }
    
        const authorResponse = await response.json();

        const authorResWithImgUrls = await Promise.all(
            authorResponse.docs.map(async (author: AuthorType) => {
                const res = await fetch(`https://covers.openlibrary.org/a/olid/${author.key}-L.jpg?default=false`);
    
                if (!res.ok) {
                    return author;
                }
    
                return {
                    ...author,
                    imgUrl: `https://covers.openlibrary.org/a/olid/${author.key}-L.jpg`
                }
            })
        );

        res.json({
            docs: authorResWithImgUrls,
            numFound: authorResponse.numFound
        });
    } catch (error) {
        console.error(error);
    }
}