/*===================
    Importaciones
===================*/
import express from "express";
const app = express(); // app es la instancia de la aplicacion Express y contiene todos sus metodos

import environments from "./src/api/config/environments.js"; // Traemos las variables de entorno para extraer el puerto
const PORT = environments.port;

import cors from "cors"; // Importamos cors para poder usar sus metodos y permitir solicitudes de otras aplicaciones

// Importamos los middlewares
import { loggerUrl , requireLogin} from "./src/api/middlewares/middlewares.js";

// Importamos las rutas de producto
import { productRoutes , viewRoutes } from "./src/api/routes/index.js";

// Importamos la configuracion para trabajar con rutas y archivos estaticos
import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";


import session from "express-session";
const SESSION_KEY = environments.session_key;



/*===================
    Middlewares
===================*/
app.use(cors()); // Middleware basico que permite todas las solicitudes
/* Que es CORS?
CORS, o Intercambio de Recursos de Origen Cruzado, es un mecanismo de seguridad implementado por los navegadores web que permite a una página web 
solicitar recursos desde un dominio diferente al del origen actual  Este mecanismo se activa cuando una solicitud HTTP se realiza a un recurso 
en un dominio distinto al de la página que la originó, y su propósito principal es proteger a los usuarios de ataques 
como el secuestro de sesión o el acceso no autorizado a datos sensibles  CORS funciona mediante la verificación de encabezados HTTP específicos, 
como `Access-Control-Allow-Origin`, que el servidor debe incluir en su respuesta para indicar si está autorizado el acceso desde un origen determinado  
Sin este permiso explícito, el navegador bloquea la solicitud para mantener la seguridad de la política del mismo origen*/

/* Middleware para parsear la informacion de JSON a objetos JS en las peticiones POST

El cuerpo de la solicitud, disponible en `req.body`, se utiliza comúnmente para recibir datos enviados en peticiones POST o PUT, aunque requiere middleware como `express.json()` para ser procesado correctamente
*/

// Middleware logger
app.use(loggerUrl);

app.use(express.json()); // Middleware que convierte los datos "application/json" que nos proporciona la cabecera (header) de las solicitudes POST y PUT, los pasa de json a objetos JS

// Middleware para servir archivos estaticos: construimos la ruta relativa para servir los archivos de la carpeta /public
app.use(express.static(join(__dirname, "src", "public"))); // Gracias a esto podemos servir los archivos de la carpeta public, como http://localhost:3000/img/haring1.png

// Middleware para parsear la info de <form>
app.use(express.urlencoded({ extended: true })); // Gracias a este middleware podemos leer la info que nos envia por POST los <form> de HTML (sin fetch y sin JSON)


// Middleware de sesion, cada vez que un usuario hace una solicitud HTTP, se gestionara su sesion mediante el middleware
app.use(session({
    secret: SESSION_KEY, // Firma las cookies para evitar manipulacion por el cliente, clave para la seguridad de la aplicaciones, este valor se usa para FIRMAR las cookies de sesion para que el servidor verifique que los datos no fueron alterados por el cliente
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarda sesiones vacias
}));

/*===================
    Configuracion
===================*/
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src", "views")); // Le indicamos la ruta donde estan las vistas ejs




// Ahora las rutas las gestiona el middleware Router
app.use("/api/products", productRoutes);


/*===================
    Endpoints
===================*/



// Devolveremos vistas
app.get("/", requireLogin, async (req, res) => {
    /* Logica pasada al middleware requireLogin
    if(!req.session.user) {
        return res.redirect("/login");
    }
    */

    try {
        const [rows] = await connection.query("SELECT * FROM productos");
        
        // Le devolvemos la pagina index.ejs
        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            products: rows
        }); 

    } catch (error) {
        console.log(error);
    }
});

app.get("/consultar", requireLogin,(req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id:"
    });
});

app.get("/crear", requireLogin,(req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});

app.get("/modificar",requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
})


app.get("/eliminar", requireLogin,(req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
})

// Vista de login
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Login dashboard"
    });
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validacion 1: Evitamos consulta innecesaria
        if(!email || !password) {
            return res.render("login", {
                title: "Login",
                about: "Login dashboard",
                error: "Todos los campos son obligatorios"
            });
        }

        const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ? ";
        const [rows] = await connection.query(sql, [email, password]);

        // Validacion 2: Verificamos si existe este email y password
        if(rows.length === 0) {
            return res.render("login", {
                title: "Login",
                about: "Login dashboard",
                error: "Credenciales incorrectas"
            })
        }

        // console.log(rows);
        const user = rows[0];
        console.table(user);

        req.session.user = {
                id: user.id,
                name: user.name,
                email: user.mail
            }


        res.redirect("/"); // Redirigimos a la pagina principal
      

    } catch (error) {
        console.error("Error en el login", error);
    }
});


// Creamos el endpoint para destruir la sesion y redireccionar
app.post("/logout", (req, res) => {

    // 1. Destruimos la sesion
    req.session.destroy((err) => {
        if(err) { // Si existiera algun error destruyendo la sesion
            console.log("Error al destruir la sesion", err);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        // 2. Redirigimos a login luego de cerrar la sesion
        res.redirect("/login");
    });
});





app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
