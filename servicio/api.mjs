import express from "express";
import process from "process";
import rutasIndex from "./routes/index.mjs";
import rutasUsuario from "./routes/usuario.mjs";
import rutasLogin from "./routes/login.mjs";
import rutasRegistrar from "./routes/register.mjs";
import rutasRecetas from "./routes/recetas.mjs";
import rutasSubirRecetas from "./routes/subirRecetas.mjs";
import cors from 'cors';

const port = 3000;
const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.use("/api", rutasIndex);
app.use("/api", rutasUsuario);
app.use("/api/admin", rutasLogin);
app.use("/api/admin", rutasRegistrar);
app.use("/api", rutasRecetas);
app.use("/api", rutasSubirRecetas);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});

export default app;