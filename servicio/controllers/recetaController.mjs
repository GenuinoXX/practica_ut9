import {recetasUsuario, recetasDesbloqueadas, recetasPorId, editarReceta, borrarReceta} from "../models/recetaModel.mjs"

export const misRecetas = async (req, res) => {
    try{
        const misRecetas = await recetasUsuario(req.params.email)
        if(!misRecetas){
            res.status(404).json({mensaje: "No se encontraron recetas"})
        }else{
            res.json({recetas: misRecetas})
        }
    }catch(error){
        res.status(500).json({mensaje: "Error consiguiendo los datos", error})
    }
}

export const misDesbloqueadas = async (req, res) => {
    try{
        const misDesbloqueadas = await recetasDesbloqueadas(req.params.email)
        if(!misDesbloqueadas){
            res.status(404).json({mensaje: "No se encontraron recetas"})
        }else{
            res.json({recetas: misDesbloqueadas})
        }
    }catch(error){
        res.status(500).json({mensaje: "Error consiguiendo los datos", error})
    }
}

export const recetaSeleccionada = async (req, res) => {
    try{
        const infoReceta = await recetasPorId(req.params.id)
        if(!infoReceta){
            res.status(404).json({mensaje: "No se encontraron recetas"})
        }else{
            res.json({receta: infoReceta})
        }
    }catch(error){
        res.status(500).json({mensaje: "Error consiguiendo los datos", error})
    }
}

export const recetaEditada = async (req, res) => {
    try{
        await editarReceta(req.params.id, req.params.nombre, req.params.descripcion, req.params.foto)
        res.status(200).json({ message: "Receta actualizada correctamente" })
    }catch(error){
        res.status(500).json({mensaje: "Error actualizando los datos", error})
    }
}

export const recetaEliminada = async (req, res) => {
    try{
        await borrarReceta(req.params.id)
        res.status(200).json({ message: "Receta actualizada correctamente" })
    }catch(error){
        res.status(500).json({mensaje: "Error actualizando los datos", error})
    }
}