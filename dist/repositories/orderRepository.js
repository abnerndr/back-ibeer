"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRespository = void 0;
const data_source_1 = require("../data-source");
const Order_1 = require("../entities/Order");
exports.orderRespository = data_source_1.AppDataSource.getRepository(Order_1.Order);
