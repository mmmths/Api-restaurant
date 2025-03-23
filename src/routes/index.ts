import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tableRoutes } from "./tables-routes";
import { tableSessionsRoutes } from "./tables-sessions-routes";
import { ordersRoutes } from "./orders-routes";


const routes = Router()
routes.use('/products',productsRoutes )
routes.use('/tables',tableRoutes )
routes.use('/tables-sessions',tableSessionsRoutes )
routes.use('/orders',ordersRoutes )

export {routes}