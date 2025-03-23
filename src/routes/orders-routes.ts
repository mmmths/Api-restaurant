import { OrdersController } from "@/controllers/orders-controller";
import { Router } from "express";


export const ordersRoutes =  Router()
const ordersControler = new OrdersController()

ordersRoutes.post('/', ordersControler.create)
ordersRoutes.get('/table-session/:table_session_id', ordersControler.index)
ordersRoutes.get('/table-session/:table_session_id/total', ordersControler.show)




