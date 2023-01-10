"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("./controllers/Company/ProductController");
const CompanyController_1 = require("./controllers/Company/CompanyController");
const AuthCompanyController_1 = require("./controllers/Company/AuthCompanyController");
const UserController_1 = require("./controllers/Customer/UserController");
const AuthController_1 = require("./controllers/Customer/AuthController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const PaymentController_1 = require("./controllers/Payments/PaymentController");
const OrderController_1 = require("./controllers/Payments/OrderController");
const WalletController_1 = require("./controllers/Company/WalletController");
const routes = (0, express_1.Router)();
// user
routes.post("/customer/user", new UserController_1.UserController().store);
routes.post("/customer/login", new AuthController_1.AuthController().login);
routes.get("/customer/profile", new UserController_1.UserController().index);
routes.get("/customer/profile/:id", new UserController_1.UserController().show);
routes.put("/customer/profile/:id", new UserController_1.UserController().update);
routes.delete("/customer/profile/:id", new UserController_1.UserController().destroy);
routes.post("/company/forgot-password", new AuthController_1.AuthController().forgot);
routes.post("/company/reset-password", new AuthController_1.AuthController().reset);
// company_user
routes.post("/company/user", new CompanyController_1.CompanyController().store);
routes.post("/company/login", new AuthCompanyController_1.AuthCompanyController().login);
routes.get("/company/profile", new CompanyController_1.CompanyController().getCompanies);
routes.get("/company/profile/:id", new CompanyController_1.CompanyController().show);
routes.put("/company/profile/:id", new CompanyController_1.CompanyController().update);
routes.delete("/company/profile/:id", new CompanyController_1.CompanyController().destroy);
routes.post("/company/forgot-password", new AuthCompanyController_1.AuthCompanyController().forgot);
routes.post("/company/reset-password", new AuthCompanyController_1.AuthCompanyController().reset);
// wallet
routes.get("/company/wallet/:company_id", new WalletController_1.WalletController().show);
// products
routes.post("/company/new-product/:company_id", new ProductController_1.ProductController().create);
routes.get("/company/products", new ProductController_1.ProductController().getProducts);
routes.get("/company/products/:company_id", new ProductController_1.ProductController().show);
routes.put("/company/products/:product_id", new ProductController_1.ProductController().update);
// payments (stripe)
routes.post("/payment/subscription/:company_id", new PaymentController_1.PaymentController().storeSubscription);
routes.get("/payment/subscription/:company_id", new PaymentController_1.PaymentController().showSubscription);
// order
routes.post("/payment/order/:product_id", new OrderController_1.OrderController().order);
routes.get("/payment/order/:company_id", new OrderController_1.OrderController().getOrders);
routes.use(authMiddleware_1.authMiddleware);
exports.default = routes;
