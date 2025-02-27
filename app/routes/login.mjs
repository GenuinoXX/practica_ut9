import express, { response } from "express"
import path from "path"
import axios from "axios"
import { crearSesion } from "../middlewares/auth.mjs"
import session from "express-session"

const router = express.Router()

router.use(express.urlencoded({extended:true}))
router.use(express.json())

router.get("/", (req, res) => {
    res.render("completas/login");
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await axios.post("http://localhost:3000/api/admin/login", {
            email,
            password,
        });
        
        if (usuario.data) {
            const usuarioData = usuario.data.usuario;
            // Si el login va bien, guardo la sesión
            crearSesion(req, res, usuarioData);
            return res.redirect("/principal"); 
        } else {
            return res.render("completas/login", { error: "credenciales-incorrectas" }); 
        }
    } catch (error) {
        console.error("Error en el login:", error);
        res.redirect("/login")
    }
});


export default router