import request from "supertest";
import app from "../../src/app.js";
import Livro from "../../src/models/Livro.js";

jest.mock("../../src/models/Livro.js");

describe("Testes do LivroController", () => {
    const mockLivros = [
        { id: 1, titulo: "Livro A", editora: "Editora A", preco: 29.99, paginas: 200 },
        { id: 2, titulo: "Livro B", editora: "Editora B", preco: 39.99, paginas: 300 },
    ];
    const mockLivro = { id: 1, titulo: "Livro A", editora: "Editora A", preco: 29.99, paginas: 200 };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Deve listar todos os livros", async () => {
        const mockLivros = [{ id: 1, titulo: "Livro 1" }, { id: 2, titulo: "Livro 2" }];
        Livro.findAll.mockResolvedValue(mockLivros);

        const res = await request(app).get("/livros");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockLivros);
        expect(Livro.findAll).toHaveBeenCalledTimes(1);
    });

    it("Deve retornar um livro pelo ID", async () => {
        const mockLivro = { id: 1, titulo: "Livro 1" };
        Livro.findByPk.mockResolvedValue(mockLivro);

        const res = await request(app).get("/livros/1");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockLivro);
        expect(Livro.findByPk).toHaveBeenCalledWith("1");
    });

    it("Deve retornar 404 se o livro não for encontrado", async () => {
        Livro.findByPk.mockResolvedValue(null);

        const res = await request(app).get("/livros/999");

        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: "Livro não encontrado" });
    });

    it("Deve criar um novo livro", async () => {
        const novoLivro = { titulo: "Novo Livro" };
        const mockLivro = { id: 1, ...novoLivro };
        Livro.create.mockResolvedValue(mockLivro);

        const res = await request(app).post("/livros").send(novoLivro);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(mockLivro);
        expect(Livro.create).toHaveBeenCalledWith(novoLivro);
    });

    it("Deve atualizar um livro existente", async () => {
        const mockLivro = { id: 1, titulo: "Livro Atualizado" };
        Livro.update.mockResolvedValue([1]);
        Livro.findByPk.mockResolvedValue(mockLivro);

        const res = await request(app).put("/livros/1").send(mockLivro);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockLivro);
        expect(Livro.update).toHaveBeenCalledWith(mockLivro, { where: { id: "1" } });
    });

    it("Deve deletar um livro", async () => {
        Livro.destroy.mockResolvedValue(1);

        const res = await request(app).delete("/livros/1");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: "Livro deletado" });
        expect(Livro.destroy).toHaveBeenCalledWith({ where: { id: "1" } });
    });
});
