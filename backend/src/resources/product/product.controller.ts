import { Request, Response } from 'express';
import { getProducts,
        createProduct,
        findProductByName,
        removeProduct,
        productAlreadyExists,
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
        if (await productAlreadyExists(product.name)) {
            return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
        }
        const newProduct = await createProduct(product);
        res.status(StatusCodes.CREATED).json(ReasonPhrases.CREATED);
    } catch (err) {
        
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