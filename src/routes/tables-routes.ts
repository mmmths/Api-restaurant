import { TablesController } from "@/controllers/tables-controllers";
import { Router } from "express";


export const tableRoutes =  Router()
const tableController = new TablesController()

tableRoutes.get('/', tableController.index)
// tableRoutes.post('/', tableController.create)
// tableRoutes.put('/:id', tableController.update)
// tableRoutes.delete('/:id', tableController.remove)

