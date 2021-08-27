import request from "supertest";

describe('testing controller funcs', () => {
  test("cep indexer /89830000", (done) => {
    request('http://localhost:3333')
      .get('/89830000')
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.localidade == "Abelardo Luz";
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("cep finder /finder/SC/Abelardo Luz/Null/", (done) => {
    request('http://localhost:3333')
      .get('/finder/SC/Abelardo Luz/Null/')
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body[0].cep == "89830-000"
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("cep finder invalid syntax ", (done) => {
    request('http://localhost:3333')
      .get('/finder/SC/Abelardo Luz/éí/')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("cep finder not found", (done) => {
    request('http://localhost:3333')
      .get('/finder/SC/Luz Abelardo/Null/')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});