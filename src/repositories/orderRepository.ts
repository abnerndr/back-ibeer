import { AppDataSource } from "../data-source";
import { Order } from "../entities/Order";

export const orderRespository = AppDataSource.getRepository(Order);
