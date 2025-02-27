import express from 'express';
import { registrarUsuario } from '../config/firebase.mjs'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para registrarse
router.post('/register', async (req, res) => {
    const { email, password } = req.body;//Se extraen datos del formulario
    try {
        //LLamada a la funcion
        const usuario = await registrarUsuario(email, password);
        if (usuario) {
            //Según la verificacion se envia cierto mensaje y los datos del usuario
            res.status(200).json({ message: 'Registro con éxito', usuario });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        //Envio del codigo y el error
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});

export default router;