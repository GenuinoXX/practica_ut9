import express from "express";
import rutasLogout from "./routes/logout.mjs"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import rutasLogin from "./routes/login.mjs";
import rutasRegistrar from "./routes/register.mjs";
import rutasIndex from "./routes/index.mjs";
import rutasSubirReceta from "./routes/subir_receta.mjs";
import rutasPerfil from "./routes/perfil.mjs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = 3001;
const app = express();

//Configuración sesiones
import session from "express-session";
app.use(session({
    secret: "secreto-super-seguro",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Cambia a true si usas HTTPS
}));

// Configuración para usar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("views", path.join(path.resolve("."), "views"))
app.use(express.static(path.join(__dirname, 'public')));

//Ruta para acceder a los avatares
app.use('/avatares', express.static(path.join(__dirname, 'public', 'avatares')));
//Esto lo podemos quitar porque los avatares ya no los vamos a guardar como ENUM guardando las URL's relativas


// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use("/", rutasIndex);
app.use("/", rutasPerfil);
app.use("/subir_receta", rutasSubirReceta);
app.use("/login", rutasLogin);
app.use("/register", rutasRegistrar);
app.use("/", rutasLogout);

app.listen(port, () => {
    console.log(`Servidor web corriendo en http://localhost:${port}`);
});