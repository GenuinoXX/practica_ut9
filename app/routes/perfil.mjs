import express from "express"
import path from "path"
import axios from "axios"

const router = express.Router()

router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.get("/perfil/descripcion", async (req,res)=>{
    //Cada vez que aparezca este comprobación, redigirá a la página donde elegirá si quiere logerase o registrarse si no existe una sesión
    if(!req.session.user){
        res.redirect("/")
    }
    const usuario = req.session.user
    let email = req.session.user.email
    try{
        //Envío el email que cojo de la sesion hacia la ruta del servidor que realizará la consulta
        const respuesta = await axios.get(`http://localhost:3000/api/usuario/${email}`)
        //Envío los datos de la sesion (usuario) y de la consulta (usuarios), además de un añadido (contenido) que determinará qué ventana del perfil mostrará (en este caso "perfil")
        res.render("parciales/perfil", {usuario: usuario, usuarios: respuesta.data, contenido: 'perfil'})
    } catch (e) {
        console.log(e)
        //Si falla, me llevará a la página principal
        res.redirect("/principal")
    }
})

router.get("/perfil/nuevo_avatar", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }
    const usuario = req.session.user
    try {
        //Aqui no se realizará ninguna consulta, sólo se renderizará la plantilla enviando los datos de la sesión y del contenido "avatar" que mostrará el formulario de cambio de avatar
        res.render('parciales/perfil', {usuario: usuario, contenido: 'avatar'})
    } catch (error) {
        console.log(error)
        res.redirect("/principal")
    }
})

router.post("/perfil/nuevo_avatar", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }

    const email = req.session.user.email
    const avatar = req.body.avatar
    try{
        //Envío el email de la sesion y el avatar enviado por el formulario hacia la ruta del servidor que realizará la consulta
        //Hemos usado encodeURIComponent para codificar la url del avatar porque conflictuaba con la ruta
        const response = await axios.post(`http://localhost:3000/api/usuario/cambiar_avatar/${email}/${encodeURIComponent(avatar)}`)
        if (response.data.message) {
            //El response.data.message deberían enviar un status 200, que siginifica que el proceso se realizó correctamente
            //Si eso se cumple, se redirigirá a la ruta de "/perfil/descripcion"
            res.redirect("/perfil/descripcion");
        }
    }catch (e){
        console.log(e)
        res.redirect("/principal")
    }
})

router.get("/perfil/nueva_descripcion", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }

    const usuario = req.session.user
    //Aqui no se realizará ninguna consulta, sólo se renderizará la plantilla enviando los datos de la sesión y del contenido "descripcion" que mostrará el formulario de cambio de descripción
    res.render('parciales/perfil', {usuario: usuario, contenido: 'descripcion'})
})

router.post("/perfil/nueva_descripcion", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }

    let email = req.session.user.email
    const descripcion_perfil = req.body.descripcion_perfil
    try{
        //Envío el email de la sesion y la nueva descripción enviado por el formulario hacia la ruta del servidor que realizará la consulta
        //Hemos usado encodeURIComponent para codificar la url de la descripción porque conflictuaba con la ruta
        const response = await axios.post(`http://localhost:3000/api/usuario/cambiar_descripcion/${email}/${encodeURIComponent(descripcion_perfil)}`)
        if (response.data.message) {
            console.log(response.data.message)
            res.redirect("/perfil/descripcion");
        }
    }catch (e){
        console.log(e)
        res.redirect("/principal")
    }
})

router.get("/perfil/mis_recetas", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }
    const usuario = req.session.user
    let email = req.session.user.email
    try{
        //Envío el email que cojo de la sesion hacia la ruta del servidor que realizará la consulta
        const respuesta = await axios.get(`http://localhost:3000/api/recetas/misRecetas/${email}`)
        //Envío los datos de la sesion (usuario), la consulta (recetas) y el contenido "recetas" que mostrará la ventana de recetas del usuario
        res.render("parciales/perfil", {usuario: usuario, recetas: respuesta.data.recetas, contenido: 'recetas'})
    } catch (e) {
        console.log(e)
        res.redirect("/principal")
    }
})

router.get("/perfil/recetas_desbloqueadas", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }
    const usuario = req.session.user
    let correo = req.session.user.email
    try{
        //Envío el email que cojo de la sesion hacia la ruta del servidor que realizará la consulta
        let respuesta = await axios.get(`http://localhost:3000/api/recetas/desbloqueadas/${correo}`)
        //Envío los datos de la sesion (usuario), la consulta (recetas) y el contenido "desbloqueadas" que mostrará la ventana de recetas desbloqueadas por el usuario
        res.render("parciales/perfil", {usuario: usuario, recetas: respuesta.data.recetas, contenido: 'desbloqueadas'})
    } catch (e) {
        console.log(e)
        res.redirect("/principal")
    }
})

router.get("/perfil/editar", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }
    const usuario = req.session.user
    const id = req.query.id
    try {
        //Envío el id de la receta que queremos editar (que recojo de la query de la ruta) hacia la ruta del servidor que realizará la consulta
        let respuesta = await axios.get(`http://localhost:3000/api/receta/${id}`)
        //Envío los datos de la sesion (usuario), y de la consulta (receta)
        res.render('completas/editar_receta', {usuario: usuario, receta: respuesta.data.receta})
    } catch (e) {
        console.log(e)
        res.redirect("/principal")
    }
})

router.post("/perfil/editar", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }
    const id_receta = req.body.id_receta 
    const nombre_receta = req.body.nombre_receta 
    const descripcion_receta = req.body.descripcion_receta
    const avatar_receta = req.body.avatar_receta
    try{
        //Envío todos los datos que he recogido del formulario, codifico aquellos que puedan conflictuar con la ruta de la api y recojo los datos que envía la ruta
        const response = await axios.put(`http://localhost:3000/api/receta/editar/${id_receta}/${nombre_receta}/${encodeURIComponent(descripcion_receta)}/${encodeURIComponent(avatar_receta)}`)
        if (response.data.message) {
            //Si se ha editado, volverá a la ruta de "/perfil/mis_recetas"
            console.log(response.data.message)
            res.redirect("/perfil/mis_recetas");
        }
    } catch (e) {
        console.log(e)
        res.redirect("/principal")
    }
})

router.get("/perfil/eliminar", async (req,res)=>{
    if(!req.session.user){
        res.redirect("/")
    }
    const id = req.query.id
    try{
         //Envío el id de la receta que queremos borrar (que recojo de la query de la ruta) hacia la ruta del servidor que realizará la consulta
        const response = await axios.delete(`http://localhost:3000/api/receta/eliminar/${id}`)
        if (response.data.message) {
            //Si se ha borrado, volverá a la ruta de "/perfil/mis_recetas"
            console.log(response.data.message)
            res.redirect("/perfil/mis_recetas");
        }
    } catch (e) {
        console.log(e)
        res.redirect("/principal")
    }
})

export default router