const guildModel = require('../../Models/Guild.js');

module.exports = {
  name: 'configwelcome',
  alias: ['c-w'],
  description: 'Set up the welcome system',
  run: async (client, message, args) => {
    let option = args[0];
    if(!option) return message.channel.send('Arguments were lacking.\nList of options you can use:\n\n- Type\n- Message\n- Channel');
    
    let guildData = await guildModel.findOne({guildID: message.guild.id});
    
    if(option.toLowerCase() == 'type') {
      let typeOption = args[1];
      if(!typeOption) return message.channel.send('Puedes elegir entre imagen y embed');
      
      if(typeOption.toLowerCase() == 'image') {
        await guildData.updateOne({$set: { welcomeType: 'image' }}).then(() => {
          return message.channel.send('Se ha establecido el tipo de bienvenida a `image`');
        });
      } else if(typeOption.toLowerCase() == 'embed') {
        await guildData.updateOne({$set: { welcomeType: 'embed' }}).then(() => {
          return message.channel.send('Se ha establecido el tipo de bienvenida a `embed`');
        });
      }
    } else if(option.toLowerCase() == 'message') {
      let msg = args.slice(1).join(' ');
      if(!msg) return message.channel.send(`Debe especificar el mensaje. Si quieres saber que plantillas puedes usar para que el bot autocomplete use el comando: \`${client.config.prefix}help configWelcome\``);
      
      await guildData.updateOne({$set: { welcomeMessage: msg }}).then(() => {
        return message.channel.send('Se ha establecido el mensaje de bienvenida. (Este solo se verá si el tipo de bienvenida es `embed`)');
      });
    } else if(option.toLowerCase() == 'channel') {
      let channel = message.mentions.channels.first();
      
      await guildData.updateOne({$set: { welcomeChannelID: channel.id }}).then(() => {
        return message.channel.send('Se ha establecido el canal para las bienvenidas.');
      });
    }
  }
}