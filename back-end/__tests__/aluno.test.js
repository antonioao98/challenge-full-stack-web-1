const request = require("supertest");
const app = require("../src/app");

describe("Test my API", ()=>{
  it("should get main router", async ()=>{
  const res = await request(app)
    .get("/Student")
    expect(res.statusCode).toEqual(200)
  })
  
  it("it should get status code 201 after created", async ()=>{
    const res = await request(app)
    .post("/newStudent")
    .send({
      "nome":"antonisdao",
      "email":"zzz.com.br",
      "ra":"12345",
      "cpf":"837.021.690-08"
    })
    expect(res.statusCode).toEqual(201)
  })
  
  it("should passing one input empty and return status code 400", async ()=>{
    const res = await request(app)
    .post("/newStudent")
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
    .delete("/deleteStudent/1")
    expect(res.statusCode).toEqual(200)
  })

  it("should updated the student with id equal 1", async ()=>{
    const res = await request(app)
      .put("/updateStudent/45")
      .send({
        "nome":"antonioAragão",
      "email":"tora94@gmail.com.br",
      "ra":"2234221",
      "cpf":"837.021.690-08"
      })
      expect(res.statusCode).toEqual(200)
    })

    it("should passing one input empty and return status code 400 in /updateAluno/:id", async ()=>{
      const res = await request(app)
      .put("/updateStudent/1")
      .send({
        "nome":"antonisdergao",
        "email":"t.ora94@gmail.com.br",
        "ra":"2234221",
        "cpf":""
      })
      expect(res.statusCode).toEqual(400)
    })
  
})