const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");

class CustomClient extends Client {
  constructor(options) {
    super(options);
    
    this.commands = new Collection();
    this.config = require("../config.js");
    this.chalk = require("chalk");
  }
  
  initDB() {
    mongoose.connect(this.config.mongodb, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      return console.log(this.chalk.greenBright('[DB Ready] Conectado a la Base de Datos MongoDB.'));
    }).catch((err) => {
      return console.log(this.chalk.red(`No se puede conectar a la base de datos MongoDB. Error: ${err}`));
    });
  }
}

module.exports = CustomClient;