import { TablesSessionsController } from "@/controllers/tables-sessions-controller";
import { Router } from "express";


export const tableSessionsRoutes =  Router()
const tableSessionsControler = new TablesSessionsController()

tableSessionsRoutes.post('/', tableSessionsControler.create)
tableSessionsRoutes.get('/', tableSessionsControler.index)
tableSessionsRoutes.patch('/:id', tableSessionsControler.update)


