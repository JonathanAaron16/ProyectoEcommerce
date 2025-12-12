/*=============================
    Controladores usuario
=============================*/

import connection from "../database/db.js";
import bcrypt from "bcrypt";



export async function insertUser(req, res) {
    try {

        const { nombre, correo, password } = req.body;

        if(!nombre ||!correo ||!password) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos del formulario"
            });
        }

        // Setup de bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Antes de hashear
        //const [rows] = await UserModels.insertUser(nombre, correo, password);

        // Con la contraseña hasheada
        const sql = "INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)";
        const [rows] = await connection.query(sql, [nombre, correo, hashedPassword]);

        // Ahora la constraseña de "thiago" pasa a ser "$2b$10$wemYF.qxnldHTJnMdxNcQeUBqZHz.FhqUBEmmCCcp/O.."

        res.status(201).json({
            message: "Usuario creado con exito",
            userId: rows.insertId
        });

    } catch (error) {
        console.log("Error interno del servidor");

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}