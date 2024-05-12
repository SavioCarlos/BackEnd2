import { User } from "../model/User";
import { UserService } from "../services/UserServices";
import { CustomError } from "../errors/CustomError";
import { Request, Response } from "express";

export class UserController {
   constructor(private userService: UserService) { }

   async getUserProfile(req: Request, res: Response) {
      try {

         const currentUser: User | undefined = req.currentUser;
         if (!currentUser) {
            throw new CustomError(403, "Não autorizado! usuario atual não encontrado");
         }
         const userProfile = await this.userService.getUserById(currentUser.id);
         res.status(200).json(userProfile);
      } catch (error) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
         } else {
            res.status(500).json({ message: "Erro interno do Servidor" });
         }
      }
   }

   async getAllUsers(req: Request, res: Response) {
      try {
         const currentUser: User | undefined = req.currentUser;
         if (!currentUser) {
            throw new CustomError(403, "Não autorizado! usuario atual não encontrado");
         }
         const users = await this.userService.getAllUsers(currentUser);
         res.status(200).json(users);
      } catch (error) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
         } else {
            res.status(500).json({ message: "Internal Server Error" });
         }
      }
   }

   async getUserById(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const user = await this.userService.getUserById(id);
         res.status(200).json(user);
      } catch (error) {
         if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
         } else {
            res.status(500).json({ message: "Internal Server Error" });
         }
      }
   }

}
