import express from "express"
import path from "path"
import axios from "axios";

const router = express.Router()

router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        await axios.post("http://localhost:3000/api/admin/register", { email, password });
        res.redirect("/login")
    } catch (error) {
        console.log("Error en el registro:", error);
        const mensajeError = error.response?.data?.mensaje;
        res.render("completas/register", { mensajeError: mensajeError });
    }
});

router.get("/", (req, res) => {
    res.render("completas/register",{ mensajeError: null })
})

export default router
