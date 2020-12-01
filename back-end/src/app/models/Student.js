module.exports = (sequelize, DataTypes)=>{
  const Students = sequelize.define("Student", {
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    ra:DataTypes.STRING,
    cpf:DataTypes.STRING
  });
  return Students;
};