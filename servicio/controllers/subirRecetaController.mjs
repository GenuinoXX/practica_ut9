import { subirReceta, agregarIngredientes } from "../models/subirRecetaModel.mjs";
import { actualizarTokens } from "../config/firebase.mjs";

export const crearReceta = async (req, res) => {
    try {
        const email = req.body.email;

        // Extraer datos de la receta
        const recetaData = {
            nombre_receta: req.body.nombre_receta,
            descripcion_receta: req.body.descripcion_receta,
            foto_receta: req.body.foto_receta,
            tipo_dieta: req.body.tipo_dieta,
            objetivos_salud: req.body.objetivos_salud,
            alergias: req.body.alergias
        };

        // Extraer ingredientes y convertirlos en objetos válidos
        const ingredientes = req.body.ingredientes.nombre.map((nombre, index) => ({
            nombre,
            cantidad: req.body.ingredientes.cantidad[index],
            unidad: req.body.ingredientes.unidad[index]
        }));

        const recetaId = await subirReceta(recetaData, email);
        await agregarIngredientes(recetaId, ingredientes);
        // Sumar 1 token al usuario
        await actualizarTokens(email, 1);

        res.status(200).json({ message: "Receta creada exitosamente", recetaId });
    } catch (error) {
        console.error("Error al crear receta:", error);
        res.status(500).json({ error: "Error al crear receta" });
    }
};