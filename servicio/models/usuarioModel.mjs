import db from "../config/db.mjs"

export const datosUsuario = async(email)=>{
    const busqueda = email
    const [registros] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [busqueda])
    return registros
}

export const actualizarDescripcion = async(descripcion, email)=>{
    const busqueda_descripcion = descripcion
    const busqueda_correo = email
    await db.query('UPDATE Usuarios SET descripcion_perfil = ? WHERE email = ?', [busqueda_descripcion, busqueda_correo])
}

export const actualizarAvatar = async(avatar, email)=>{
    const busqueda_avatar = avatar
    const busqueda_correo = email
    await db.query('UPDATE Usuarios SET avatar = ? WHERE email = ?', [busqueda_avatar, busqueda_correo])
}

export const crearPerfilUsuario = async (email) => {
    await db.query('INSERT INTO Usuarios (email, descripcion_perfil, avatar) VALUES (?, ?, ?)', [email, '', 'https://cdn-icons-png.flaticon.com/512/306/306003.png']);
};
