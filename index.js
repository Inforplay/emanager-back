import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import docJson from "./src/docs/documentacao.json" with {type: "json"}

import niveisRoute from "./src/routes/niveisRoute.mjs";
import plataformaRoute from "./src/routes/plataformaRoutes.mjs";
import clientesRoute from "./src/routes/clientesRoute.mjs";
import jogosRoute from "./src/routes/jogosRoute.mjs";
import usuariosRoute from "./src/routes/usuariosRoute.mjs";
import { login } from "./src/controllers/usuarioController.mjs";
import licencasRoute from "./src/routes/licencasRoute.mjs";

const app = express();


// Middleware - interceptores
app.use(cors()); //libera requisições externas
app.use(express.json()); //transforma o corpo da requisição em javascript
app.use('/docs', swaggerUi.serve, swaggerUi.setup(docJson));

// Rotas

app.get("/", (req, res) => {
    res.redirect("/docs");
})
app.post("/login", async (req, res) => {
    // #swagger.tags = ['Usuarios']
    // #swagger.description = "Realiza o login do usuário"
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                $email: "email", 
                $senha: "senha"
                
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Login realizado',
            schema: {
                usuario: 'Dados do usuário'
                
            }
    } */
    res.json(await login(req.body));
});
app.use("/niveis", niveisRoute);
app.use("/plataformas", plataformaRoute);
app.use("/clientes", clientesRoute);
app.use("/jogos", jogosRoute);
app.use("/usuarios", usuariosRoute);
app.use("/licencas", licencasRoute);
app.listen(8000, () => {
    console.log(`Servidor on: http://localhost:8000`);
})