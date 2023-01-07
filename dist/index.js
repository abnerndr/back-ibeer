"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const error_1 = require("./middlewares/error");
const routes_1 = __importDefault(require("./routes"));
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.static("public"));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/api/v1", routes_1.default);
    app.use(error_1.errorMiddleware);
    console.log(`running in localhost:${process.env.PORT}`);
    return app.listen(process.env.PORT);
});
