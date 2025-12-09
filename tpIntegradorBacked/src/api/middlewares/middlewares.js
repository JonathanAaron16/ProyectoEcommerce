

// Middleware logger que muestra por consola todas las solicitudes
const loggerUrl = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

// Middleware de ruta para validar el id en la ruta /api/products/:id
const validateId = (req, res, next) => {
    const { id } = req.params;

    // Validar que el ID sea un numero (de lo contrario la consulta podria generar un error en la BBDD)
    if(!id || isNaN(id)) {
        return res.status(400).json({
            message: "El id debe ser un numero"
        });
    }

    // Convertimos el parametro id (originalmente un string porque viene de una URL) a un numero entero (integer en base 10 decimal)
    req.id = parseInt(id, 10); // convertimos el id a un entero

    console.log("Id validado!: ", req.id);

    next(); // Continuar al siguiente middleware (si lo hay) o con la respuesta
}


const requireLogin = (req, res, next) => {

    if(!req.session.user) {
        return res.redirect("/login");
    }
   
    next();
}

export {
    loggerUrl,
    validateId,
    requireLogin
}