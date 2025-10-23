import { Request, Response } from 'express';
import { getProducts,
        getProduct,
        createProduct,
        findProductByName,
        removeProduct,
        productAlreadyExists,
        updateProduct,
       } from './product.service';
import { createProductDto, updateProductDto } from './product.types'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const index = async (req: Request, res: Response) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const create = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Adiciona um novo produto na base.'
    #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/CreateProductDto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/Product' }
    }
    */
    const product = req.body as createProductDto;
    try {
        if (await productAlreadyExists(product.name)) {
            return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
        }
        const newProduct = await createProduct(product);
        res.status(StatusCodes.CREATED).json(newProduct);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const read = async (req: Request, res: Response) => {
    /*
    #swagger.summary = 'Recupera dados de um produto específico.'
    #swagger.parameters['id'] = {description: 'ID do produto.'} 
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Product' }
    }
    */
    const id = req.params.id
    try {
        const product = await getProduct(id!);
        res.json(product);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const update = async (req: Request, res: Response) => {
    const product = req.body as updateProductDto;
    try{
        if(await productAlreadyExists(product.name)){
            await updateProduct(product, req.params.id!);
            return res.status(StatusCodes.OK).json(product)
        } else{
            return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
        }
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
};

const remove = async (req: Request, res: Response) => {
    try{
        const resposta = await removeProduct(req.params.id!);

        if(resposta) return res.status(StatusCodes.NO_CONTENT);
        return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR)
    }
};

export default { index, create, read, update, remove }