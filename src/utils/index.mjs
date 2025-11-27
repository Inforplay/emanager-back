import jwt from "jsonwebtoken";
function rotaProtegida(req,  res, next){
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token.split(" ")[1], process.env.SEGREDO, (error) => {
            if(error){
                res.json({
                    tipo: "error",
                    mensagem: "Token inválido"
                })
            }
            next();
        })
    }else{
        res.json({
            tipo: "warning",
            mensagem: "Token é necessário"
        })
    }
}

export {
    rotaProtegida
}