import { Router } from "express";

import { ProductController } from './controllers/Company/ProductController'

import { CompanyController } from "./controllers/Company/CompanyController";
import { AuthCompanyController } from "./controllers/Company/AuthCompanyController";

import { UserController } from "./controllers/Customer/UserController";
import { AuthController } from "./controllers/Customer/AuthController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

// user
routes.post("/customer/user", new UserController().store);
routes.post("/customer/login", new AuthController().login);
routes.get("/customer/profile", new UserController().index);
routes.get("/customer/profile/:id", new UserController().show);
routes.put("/customer/profile/:id", new UserController().update);
routes.delete("/customer/profile/:id", new UserController().destroy);

// company_user
routes.post("/company/user", new CompanyController().store);
routes.post("/company/login", new AuthCompanyController().login);
routes.get("/company/profile", new CompanyController().index);
routes.get("/company/profile/:id", new CompanyController().show);
routes.put("/company/profile/:id", new CompanyController().update);
routes.delete("/company/profile/:id", new CompanyController().destroy);

// products
routes.post("/company/new-product/:company_id", new ProductController().create);
routes.get("/company/products", new ProductController().index);
routes.get("/company/products/:company_id", new ProductController().show);

routes.use(authMiddleware);

export default routes;
