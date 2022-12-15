import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

export const productRespository: any = AppDataSource.getRepository(Product);
