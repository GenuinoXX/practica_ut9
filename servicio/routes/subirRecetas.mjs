import express from "express";
import { crearReceta } from "../controllers/subirRecetaController.mjs";

const router = express.Router();

// Ruta para subir una receta
router.post("/subir_recetas", crearReceta);

export default router;