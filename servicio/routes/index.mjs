import express from "express";
import { obtenerRecetas, filtrarRecetas, desbloquearReceta } from "../controllers/indexController.mjs";

const router = express.Router();

// Ruta para obtener recetas aleatorias
router.get("/recetas/:email", obtenerRecetas);

// Ruta para filtrar recetas por tipo de dieta, alérgenos y objetivos de salud
router.get("/recetas/filtrar/:tipoDieta/:objetivo/:alergenos", filtrarRecetas);

// Ruta para desbloquear una receta (requiere email y ID de receta)
router.post("/recetas/desbloquear/:email/:id_receta", desbloquearReceta);

export default router;