const fs = require("fs");

module.exports = async (client) => {
  const commandDirs = fs.readdirSync(`./Commands`);
  
  for (const dir of commandDirs) {
    const commandFiles = fs.readdirSync(`./Commands/${dir}`).filter((file) => file.endsWith('.js'));
    
    for (const file of commandFiles) {
      const command = require(`../Commands/${dir}/${file}`);
      
      client.commands.set(command.name, command);
    }
  }
}