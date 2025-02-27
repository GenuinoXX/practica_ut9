import db from "../config/db.mjs"

export const recetas = async()=>{
    const [registros] = await db.query('SELECT * FROM Recetas')
    return registros
}

export const recetasUsuario = async(email)=>{
    const busqueda = email
    const [registros] = await db.query('SELECT R.* FROM Recetas R JOIN Usuario_Recetas UR ON R.id_receta = UR.id_receta WHERE UR.email = ?;', [busqueda])
    return registros
}

export const recetasDesbloqueadas = async(email)=>{
    const busqueda = email
    const [registros] = await db.query('SELECT r.* FROM Recetas r JOIN Usuario_Desbloqueadas ud ON r.id_receta = ud.id_receta WHERE ud.email = ?;', [busqueda])
    return registros
}

export const recetasPorId = async(id)=>{
    const [registros] = await db.query('SELECT * FROM Recetas WHERE id_receta = ?', [id])
    return registros
}

export const editarReceta = async(id, nombre, descripcion, foto)=>{
    const busqueda_id = id
    const busqueda_nombre = nombre
    const busqueda_descripcion = descripcion
    const busqueda_foto = foto
    await db.query('UPDATE Recetas SET nombre_receta = ?, descripcion_receta = ?, foto_receta = ? WHERE id_receta = ?', [busqueda_nombre, busqueda_descripcion, busqueda_foto, busqueda_id])
}

export const borrarReceta = async(id)=>{
    const busqueda = id
    await db.query('DELETE FROM Recetas WHERE id_receta = ?', [busqueda])
}