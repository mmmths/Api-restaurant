import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    // next is used to deliver the error further

    try {
      const { table_number } = request.query;

      const tables = await knex<TableRepository>("tables")
        .select()
        .whereLike("table_number", `%${table_number ?? ""}%`)
        .orderBy("table_number");

      return response.json(tables);
    } catch (error) {
      next(error);
    }
  }

//   async create(request: Request, response: Response, next: NextFunction) {
//     try {
//       const bodySchema = z.object({
//         name: z.string().trim().min(6),
//         price: z.number().gt(0),
//       });

//       const { name, price } = bodySchema.parse(request.body);

//       await knex<TableRepository>("tables").insert({ name, price });

//       return response.status(201).json();
//     } catch (error) {
//       next(error);
//     }
//   }

//   async update(request: Request, response: Response, next: NextFunction) {
//     try {
//       const id = z
//         .string()
//         .transform((value) => Number(value))
//         .refine((value) => !isNaN(value), { message: "id must be a number" })
//         .parse(request.params.id);

   

//       const bodySchema = z.object({
//         name: z.string().trim().min(6),
//         price: z.number().gt(0),
//       });

//       const { name, price } = bodySchema.parse(request.body);

//       const product =  await knex<TableRepository>("tables")
//       .select()
//       .where({id})
//       .first()

//       if(!product){
//            throw new AppError("Product not found")
//       }
      
//       await knex<TableRepository>("tables")
//         .update({ name, price, updated_at: knex.fn.now() })
//         .where({ id })

//       return response.json();
//     } catch (error) {
//       next(error);
//     }
//   }

//   async remove(request: Request, response: Response, next: NextFunction) {
//      try {
//           const id = z
//           .string()
//           .transform((value) => Number(value))
//           .refine((value) => !isNaN(value), { message: "id must be a number" })
//           .parse(request.params.id);

//           const product =  await knex<TableRepository>("tables")
//           .select()
//           .where({id})
//           .first()

//           if(!product){
//                throw new AppError("Product not found")
//           }

//           await knex<TableRepository>("tables").delete().where({id})

//           return response.json()
//      } catch (error) {
//           next(error)
//      }
//   }
}
