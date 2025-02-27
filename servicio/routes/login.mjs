import express from 'express';
import { comprobarLogin } from '../config/firebase.mjs'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await comprobarLogin(email, password);
        if (usuario) {
            res.status(200).json({ message: 'Inicio de sesión correcto', usuario });
        } else {
            //Codigo 401 - Credenciales incorrectas
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        //500 -> Error en el servidor
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

export default router;