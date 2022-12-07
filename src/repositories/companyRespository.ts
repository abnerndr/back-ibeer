import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";

export const companyRespository = AppDataSource.getRepository(Company);
