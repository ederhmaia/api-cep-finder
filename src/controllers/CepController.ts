import { Request, Response } from 'express'
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default {
    async index(Req: Request, Res: Response) {
        const Cep = Req.params.Cep
        const Type = "json"

        api
            .get(`/${Cep}/${Type}/`)
            .then((ApiResponse) => {
                if (ApiResponse.data.cep == undefined) {
                    return Res.status(404).send(`A pesquisa não foi encontrada!<br>
                    <br><strong>Datasets: https://viacep.com.br/<strong>`)
                } else {
                    return Res.json(ApiResponse.data)
                }
            })
            .catch((err) => {
                return Res.status(err.request.res.statusCode).send(`O CEP ${Cep} não é válido! <br><strong>Datasets: https://viacep.com.br/<strong>`);
            });
    },
    
    async finder(Req: Request, Res: Response) {
        const UF = Req.params.UF
        const Cidade = Req.params.Cidade 
        const Logradouro = Req.params.Logradouro 
        const Type = "json"
        
        api
            .get(`/${UF}/${Cidade}/${Logradouro}/${Type}/`)
            .then((ApiResponse) => {
                if (ApiResponse.data[0] == undefined) {
                    return Res.status(404).send(`A pesquisa não foi encontrada!<br>
                    <br><strong>Datasets: https://viacep.com.br/<strong>`)
                } else {
                    return Res.json(ApiResponse.data)
                }
            })
            .catch((err) => {
                return Res.status(err.request.res.statusCode).send(`A pesquisa <b>${err.config.url}</b> não é válida!<br>
                <br>Formato: <b>/UF/Cidade/Logradouro/retorno</b> (<i>Opcional (JSON default).</i>)
                <br>Exemplos: <b>/RS/Porto Alegre/Domingos/  - /RS/Porto Alegre/Domingos/xml</b><br>
                <br>Para Logradouro vazio, use <i>null</i>
                <br><strong>Datasets: https://viacep.com.br/<strong>`)
            });
    },
};