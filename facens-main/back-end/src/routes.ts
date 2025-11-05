// // src/routes.ts
import { Router } from "express";
import { CreateUserController } from "./modules/Users/UseCases/CreateUser/CreateUserController";
import { AuthenticateUserController } from "./modules/Users/UseCases/AuthenticateUser/AuthenticateUserController";
import { CreateCategoryController } from "./modules/Category/UseCases/CreateCategory/CreateCategoryController";
import { GetCategoryController } from "./modules/Category/UseCases/GetCategory/GetCategoryController";
import { UpdateCategoryController } from "./modules/Category/UseCases/UpdateCategory/UpdateCategoryController";
import { CreateProductClassController } from "./modules/ProductClass/UseCases/CreateProductClass/CreateProductClassController";
import { GetProductClassController } from "./modules/ProductClass/UseCases/GetProductClass/GetProductClassController";
import { UpdateProductClassController } from "./modules/ProductClass/UseCases/UpdateProductClass/UpdateProductClassController";
import { GetProductClassesController } from "./modules/ProductClass/UseCases/GetProductClasses/GetProductClassesController";
import { GetCategoriesSimpleController } from "./modules/Category/UseCases/GetCategoriesSimple/GetCategoriesSimpleController";
import { CreateProductController } from "./modules/Products/UseCases/CreateProduct/CreateProductController";
import { GetProductUseCase } from "./modules/Products/UseCases/GetProduct/GetProductUseCase";
import { GetProductController } from "./modules/Products/UseCases/GetProduct/GetProductController";
import { UpdateProductController } from "./modules/Products/UseCases/UpdateProductClass/UpdateProductController";

const routes = Router();

routes.post("/register", CreateUserController.handle);
routes.post("/login", AuthenticateUserController.handle);

routes.post("/create-category", CreateCategoryController.handle);
routes.post("/get-category", GetCategoryController.handle);
routes.post("/update-category", UpdateCategoryController.handle);
routes.get("/get-categories-simple", GetCategoriesSimpleController.handle);



routes.post("/create-product-class", CreateProductClassController.handle);
routes.post("/get-product-class", GetProductClassController.handle);
routes.post("/update-product-class", UpdateProductClassController.handle);
routes.get("/get-product-classes-simple", GetProductClassesController.handle);

routes.post("/create-product", CreateProductController.handle);
routes.post("/get-products", GetProductController.handle);
routes.post("/update-product", UpdateProductController.handle);






export default routes;
