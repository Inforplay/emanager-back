import express from "express";
import { buscarTodos, buscarUm, criar, deletar, editar } from "../controllers/contasController.mjs"

const router = express.Router();

router.get("/", async (req, res) => {
    // #swagger.tags = ['Contas']
    // #swagger.description = 'Retorna todos os registros'
    /* #swagger.responses[200] = {
            description: 'Retorna todos os registros',
            schema: [{
                id: 1,
                email: "email",
                senha: "senha",
                store_id: 1,
                autenticacao_2fa: true,
                data_nascimento: "00/00/0000",
                cliente_id: 1
            }]
    } */
    res.json(await buscarTodos());
})

router.get("/:id", async (req, res) => {
    // #swagger.tags = ['Contas']
    // #swagger.description = 'Retorna um registro'
    /* #swagger.responses[200] = {
            description: 'Retorna um registro',
            schema: {
                id: 1,
                email: "email",
                senha: "senha",
                store_id: 1,
                autenticacao_2fa: true,
                data_nascimento: "00/00/0000",
                cliente_id: 1"
            }
    } */
    res.json(await buscarUm(req.params.id));
})

router.post("/", async (req, res) => {
    // #swagger.tags = ['Contas']
    // #swagger.description = "Cria um registro"
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                $email: "email",
                $senha: "senha",
                $store_id: 1,
                $autenticacao_2fa: true,
                $data_nascimento: "00/00/0000",
                $cliente_id: 1"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Registro criado',
            schema: {
                type: 'success',
                description: 'Registro criado com sucesso.',
            }
    } */
    res.json(await criar(req.body));
})

// Rota PUT sem ID (para evitar erro 404)
router.put("/", async (req, res) => {
    res.status(400).json({
        tipo: "error",
        mensagem: "É necessário fornecer o ID da conta na URL. Exemplo: /contas/1"
    });
});

router.put("/:id", async (req, res) => {
    // #swagger.tags = ['Contas']
    // #swagger.description = "Atualiza um registro"
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                $id: 1,
                $email: "email",
                $senha: "senha",
                $store_id: 1,
                $autenticacao_2fa: true,
                $data_nascimento: "00/00/0000",
                $cliente_id: 1"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Registro atualizado',
            schema: {
                type: 'success',
                description: 'Registro atualizado com sucesso.',
            }
    } */
    
    if (!req.params.id) {
        return res.status(400).json({
            tipo: "error",
            mensagem: "ID da conta não fornecido"
        });
    }

    res.json(await editar(req.body, req.params.id));
})

router.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Contas']
    // #swagger.description = "Deleta um registro"
    /* #swagger.responses[200] = {
            description: 'Registro deletado',
            schema: {
                type: 'success',
                description: 'Registro deletado com sucesso.',
            }
    } */
    res.json(await deletar(req.params.id));
})

export default router;