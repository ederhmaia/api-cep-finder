"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
describe('testing controller funcs', function () {
    test("cep indexer /89830000", function (done) {
        supertest_1.default('http://localhost:3333')
            .get('/89830000')
            .expect("Content-Type", /json/)
            .expect(200)
            .expect(function (res) {
            res.body.localidade == "Abelardo Luz";
        })
            .end(function (err, res) {
            if (err)
                return done(err);
            return done();
        });
    });
    test("cep finder /finder/SC/Abelardo Luz/Null/", function (done) {
        supertest_1.default('http://localhost:3333')
            .get('/finder/SC/Abelardo Luz/Null/')
            .expect("Content-Type", /json/)
            .expect(200)
            .expect(function (res) {
            res.body[0].cep == "89830-000";
        })
            .end(function (err, res) {
            if (err)
                return done(err);
            return done();
        });
    });
    test("cep finder invalid syntax ", function (done) {
        supertest_1.default('http://localhost:3333')
            .get('/finder/SC/Abelardo Luz/éí/')
            .expect(400)
            .end(function (err, res) {
            if (err)
                return done(err);
            return done();
        });
    });
    test("cep finder not found", function (done) {
        supertest_1.default('http://localhost:3333')
            .get('/finder/SC/Luz Abelardo/Null/')
            .expect(404)
            .end(function (err, res) {
            if (err)
                return done(err);
            return done();
        });
    });
});
