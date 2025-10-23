import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { LoginDto, SignUpDto } from "./auth.types"
import { checkCredentials } from "./auth.service"
import { createUser, findUserByEmail } from "../user/user.service"
import { UserTypes } from "../userType/userType.constants"

const login = async(req: Request, res: Response) => {
  const data = req.body as LoginDto

  try{
    const user = await checkCredentials(data)
    if(!user) return res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED)

    req.session.userType = user.typeId
    req.session.userId = user.id
    res.status(StatusCodes.OK).json(ReasonPhrases.OK)
  } catch(err) {
    console.log(err)
    res.json(err)
  }
}

const signup = async(req: Request, res: Response) => {
  const user = req.body as SignUpDto;

  try {
    if(await findUserByEmail(user.email))
      return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Email informado ja esta sendo usado'});
    const newUsuario = await createUser({
      ...user,
      typeId: UserTypes.client
    });

    res.status(StatusCodes.CREATED).json(newUsuario)
  } catch (err: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.erros);
  }
}
 
const logout = async (req: Request, res: Response) => {
  delete req.session.userId
  delete req.session.userType
  res.status(StatusCodes.OK).json(ReasonPhrases.OK)
}

export default { login, signup, logout } 