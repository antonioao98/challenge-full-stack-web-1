const {Student} = require('../app/models');
const cpfValidator = require('node-cpf-cnpj')
module.exports = {

  async findAllStudent(req,res){
    await Student.findAll().then((result)=>{
      res.status(200).json(result)
    }).catch((err)=>{
      res.status(400).json({error:err})
    })

    

  },
  async createStudent(req,res){
    const {name,email,ra} = req.body
    let cpf = req.body.cpf
    cpf = cpfValidator.format(cpf)
    var erro = []
    if(!name || name == null){
      erro.push("O nome está vazio")
    }
    if(!email || email ==null)
    {
      erro.push("O e-mail está vazio")
    }
    if(!ra ||ra ==null)
    {
      erro.push("O registro acadêmico está vazio")
      
    }
    if(!cpfValidator.isValid(cpf)){
      erro.push("CPF inválido. Digite um CPF válido no formato: 000.000.000-00")
    }
    if(erro.length > 0){
      return res.status(400).json({error:true, message:erro})
    }
    await Student.create({name,email,ra,cpf}).then(result => {
      res.status(201).json({error:false,message:"Aluno criado com sucesso !!", data:result})
    }).catch(err => {
      const messageErr = err.errors[0].message
      res.status(400).json({error: true, messageErr:messageErr})
    });
  },



  async deleteStudent(req,res){
    const {id} = req.params
    await Student.destroy({where:{id:id}}).then((result)=>{
      res.status(200).json({erro:false, message:"Aluno excluido com sucesso !!", result:result})
    }).catch((err)=>{
      res.status(400).json({erro:true})
    })
  },

  async updateStudent(req,res){
    const {id} = req.params
    const {name,email,ra} = req.body;
    let cpf = req.body.cpf
    cpf = cpfValidator.format(cpf)


    var erro = []
    if(!name || name == null){
      erro.push("O nome está vazio")
    }
    if(!email || email ==null)
    {
      erro.push("O e-mail está vazio")
    }
    if(!ra ||ra ==null)
    {
      erro.push("O registro acadêmico está vazio")
    }
    if(!cpfValidator.isValid(cpf)){
      erro.push("CPF inválido, digite um CPF válido no no formato: 000.000.000-00")
    }
    if(erro.length > 0){
      return res.status(400).json({erro:true, message:erro})
    }
    await Student.update({
       name, email, ra, cpf,update_at: Date.now()
      },{
        where:{
          id:id
        }
      }).then(result => {
      res.status(200).json({erro:false, message:"Aluno atualizado com sucesso !!"})
    }).catch(err => {
      const message = err.errors[0].message
      res.status(400).json({erro:true,message})
    });

  }

 }