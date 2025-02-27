import express from "express"
import {infoUsuario, nuevaDescripcion, nuevoAvatar} from "../controllers/usuarioController.mjs"

const router = express.Router()

router.get("/usuario/:email", infoUsuario)
router.post("/usuario/cambiar_descripcion/:email/:descripcion", nuevaDescripcion)
router.post("/usuario/cambiar_avatar/:email/:avatar", nuevoAvatar)

export default router