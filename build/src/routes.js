"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var CepController_1 = __importDefault(require("./controllers/CepController"));
var routes = express_1.Router();
routes.get('/', function (req, res) {
    return res.send("/cep <br>ex: 127.0.0.1:3333/89830000<br><br>/finder/UF:/Cidade:/Logradouro: para busca de CEPs <br>ex: 127.0.0.1:3333/finder/SC/Abelardo Luz/null/");
});
routes.get('/:Cep', CepController_1.default.index);
routes.get('/finder/:UF/:Cidade/:Logradouro', CepController_1.default.finder);
exports.default = routes;
