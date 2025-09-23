import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { LanguageChangeDto } from './language.types'

const change = (req: Request, res: Response) => {
  const { lang } = req.body as LanguageChangeDto;
  res.cookie('lang', lang).status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
}

export default { change }