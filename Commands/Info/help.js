const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  alias: [],
  description: 'Shows available commands.',
  run: async (client, message, args) => {
    let prefix = client.config.prefix;
    
    let option = args[0];
    
    if(option == 'configleave') {
      const cmd = client.commands.get(option);
      
      let embed = new MessageEmbed()
      .setAuthor(`${cmd.name} command information`, client.user.displayAvatarURL())
      .addField('Description', cmd.description)
      .addField('Use', `\`${prefix}${cmd.name} <type, message or channel> <value>\``)
      .addField('Extra', 'The templates that you can use in the message and that the bot will complete are the following:\n\n`{username}\n{discriminator}\n{usertag}\n{usermention}\n{membercount}`')
      .setTimestamp()
      .setColor('BLUE')
      .setFooter('<> = Required [] = Optional');
      
      message.channel.send(embed);
    } else if(option == 'configwelcome') {
      const cmd = client.commands.get(option);
      
      let embed = new MessageEmbed()
      .setAuthor(`${cmd.name} command information`, client.user.displayAvatarURL())
      .addField('Description', cmd.description)
      .addField('Use', `\`${prefix}${cmd.name} <type, message or channel> <value>\``)
      .addField('Extra', 'The templates that you can use in the message and that the bot will complete are the following:\n\n`{username}\n{discriminator}\n{usertag}\n{usermention}\n{membercount}`')
      .setTimestamp()
      .setColor('BLUE')
      .setFooter('<> = Required [] = Optional');
      
      message.channel.send(embed);
    } else if(option == 'help') {
      const cmd = client.commands.get(option);
      
      let embed = new MessageEmbed()
      .setAuthor(`${cmd.name} command information`, client.user.displayAvatarURL())
      .addField('Description', cmd.description)
      .addField('Use', `\`${prefix}${cmd.name} [command]\``)
      .setTimestamp()
      .setColor('BLUE')
      .setFooter('<> = Required [] = Optional');
      
      message.channel.send(embed);
    } else if(option == 'ping') {
      const cmd = client.commands.get(option);
      
      let embed = new MessageEmbed()
      .setAuthor(`${cmd.name} command information`, client.user.displayAvatarURL())
      .addField('Description', cmd.description)
      .addField('Use', `\`${prefix}${cmd.name}\``)
      .setTimestamp()
      .setColor('BLUE')
      .setFooter('<> = Required [] = Optional');
      
      message.channel.send(embed);
    } else {
      let embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`:tools: ~ Hi, I'm ${client.user.username} and here you will find my commands.`)
      .addField('Config', `\`${prefix}configwelcome\n${prefix}configleave\``)
      .addField('Info', `\`${prefix}help\n${prefix}ping\``)
      .setTimestamp()
      .setColor('BLUE');

      message.channel.send(embed);
    }
  }
}