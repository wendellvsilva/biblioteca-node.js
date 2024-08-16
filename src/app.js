import express from "express";
import { connectDB } from "./dbconfig/dbConnect.js";
import livroRoutes from "./routes/livrosRoutes.js";

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        await connectDB();
        console.log("Conectado ao banco de dados com sucesso!");
        app.get("/", (req, res) => {
            res.status(200).send("API Node.js");
        });
        app.use("/livros", livroRoutes);
        app.listen(3000, () => {
            console.log("Servidor está rodando na porta 3000");
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
};
startServer();

export default app;