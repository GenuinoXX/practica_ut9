import axios from "axios"
import { DataFrame } from "data-forge"

async function fetchRecetasTipoDieta() {
    try {
        const email = req.session.user.email
        const response = await axios.get(`http://localhost:3000/api/recetas/${email}`)
        const recetas = response.data;

        const df = new DataFrame(recetas);
        const recetasPorDieta = df.groupBy(row => row.tipoDieta)
                                   .select(group => ({
                                       tipoDieta: group.first().tipoDieta,
                                       cantidad: group.count()
                                   }))
                                   .inflate()

        console.log("Análisis de recetas por tipo de dieta:")
        console.log(recetasPorDieta.toArray())
    } catch (error) {
        console.error("Error al obtener recetas:", error);
    }
}

fetchRecetasTipoDieta()