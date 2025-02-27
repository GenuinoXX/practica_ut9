import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { crearPerfilUsuario } from "../models/usuarioModel.mjs";
import bcrypt from "bcryptjs";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID
}

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);


export const registrarUsuario = async (email, password) => {
    try {
        const docSnap = await buscarEmail(email)
        if(docSnap){//Si el correo existe, lanzamos error
            throw new Error("El correo electrónico ya está registrado.")
        }
        const sal = 10;//Bit aleatorio de datos que se añade a la contraseña antes de hashear(Normalmente 10)
        const hashedPassword = await bcrypt.hash(password, sal)

        const db = getFirestore()
        const userDocRef = doc(collection(db, "usuarios_recetas"), email)//Se crea una referencia en la coleccion "usuarios_recetas" cuyo ID sera el email
        const info = {
            email: email,
            password: hashedPassword,
            tokens: 3//Cuando se registra un usuario, empezará con X tokens
        }
        await setDoc(userDocRef, info);//Se crea un documento para el usuario en Firebase
        await crearPerfilUsuario(email);//Se crea un usuario en la tabla Usuarios de MySQL
        return email
    } catch (error) {
        console.log("Error al registrar usuario:", error)
        throw error
    }
}

//Busca un email en la base de usuarios y lo devuelve
export const buscarEmail = async (email) => {
    try {
        const db = getFirestore();
        const docRef = doc(db, "usuarios_recetas", email.toLowerCase())
        const docSnap = await getDoc(docRef)
        //Si el documento existe, retorno los datos del usuario
        if(docSnap){
            return docSnap.data()
        }else{
            return false
        }
    } catch (error) {
        console.log("Error al buscar email:", error)
        throw error
    }
}

export const comprobarLogin = async (email, password) => {
    try {
        //Búsqueda del usuario por su email
        const usuario = await buscarEmail(email)
        if (usuario) { // si existe el usuario se mira la constraseña
            const hashedPassword = usuario.password
            const match = await bcrypt.compare(password, hashedPassword)
            if(match){
                console.log("Login correcto")
                return usuario;
            }else{
                console.log("Contraseña incorrecta")
                return false;
            }
        } else {
            console.log("Usuario no encontrado")
            return false;
        }
    } catch (error) {
        console.log("Error al comprobar login:", error)
        throw error
    }
}

export const actualizarTokens = async (email, cantidad) => {
    try {
        const db = getFirestore();
        const userRef = doc(db, "usuarios_recetas", email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const tokensActuales = userSnap.data().tokens || 0;
            
            // No permitir que los tokens sean negativos
            const nuevosTokens = Math.max(tokensActuales + cantidad, 0);

            await updateDoc(userRef, { tokens: nuevosTokens });
            console.log(`Tokens actualizados para ${email}: ${nuevosTokens}`);
            return nuevosTokens;
        } else {
            throw new Error("Usuario no encontrado en Firebase.");
        }
    } catch (error) {
        console.error("Error actualizando tokens:", error);
        throw error;
    }
};