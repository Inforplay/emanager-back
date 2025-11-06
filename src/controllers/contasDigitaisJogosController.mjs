import { prisma } from "../services/index.js";
import bcrypt from "bcrypt";

async function buscarTodos(){
    try {
        return await prisma.contasDigitaisJogos.findMany();
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarUm(id){
    try {
        const request = await prisma.contasDigitaisJogos.findFirst({
            where: {
                id: Number(id)
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
        dados = {
            ...dados,
            senha: await bcrypt.hash(dados.senha, 10)
        }
        const request = await prisma.contasDigitaisJogos.create({
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
        const request =  await prisma.contasDigitaisJogos.update({
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
        const request =  await prisma.contasDigitaisJogos.delete({
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
async function login(dados){
    try {
        
        const usuario = await prisma.contasDigitaisJogos.findFirst({
            where: {
                email: dados.email
            }
        });
        if(!usuario){
            return {
                tipo: "error",
                mensagem: "Usuário não encontrado!"
            }
        }
        const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);
        if(!senhaValida){
            return {
                tipo: "error",
                mensagem: "Usuário ou Senha inválida!"
            }
        }
        
            return {
                usuario
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
    deletar,
    login,
}

