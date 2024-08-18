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

        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
};

startServer();

export default app;
