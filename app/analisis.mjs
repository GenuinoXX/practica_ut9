import axios from "axios"
import { DataFrame } from "data-forge"

async function fetchRecetasTipoDieta() {
    try {
        const response = await axios.get(`http://localhost:3000/api/recetas`)
        const recetas = response.data.recetas

        const df = new DataFrame(recetas);
        const recetasPorDieta = df.groupBy(fila => fila.tipo_dieta)
                                   .select(grupo => ({
                                       tipo_dieta: grupo.first().tipo_dieta,
                                       cantidad: grupo.count()
                                   }))
                                   .toArray()

        console.log("Análisis de recetas por tipo de dieta:")
        console.log(recetasPorDieta)
    } catch (error) {
        console.error("Error al obtener recetas:", error)
    }
}

fetchRecetasTipoDieta()