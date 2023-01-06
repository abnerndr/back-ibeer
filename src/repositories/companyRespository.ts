import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";
import { ResetTokens } from "../entities/resetTokens";

export const companyRespository = AppDataSource.getRepository(Company);
export const resetTokenRepository =
  AppDataSource.getTreeRepository(ResetTokens);
