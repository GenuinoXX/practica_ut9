import { obtenerRecetasAleatorias, filtrarRecetasIndex, nuevoDesbloqueado } from "../models/indexModel.mjs";
import { actualizarTokens, buscarEmail } from "../config/firebase.mjs";

// Obtener recetas aleatorias (excluyendo las desbloqueadas por el usuario)
export const obtenerRecetas = async (req, res) => {
    try {
        const email = req.params.email; // Obtener el email del usuario desde la URL
        const recetas = await obtenerRecetasAleatorias(email);
        res.json(recetas);
    } catch (error) {
        console.error("Error al obtener recetas:", error);
        res.status(500).json({ error: "Error al obtener recetas" });
    }
};

// Filtrar recetas según los criterios seleccionados por el usuario
export const filtrarRecetas = async (req, res) => {
    try {
        const tipoDieta = req.params.tipoDieta !== "Ninguno" ? req.params.tipoDieta : null;
        const alergenos = req.params.alergenos !== "Ninguno" ? req.params.alergenos : null;
        const objetivo = req.params.objetivo !== "Ninguno" ? req.params.objetivo : null;

        const recetas = await filtrarRecetasIndex(tipoDieta, alergenos, objetivo);
        res.json(recetas);
    } catch (error) {
        console.error("Error al filtrar recetas:", error);
        res.status(500).json({ error: "Error al filtrar recetas" });
    }
};

// Desbloquear una receta para un usuario
export const desbloquearReceta = async (req, res) => {
    try {
        const email = req.params.email;
        const id_receta = req.params.id_receta;
        const usuario = await buscarEmail(email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (usuario.tokens > 0) {
            await actualizarTokens(email, -1);
            await nuevoDesbloqueado(email, id_receta);
            res.status(200).json({ message: "Receta desbloqueada correctamente" });
        } else {
            res.status(403).json({ error: "No tienes suficientes tokens para desbloquear esta receta." });
        }
    } catch (error) {
        console.error("Error al desbloquear receta:", error);
        res.status(500).json({ error: "Error al desbloquear receta" });
    }
};