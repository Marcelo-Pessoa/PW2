import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { LoginDto } from "./auth.types"
import { checkCredentials } from "./auth.service"

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
 
const logout = async (req: Request, res: Response) => {
  delete req.session.userId
  delete req.session.userType
  res.status(StatusCodes.OK).json(ReasonPhrases.OK)
}

export default { login, signup, logout} 