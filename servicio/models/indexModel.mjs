import db from "../config/db.mjs";

// Obtener recetas aleatorias que el usuario aún no ha desbloqueado
export const obtenerRecetasAleatorias = async (email) => {
    const busqueda = email;
    const [recetas] = await db.query(
        `SELECT r.*
        FROM Recetas r
        LEFT JOIN Usuario_Desbloqueadas ud ON r.id_receta = ud.id_receta AND ud.email = ?
        LEFT JOIN Usuario_Recetas ur ON r.id_receta = ur.id_receta AND ur.email = ?
        WHERE ud.id_receta IS NULL AND ur.id_receta IS NULL
        ORDER BY RAND()
        LIMIT 10;
        `,
        [busqueda, busqueda]
    );
    return recetas;
};

// Filtrar recetas según los parámetros seleccionados por el usuario
export const filtrarRecetasIndex = async (tipoDieta, alergenos, objetivo) => {
    let query = "SELECT * FROM Recetas WHERE 1=1";
    let parametros = [];

    // Solo agregamos condiciones si el usuario ha seleccionado una opción distinta de "Ninguno"
    if (tipoDieta && tipoDieta !== "Ninguno") {
        query += " AND tipo_dieta = ?";
        parametros.push(tipoDieta);
    }
    if (objetivo && objetivo !== "Ninguno") {
        query += " AND objetivos_salud = ?";
        parametros.push(objetivo);
    }
    if (alergenos && alergenos !== "Ninguno") {
        query += " AND alergias = ?";
        parametros.push(alergenos);
    }

    try {
        const [recetas] = await db.query(query, parametros);
        return recetas;
    } catch (error) {
        console.error("Error en la consulta de filtrado:", error);
        throw error;
    }
};

// Registrar una receta como desbloqueada para un usuario
export const nuevoDesbloqueado = async (email, id_receta) => {
    try {
        await db.query(
            "INSERT INTO Usuario_Desbloqueadas (email, id_receta) VALUES (?, ?);",
            [email, id_receta]
        );
    } catch (error) {
        console.error("Error al registrar receta desbloqueada:", error);
        throw error;
    }
};