import db from "../config/db.mjs";

// Función para insertar una nueva receta
export const subirReceta = async (receta, email) => {
    try {
        const query = `
            INSERT INTO Recetas (nombre_receta, descripcion_receta, foto_receta, tipo_dieta, objetivos_salud, alergias) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [
            receta.nombre_receta,
            receta.descripcion_receta,
            receta.foto_receta,
            receta.tipo_dieta,
            receta.objetivos_salud,
            receta.alergias
        ];

        const [result] = await db.query(query, params);
        const recetaId = result.insertId;

        // Relacionar la receta con el usuario
        await db.query("INSERT INTO Usuario_Recetas (email, id_receta) VALUES (?, ?)", [email, recetaId]);
        return recetaId; // Retorna el ID de la receta insertada
    } catch (error) {
        console.error("Error al subir receta:", error);
        throw error;
    }
};

// Función para insertar ingredientes en la nueva tabla `Ingredientes_Cantidades`
export const agregarIngredientes = async (recetaId, ingredientes) => {
    try {
        for (let ing of ingredientes) {
            if (!ing.nombre || !ing.cantidad || !ing.unidad) {
                console.error("Ingrediente inválido:", ing);
                continue; // Saltar ingredientes con datos faltantes
            }
            
            await db.query(
                "INSERT INTO Ingredientes_Cantidades (receta_id, nombre_ingrediente, cantidad, unidad) VALUES (?, ?, ?, ?)",
                [recetaId, ing.nombre, ing.cantidad, ing.unidad]
            );
        }
    } catch (error) {
        console.error("Error al agregar ingredientes:", error);
        throw error;
    }
};