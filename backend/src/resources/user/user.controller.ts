import { Request, Response } from "express"
import { CreateUserDto, UpdateUserDto } from "./user.types"
import { getAllUsers,
        createUser,
        updateUser,
        findUserByEmail,
        findUserById,
        deleteUsuario
       } from "./user.service"
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async(req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

const create = async(req:Request, res: Response) => {
  const data = req.body as CreateUserDto;

  try {
    if(await findUserByEmail(data.email)){
      return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }
    
    const user = await createUser(data)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.json(err)
  }
}

const read = async(req: Request, res: Response) => {
  try{
    const user = await findUserById(req.params.id!)
    res.json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
}

const update = async(req: Request, res: Response) => {
  const data = req.body as UpdateUserDto;

  try {
    if(!await findUserById(req.params.id!)){
      return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }

    const user = await updateUser(data, req.params.id!)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.json(err)
  }
}

const remove = async(req: Request, res: Response) => {
  try{
    const resposta = await deleteUsuario(req.params.id!);

    if(resposta) return res.status(StatusCodes.NO_CONTENT);
    return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  } catch(err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}

export default {index, create, read, update, remove}