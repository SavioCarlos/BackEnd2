import { UserRepository } from "../src/database/UserDataBase";
import { CustomError } from "../src/errors/CustomError";
import { UserService } from "../src/services/UserServices";

describe("UserService", () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        userService = new UserService(userRepository);
    });

    it("retorna um array vazio quando não tiver usuarios", async () => {
        jest.spyOn(UserRepository.prototype, "getAllUsers").mockResolvedValueOnce([]);
        const currentUser = { id: "admin_id", name: "Admin", email: "admin@example.com", role: "ADMIN" };
        const users = await userService.getAllUsers(currentUser);
        expect(users).toEqual([]);
    });

    it("retorna um usuario o ID for válido", async () => {
        jest.spyOn(userRepository, "getUserById").mockResolvedValueOnce({
            id: "35b62ff4-64af-4721-a4c5-d038c6f730cf",
            name: "Rubens",
            email: "rubens@gmail.com",
            role: "ADMIN",
        });

        const user = await userService.getUserById("35b62ff4-64af-4721-a4c5-d038c6f730cf");

        expect(user).toBeDefined();
        expect(user.id).toBe("35b62ff4-64af-4721-a4c5-d038c6f730cf");
        expect(user.name).toBe("Rubens");
        expect(user.email).toBe("rubens@gmail.com");
        expect(user.role).toBe("ADMIN");
    });

    it("gera um erro quando o usuario não é admin", async () => {
        const currentUser = { id: "user_id", name: "John", email: "john@example.com", role: "USER" };
        await expect(userService.getAllUsers(currentUser)).rejects.toThrowError(
            new CustomError(403, "Não autorizado! Só os ADMIM tem acesso")
        );
    });

    it("gera um erro quando o usuario não existe", async () => {
        const userId = "non-existent-id";
        await expect(userService.getUserById(userId)).rejects.toThrowError(
            new CustomError(404, "Usuario não encontrado")
        );
    });

    it("gera um erro quando a função getAllUsers gerar um erro", async () => {
        jest.spyOn(UserRepository.prototype, "getAllUsers").mockRejectedValueOnce(new Error("Database error"));
        const currentUser = { id: "admin_id", name: "Admin", email: "admin@example.com", role: "ADMIN" };
        await expect(userService.getAllUsers(currentUser)).rejects.toThrowError("Database error");
    });

    it("retorna todos os usuarios se for um admin", async () => {
        const mockUsers = [
            { id: "user_id_1", name: "User 1", email: "user1@example.com", role: "USER" },
            { id: "user_id_2", name: "User 2", email: "user2@example.com", role: "USER" }
        ];
        jest.spyOn(UserRepository.prototype, "getAllUsers").mockResolvedValueOnce(mockUsers);
        const currentUser = { id: "admin_id", name: "Admin", email: "admin@example.com", role: "ADMIN" };
        const users = await userService.getAllUsers(currentUser);
        expect(users).toEqual(mockUsers);
    });

    it("gera um erro quando o ID é inválido", async () => {
        jest.spyOn(userRepository, "getUserById").mockResolvedValueOnce(null);
        await expect(userService.getUserById("invalid-id")).rejects.toThrowError("Usuario não encontrado");
    });

});
