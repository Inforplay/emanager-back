import { prisma } from "../services/index.js";

async function buscarTodos(){
    try {
        return await prisma.licencas.findMany({
            include: {
                jogos: true
            }
        });
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarUm(id){
    try {
        const request = await prisma.licencas.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                jogos: true
            }
        });
        if(request){
            return request;
        }
        return {
            tipo: "warning",
            mensagem: "Registro não encontrado"
        }

    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function criar(dados){
    try {
        const request = await prisma.licencas.create({
            data: dados
        });

        if(request){
            return {
                tipo: "success",
                mensagem: "Registro criado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function editar(dados, id){
    try {
        const request =  await prisma.licencas.update({
            data: dados,
            where: {
                id: Number(id)
            }
        });

        if(request){
            return {
                tipo: "success",
                mensagem: "Registro atualizado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function deletar(id){
    try {
        const request =  await prisma.licencas.delete({
            where: {
                id: Number(id)
            }
        });

        if(request){
            return {
                tipo: "success",
                mensagem: "Registro deletado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

export {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}