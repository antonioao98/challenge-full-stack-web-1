require('dotenv').config({
  path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

module.exports = {
  host: process.env.DB_HOST ||'127.0.0.1',
  username:process.env.DB_USER ||'root',
  password:process.env.DB_PASS ||'',
  database:process.env.DB_NAME ||'challenge',
  dialect:'mysql',
  operatorsAliases: 1,
  logging: false,
  define:{
    timestamps:true,
    underscored: true,
    underscoredAll: true,

  },
}