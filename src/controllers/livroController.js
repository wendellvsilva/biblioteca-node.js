import Livro from "../models/Livro.js";

class LivroController {
    static async listarLivros(req, res) {
        try {
            const livros = await Livro.findAll();
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar livros", error });
        }
    }

    static async listarLivroPorId(req, res) {
        try {
            const livro = await Livro.findByPk(req.params.id);
            if (livro) {
                res.status(200).json(livro);
            } else {
                res.status(404).json({ message: "Livro não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar livro", error });
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const livro = await Livro.create(req.body);
            res.status(201).json(livro);
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar livro", error });
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const [updated] = await Livro.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedLivro = await Livro.findByPk(req.params.id);
                res.status(200).json(updatedLivro);
            } else {
                res.status(404).json({ message: "Livro não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar livro", error });
        }
    }

    static async deletarLivro(req, res) {
        try {
            const deleted = await Livro.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(200).json({ message: "Livro deletado com sucesso" });
            } else {
                res.status(404).json({ message: "Livro não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar livro", error });
        }
    }
}

export default LivroController;
