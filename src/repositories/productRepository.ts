import { AppDataSource } from "../data-source";
import { Products } from "../entities/Products";

export const productRespository = AppDataSource.getRepository(Products);
