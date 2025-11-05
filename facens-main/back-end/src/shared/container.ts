import { container } from "tsyringe";
import { IUserRepository } from "../modules/Users/Repository/IUserRepository";
import { UserRepository } from "../modules/Users/Repository/implementations/UserRepository";
import { ICategoryRepository } from "@/modules/Category/Repository/ICategoryRepository";
import { CategoryRepository } from "@/modules/Category/Repository/implementations/CategoryRepository";
import { IProductClassRepository } from "@/modules/ProductClass/Repository/IProductClassRepository";
import { ProductClassRepository } from "@/modules/ProductClass/Repository/implementations/ProductClassRepository";
import { ProductRepository } from "@/modules/Products/Repository/implementations/ProductRepository";
import { IProductRepository } from "@/modules/Products/Repository/IProductRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<IProductClassRepository>(
  "ProductClassRepository",
  ProductClassRepository
);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);

