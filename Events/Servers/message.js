module.exports = async (client, message) => {
  if(message.author.bot || message.channel.dm) return;
  if(!message.content.startsWith(client.config.prefix)) return;
  
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  
  const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.alias && cmd.alias.includes(commandName));
  if(!command) return;
  
  command.run(client, message, args);
}