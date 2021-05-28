const Discord = require("discord.js");
const CustomClient = require("./Structures/Client.js");

const client = new CustomClient();

["Commands", "Events"].forEach(x => require(`./Handlers/${x}`)(client));

client.login(client.config.token);