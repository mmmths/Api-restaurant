import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export class TablesSessionsController {
  async index(request: Request, response: Response, next: NextFunction) {
    // next is used to deliver the error further

    try {
      const { id } = request.query;

      const tablesSessions = await knex<TableSessionRepository>(
        "tables_sessions"
      )
        .select()
        .whereLike("id", `%${id ?? ""}%`)
        .orderBy("cloesed_at");

      return response.json(tablesSessions);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await knex<TableSessionRepository>("tables_sessions")
        .where({
          table_id,
        })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.cloesed_at) {
        throw new AppError("this table is already open");
      }

      // return response.json(session);

      await knex<TableSessionRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const session = await knex<TableSessionRepository>("tables_sessions")
        .select()
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("session table not found");
      }

      if (session.cloesed_at) {
        throw new AppError("This session table is already closed");
      }

      await knex<TableSessionRepository>("tables_sessions")
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

  //           const product =  await knex<TableSessionRepository>("tables_sessions")
  //           .select()
  //           .where({id})
  //           .first()

  //           if(!product){
  //                throw new AppError("Product not found")
  //           }

  //           await knex<TableSessionRepository>("tables_sessions").delete().where({id})

  //           return response.json()
  //      } catch (error) {
  //           next(error)
  //      }
  //   }
}
