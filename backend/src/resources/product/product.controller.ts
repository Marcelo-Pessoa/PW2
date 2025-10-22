import { Request, Response } from 'express';
import { getProducts,
        createProduct,
        findProductByName,
        removeProduct,
       } from './product.service';
import { createProductDto } from './product.types'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const index = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
};

const create = async (req: Request, res: Response) => {
    const product = req.body as createProductDto;
    try {
        if (await )
    } catch {
        
    }
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