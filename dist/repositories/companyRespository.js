"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTokenRepository = exports.walletRespository = exports.companyRespository = void 0;
const data_source_1 = require("../data-source");
const Company_1 = require("../entities/Company");
const ResetTokens_1 = require("../entities/ResetTokens");
const Wallet_1 = require("../entities/Wallet");
exports.companyRespository = data_source_1.AppDataSource.getRepository(Company_1.Company);
exports.walletRespository = data_source_1.AppDataSource.getRepository(Wallet_1.Wallet);
exports.resetTokenRepository = data_source_1.AppDataSource.getTreeRepository(ResetTokens_1.ResetTokens);
