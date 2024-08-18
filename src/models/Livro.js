import { DataTypes } from "sequelize";
import { sequelize } from "../dbconfig/dbConnect.js";

const Livro = sequelize.define("Livro", {
    titulo: { type: DataTypes.STRING, allowNull: false },
    editora: { type: DataTypes.STRING },
    preco: { type: DataTypes.FLOAT },
    paginas: { type: DataTypes.INTEGER },
}, {
    tableName: 'livros',
    timestamps: false,
});

export default Livro;
