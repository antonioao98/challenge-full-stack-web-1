const {Aluno} = require('../app/models');
 module.exports = {

  async findAllAluno(req,res){
    await Aluno.findAll().then((result)=>{
      res.status(200).json(result)
    }).catch((err)=>{
      res.status(400).json({err:err})
    })

    

  },
  async createAluno(req,res){
    const {nome,email,ra,cpf} = req.body
    var erro = []
    if(!nome || nome == null){
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
    if(!cpf ||cpf ==null){
      erro.push("O CPF está vazio")
    }
    if(erro.length > 0){
      return res.status(400).json({erro:true, mensagem:erro})
    }
    await Aluno.create({nome,email,ra,cpf}).then(result => {
      res.status(201).json({erro:false,message:"Aluno criado com sucesso !!", dados:result})
    }).catch(err => {
      const messageErro = err.errors[0].message
      res.status(400).json({erro: true, messageErro})
    });
  },



  async deleteAluno(req,res){
    const {id} = req.params
    await Aluno.destroy({where:{id:id}}).then((result)=>{
      res.status(200).json({erro:false, messagem:"Aluno excluido com sucesso !!", result:result})
    }).catch((err)=>{
      res.status(400).json({erro:true})
    })
  },

  async updateAluno(req,res){
    const {id} = req.params
    const {nome,email,ra,cpf} = req.body;
    var erro = []
    if(!nome || nome == null){
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
    if(!cpf ||cpf ==null){
      erro.push("O CPF está vazio")
    }
    if(erro.length > 0){
      return res.status(400).json({erro:true, mensagem:erro})
    }
    await Aluno.update({
       nome:nome, email:email, ra:ra, cpf:cpf,update_at: Date.now()
      },{
        where:{
          id:id
        }
      }).then(result => {
      res.status(200).json({erro:false, message:"Aluno atualizado com sucesso !!"})
    }).catch(err => {
      res.status(400).json({erro:true,err})
    });

  }

 }