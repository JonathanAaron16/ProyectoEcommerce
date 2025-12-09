import { Router } from "express";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();


router.get("/", requireLogin);

router.get("/consultar", requireLogin, (req, res) => {

    
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});



router.get("/crear", requireLogin, (req, res) => {

    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});

router.get("/modificar", requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    })
});

router.get("/eliminar", requireLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    })
});


// Vista Login
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});
// Exportamos las rutas de las vistas
export default router;