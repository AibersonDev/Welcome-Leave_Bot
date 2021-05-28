module.exports = {
  name: 'ping',
  alias: ['p'],
  description: 'Shows the ping of the bot.',
  run: async (client, message, args) => {
    message.channel.send(`🏓 Ping: ${client.ws.ping}ms`);
  }
}