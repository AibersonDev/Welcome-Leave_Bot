const guildModel = require('../../Models/Guild.js');

module.exports = async (client) => {
  console.log(`Ready as ${client.user.tag}`);
  
  client.initDB();
  
  client.guilds.cache.forEach(async (guild) => {
    let guildData = await guildModel.findOne({guildID: guild.id});
    if(!guildData) {
      new guildModel({
        guildID: guild.id
      }).save();
    }
  });
}