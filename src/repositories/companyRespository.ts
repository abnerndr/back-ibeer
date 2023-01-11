import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";
import { ResetTokens } from "../entities/resetTokens";
import { Wallet } from "../entities/Wallet";

export const companyRespository = AppDataSource.getRepository(Company);
export const walletRespository = AppDataSource.getRepository(Wallet);
export const resetTokenRepository =
  AppDataSource.getTreeRepository(ResetTokens);
