import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export class OrdersController {
  async index(request: Request, response: Response, next: NextFunction) {
    // next is used to deliver the error further

    try {
      const { table_session_id } = request.params;

      const order = await knex("orders")
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.prodcut_id",
          "products.name",
          "orders.price",
          "orders.quantity",
          knex.raw("(orders.price * orders.quantity) AS total"),
          "orders.created_at",
          "orders.updated_at",
        )
        .join("products", "products.id", "orders.prodcut_id")
        .where({ table_session_id })
        .orderBy("orders.created_at", "desc")



      return response.json(order);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        prodcut_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, prodcut_id, quantity } = bodySchema.parse(
        request.body
      );

      const session = await knex<TableSessionRepository>("tables_sessions")
        .where({
          id: table_session_id,
        })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }
      if (session.cloesed_at) {
        throw new AppError("this table is closed");
      }

      const product = await knex<ProductRepository>("products")
        .where({ id: prodcut_id })
        .first();

      if (!product) {
        throw new AppError("product not found");
      }

      // return response.json(session);

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        prodcut_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }


  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const {table_session_id} = request.params

      const order = await knex("orders")
      .select(
      knex.raw("COALESCE(SUM(orders.price * orders.quantity),0)AS total"),
      knex.raw("COALESCE(SUM( orders.quantity),0)AS quantity")
      )
      .where({table_session_id})
      .first()


      return response.json(order)
    } catch (error) {
      next(error)
      
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const session = await knex<TableSessionRepository>("orders")
        .select()
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }

      if (session.cloesed_at) {
        throw new AppError("This session table is already closed");
      }

      await knex<TableSessionRepository>("orders")
        .update({ cloesed_at: knex.fn.now() })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }

 
  //   async remove(request: Request, response: Response, next: NextFunction) {
  //      try {
  //           const id = z
  //           .string()
  //           .transform((value) => Number(value))
  //           .refine((value) => !isNaN(value), { message: "id must be a number" })
  //           .parse(request.params.id);

  //           const product =  await knex<TableSessionRepository>("orders")
  //           .select()
  //           .where({id})
  //           .first()

  //           if(!product){
  //                throw new AppError("Product not found")
  //           }

  //           await knex<TableSessionRepository>("orders").delete().where({id})

  //           return response.json()
  //      } catch (error) {
  //           next(error)
  //      }
  //   }
}
