import express from "express";
import { UserService } from "../services/UserServices";
import { UserRepository } from "../database/UserDataBase";
import { UserController } from "../controller/UserController";

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/users/profile/:id", userController.getUserById);
router.get("/users/profile", userController.getUserProfile);
router.get("/users/all", userController.getAllUsers);
export { router as userRoutes };
