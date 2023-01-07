"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTokenRepository = exports.companyRespository = void 0;
const data_source_1 = require("../data-source");
const Company_1 = require("../entities/Company");
const resetTokens_1 = require("../entities/resetTokens");
exports.companyRespository = data_source_1.AppDataSource.getRepository(Company_1.Company);
exports.resetTokenRepository = data_source_1.AppDataSource.getTreeRepository(resetTokens_1.ResetTokens);
