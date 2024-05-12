import { User } from "./model/User";

declare module "express" {
  interface Request {
    currentUser?: User;
  }
}
