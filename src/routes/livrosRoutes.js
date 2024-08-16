import express from "express";
import LivroController from "../controllers/LivroController.js";
const router = express.Router();

router.get("/", LivroController.listarLivros);        
router.get("/:id", LivroController.listarLivroPorId);  
router.post("/", LivroController.cadastrarLivro);     
router.put("/:id", LivroController.atualizarLivro);   
router.delete("/:id", LivroController.deletarLivro); 


export default router;
