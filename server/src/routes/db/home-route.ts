import { Request, Response, Router } from 'express';
import { Book } from "../../models/index.js";
import { Author } from '../../models/author.js';

const homeRouter = Router();

// GET at '/api/db/home' gets a preview of a user's shelf and wish list
export const getShelfAndWishListPreview = async (_req: Request, res: Response) => {
  try {
    const myShelfPreview = await Book.findAll({
        where: { owned: true },
        include: Author,
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
        ],
    });

    const myWishListPreview = await Book.findAll({
        where: { owned: false },
        include: Author,
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
        ],
    });

    res.json({ myShelfPreview: myShelfPreview, myWishListPreview: myWishListPreview });
  } catch (error) {
    console.error(error);
  }
};

homeRouter.get('/', getShelfAndWishListPreview);

export default homeRouter;