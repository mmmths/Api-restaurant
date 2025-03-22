import { ProductsController } from "@/controllers/products-controller";
import { Router } from "express";

/**
 *Products routes calls ProducsController
 * Products routes is responsible of the products routes
 */
export const productsRoutes =  Router()
const producsController = new ProductsController()

productsRoutes.get('/', producsController.index)
productsRoutes.post('/', producsController.create)
productsRoutes.put('/:id', producsController.update)
productsRoutes.delete('/:id', producsController.remove)

