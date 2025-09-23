import { Request, Response } from 'express';
import { getProducts } from './product.service';

const index = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const create = async (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented yet' });
};

const read = async (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented yet' });
};

const update = async (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented yet' });
};

const remove = async (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented yet' });
};

export default { index, create, read, update, remove }