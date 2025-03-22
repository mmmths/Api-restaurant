import { ProductsController } from "@/controllers/products-controller";
import { Router } from "express";

/**
 *Products routes calls ProducsController
 * Products routes is responsible of the products routes
 */
export const productsRoutes =  Router()
const producsController = new ProductsController()

productsRoutes.get('/', producsController.index)

