module.exports = (sequelize, DataTypes)=>{
  const Aluno = sequelize.define("Aluno", {
    nome:DataTypes.STRING,
    email:DataTypes.STRING,
    ra:DataTypes.STRING,
    cpf:DataTypes.STRING
  });
  return Aluno;
};