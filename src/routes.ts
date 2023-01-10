import express, { Router } from "express";

import { ProductController } from "./controllers/Company/ProductController";

import { CompanyController } from "./controllers/Company/CompanyController";
import { AuthCompanyController } from "./controllers/Company/AuthCompanyController";

import { UserController } from "./controllers/Customer/UserController";
import { AuthController } from "./controllers/Customer/AuthController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { PaymentController } from "./controllers/Payments/PaymentController";
import { OrderController } from "./controllers/Payments/OrderController";
import { WalletController } from "./controllers/Company/WalletController";

const routes = Router();

// user
routes.post("/customer/user", new UserController().store);
routes.post("/customer/login", new AuthController().login);
routes.get("/customer/profile", new UserController().index);
routes.get("/customer/profile/:id", new UserController().show);
routes.put("/customer/profile/:id", new UserController().update);
routes.delete("/customer/profile/:id", new UserController().destroy);

routes.post("/company/forgot-password", new AuthController().forgot);
routes.post("/company/reset-password", new AuthController().reset);

// company_user
routes.post("/company/user", new CompanyController().store);
routes.post("/company/login", new AuthCompanyController().login);
routes.get("/company/profile", new CompanyController().getCompanies);
routes.get("/company/profile/:id", new CompanyController().show);
routes.put("/company/profile/:id", new CompanyController().update);
routes.delete("/company/profile/:id", new CompanyController().destroy);

routes.post("/company/forgot-password", new AuthCompanyController().forgot);
routes.post("/company/reset-password", new AuthCompanyController().reset);

// wallet
routes.get("/company/wallet/:company_id", new WalletController().show);

// products
routes.post("/company/new-product/:company_id", new ProductController().create);
routes.get("/company/products", new ProductController().getProducts);
routes.get("/company/products/:company_id", new ProductController().show);
routes.put("/company/products/:product_id", new ProductController().update);

// payments (stripe)
routes.post(
  "/payment/subscription/:company_id",
  new PaymentController().storeSubscription
);
routes.get(
  "/payment/subscription/:company_id",
  new PaymentController().showSubscription
);
// order
routes.post("/payment/order/:product_id", new OrderController().order);
routes.get("/payment/order/:company_id", new OrderController().getOrders);

routes.use(authMiddleware);

export default routes;
