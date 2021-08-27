import { Router } from 'express'
import CepController from './controllers/CepController'

const routes = Router()

routes.get('/', (req, res) => {
    return res.send(`/cep <br>ex: 127.0.0.1:3333/89830000<br><br>/finder/UF:/Cidade:/Logradouro: para busca de CEPs <br>ex: 127.0.0.1:3333/finder/SC/Abelardo Luz/null/`)
})
routes.get('/:Cep', CepController.index)
routes.get('/finder/:UF/:Cidade/:Logradouro', CepController.finder)

export default routes