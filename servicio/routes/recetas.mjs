import express from "express"
import {misRecetas, misDesbloqueadas, recetaSeleccionada, recetaEditada, recetaEliminada, todasRecetas} from "../controllers/recetaController.mjs"

const router = express.Router()

router.get("/recetas", todasRecetas)
router.get("/recetas/misRecetas/:email", misRecetas)
router.get("/recetas/desbloqueadas/:email", misDesbloqueadas)
router.get("/receta/:id", recetaSeleccionada)
router.put("/receta/editar/:id/:nombre/:descripcion/:foto", recetaEditada)
router.delete("/receta/eliminar/:id", recetaEliminada)

export default router