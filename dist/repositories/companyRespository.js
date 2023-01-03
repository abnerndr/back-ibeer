"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRespository = void 0;
const data_source_1 = require("../data-source");
const Company_1 = require("../entities/Company");
exports.companyRespository = data_source_1.AppDataSource.getRepository(Company_1.Company);
