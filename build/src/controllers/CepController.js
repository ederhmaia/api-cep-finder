"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var api = axios_1.default.create({
    baseURL: 'https://viacep.com.br/ws/'
});
exports.default = {
    index: function (Req, Res) {
        return __awaiter(this, void 0, void 0, function () {
            var Cep, Type;
            return __generator(this, function (_a) {
                Cep = Req.params.Cep;
                Type = "json";
                api
                    .get("/" + Cep + "/" + Type + "/")
                    .then(function (ApiResponse) {
                    if (ApiResponse.data.cep == undefined) {
                        return Res.status(404).send("A pesquisa n\u00E3o foi encontrada!<br>\n                    <br><strong>Datasets: https://viacep.com.br/<strong>");
                    }
                    else {
                        return Res.json(ApiResponse.data);
                    }
                })
                    .catch(function (err) {
                    return Res.status(err.request.res.statusCode).send("O CEP " + Cep + " n\u00E3o \u00E9 v\u00E1lido! <br><strong>Datasets: https://viacep.com.br/<strong>");
                });
                return [2 /*return*/];
            });
        });
    },
    finder: function (Req, Res) {
        return __awaiter(this, void 0, void 0, function () {
            var UF, Cidade, Logradouro, Type;
            return __generator(this, function (_a) {
                UF = Req.params.UF;
                Cidade = Req.params.Cidade;
                Logradouro = Req.params.Logradouro;
                Type = "json";
                api
                    .get("/" + UF + "/" + Cidade + "/" + Logradouro + "/" + Type + "/")
                    .then(function (ApiResponse) {
                    if (ApiResponse.data[0] == undefined) {
                        return Res.status(404).send("A pesquisa n\u00E3o foi encontrada!<br>\n                    <br><strong>Datasets: https://viacep.com.br/<strong>");
                    }
                    else {
                        return Res.json(ApiResponse.data);
                    }
                })
                    .catch(function (err) {
                    return Res.status(err.request.res.statusCode).send("A pesquisa <b>" + err.config.url + "</b> n\u00E3o \u00E9 v\u00E1lida!<br>\n                <br>Formato: <b>/UF/Cidade/Logradouro/retorno</b> (<i>Opcional (JSON default).</i>)\n                <br>Exemplos: <b>/RS/Porto Alegre/Domingos/  - /RS/Porto Alegre/Domingos/xml</b><br>\n                <br>Para Logradouro vazio, use <i>null</i>\n                <br><strong>Datasets: https://viacep.com.br/<strong>");
                });
                return [2 /*return*/];
            });
        });
    },
};
