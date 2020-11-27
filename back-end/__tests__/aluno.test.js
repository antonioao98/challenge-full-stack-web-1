const request = require("supertest");
const app = require("../src/app");

describe("Test my API", ()=>{
  it("should get main router", async ()=>{
  const res = await request(app)
    .get("/aluno")
    expect(res.statusCode).toEqual(200)
  })
  
  it("it should get status code 201 after created", async ()=>{
    const res = await request(app)
    .post("/newAluno")
    .send({
      "nome":"antonisdao",
      "email":"zzz.com.br",
      "ra":"x",
      "cpf":"0"
    })
    expect(res.statusCode).toEqual(201)
  })
  
  it("should passing one input empty and return status code 400", async ()=>{
    const res = await request(app)
    .post("/newAluno")
    .send({
      "nome":"antonisdergao",
      "email":"t.ora94@gmail.com.br",
      "ra":"2234221",
      "cpf":""
    })
    expect(res.statusCode).toEqual(400)
  })
  
  it("should delete the student with id equal 1", async ()=>{
  const res = await request(app)
    .delete("/deleteAluno/1")
    expect(res.statusCode).toEqual(200)
  })

  it("should updated the student with id equal 1", async ()=>{
    const res = await request(app)
      .put("/updateAluno/1")
      .send({
        "nome":"antonisdergao",
      "email":"t.ora94@gmail.com.br",
      "ra":"2234221",
      "cpf":"2"
      })
      expect(res.statusCode).toEqual(200)
    })

    it("should passing one input empty and return status code 400 in /updateAluno/:id", async ()=>{
      const res = await request(app)
      .put("/updateAluno/1")
      .send({
        "nome":"antonisdergao",
        "email":"t.ora94@gmail.com.br",
        "ra":"2234221",
        "cpf":""
      })
      expect(res.statusCode).toEqual(400)
    })
  
})