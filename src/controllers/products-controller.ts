import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';


export class ProductsController {
     async index(request: Request, response: Response, next: NextFunction) { // next is used to repass the error further
     try {
          return response.json({message: "ok"})
     } catch (error) {
          next(error)
     }
     }
}

