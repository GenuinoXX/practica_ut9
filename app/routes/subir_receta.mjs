import express from "express";
import axios from "axios";
import path from "path";

const router = express.Router();

// Se usa GET para renderizar la vista de "Subir receta"
router.get("/", (req, res) => {
    const usuario = req.session.user // obtiene el usuario de la sesión para saber quién es
    res.render("completas/subir_receta", {usuario: usuario}); // Renderiza la vista con la info del usuario
});

// Se usa POST para manejar la subida de la receta que hace el usuario
router.post("/", async (req, res) => {
    try {
        // Se envía lso datos del formulario al servidor que está esperando
        await axios.post("http://localhost:3000/api/subir_recetas/", req.body) 
        res.redirect("/principal");
    } catch (error) {
        console.error("Error al subir receta:", error);
        res.status(500).send("Error al subir la receta.");
    }
});

export default router;