import {actualizarDescripcion, actualizarAvatar, datosUsuario} from "../models/usuarioModel.mjs"

export const infoUsuario = async (req, res) => {
    try{
        const infoUsuario = await datosUsuario(req.params.email) 
        if(!infoUsuario){
            return res.status(404).json({mensaje: "No se encontró el usuario"})
        }else{
            res.json(infoUsuario)
        }
    }catch(error){
        res.status(500).json({mensaje: "Error consiguiendo los datos", error})
    }
}

export const nuevaDescripcion = async (req, res) => {
    try{
        await actualizarDescripcion(req.params.descripcion, req.params.email)
        res.status(200).json({ message: "Descripción actualizada correctamente" }) 
    }catch(error){
        res.status(500).json({mensaje: "Error actualizando los datos", error})
    }
}

export const nuevoAvatar = async (req, res) => {
    try{
        await actualizarAvatar(req.params.avatar, req.params.email)
        res.status(200).json({ message: "Avatar actualizado correctamente" })
    }catch(error){
        res.status(500).json({mensaje: "Error actualizando los datos", error})
    }
}