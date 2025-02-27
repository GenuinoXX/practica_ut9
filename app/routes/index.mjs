import express from "express";
import axios from "axios";
import path from "path";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("completas/registrologin")
})

// Renderizar la vista principal con recetas aleatorias
router.get("/principal", async (req, res) => {
    try {
        let usuario = req.session.user;
        const email = req.session.user.email
        const response = await axios.get(`http://localhost:3000/api/recetas/${email}`);
        res.render("completas/index", { recetas: response.data, usuario: usuario });
    } catch (error) {
        console.error("Error al cargar recetas:", error);
        res.render("completas/index", { usuario: usuario, recetas: [], error: "No se pudieron cargar las recetas" });
    }
});

// Ruta para filtrar recetas desde la vista
router.get("/filtrar", async (req, res) => {
    const { tipoDieta, objetivo, alergenos } = req.query;

    try {
        // Enviar valores al backend
        const response = await axios.get(`http://localhost:3000/api/recetas/filtrar/${tipoDieta}/${objetivo}/${alergenos}`    
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error al filtrar recetas:", error);
        res.status(500).json({ error: "Error al filtrar recetas" });
    }
});

router.get("/desbloquear", async (req, res) => {
    
    let email = req.session.user.email
    const id_receta = req.query.id
    
    try {
        // Enviar valores al backend de la API para desbloquear la receta
        const respuesta = await axios.post(`http://localhost:3000/api/recetas/desbloquear/${email}/${id_receta}`);
        
        if (respuesta.data.message) {
            console.log(respuesta.data.message)
            res.redirect("/principal");
        }
    } catch (error) {
        console.error("Error al desbloquear receta:", error);
        res.status(500).json({ error: "Error al desbloquear receta" });
    }
});

export default router;