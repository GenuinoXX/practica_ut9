export const crearSesion = (req, res, usuario) => {
    // Se almacena la información del usuario en la sesión si hace login correctamente, 
    // Usamos esta información en las distintas partes de la aplicación
    req.session.user = {
        email: usuario.email,
        nick: usuario.email.split("@")[0],
        //avatar: usuario.avatar,
        //descripcion: usuario.descripcion,
        //fecha_registro: usuario.fecha_registro
    };
};

