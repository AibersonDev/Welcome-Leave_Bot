const guildModel = require('../../Models/Guild.js');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = async (client, member) => {
  let config = await guildModel.findOne({guildID: member.guild.id});
  let msgData = config.welcomeMessage || 'Esperamos que disfrutes de tu estancia {usertag}. Ahora somos {membercount} miembros'
  
  if(config.welcomeType == 'embed') {
    let msg = msgData
      .replace('{username}', member.user.username)
      .replace('{discriminator}', member.user.discriminator)
      .replace('{usertag}', member.user.tag)
      .replace('{usermention}', member.toString())
      .replace('{membercount}', member.guild.memberCount)
    
    let embed = new MessageEmbed()
    .setAuthor(`Welcome to ${member.guild.name}`, member.guild.iconURL({dynamic: true}))
    .setDescription(msg)
    .setColor('BLUE')
    .setTimestamp();
    
    if(config.welcomeChannelID) {
      client.channels.cache.get(config.welcomeChannelID).send(embed)
    }
  } else if(config.welcomeType == 'image') {
    const applyText = (canvas, text, defaultFontSize) => {
      const ctx = canvas.getContext("2d");
      do {
          ctx.font = `${defaultFontSize -= 10}px Bold`;
      } while (ctx.measureText(text).width > 600);
      return ctx.font;
    };

    let canvas = Canvas.createCanvas(1024, 450),
    ctx = canvas.getContext("2d"),
    number = member.guild.memberCount,
    text = `You are member #${number}`,
    title = "Welcome!";

    let background = await Canvas.loadImage("https://github.com/xixi52/AtlantaBot/blob/development/assets/img/greetings_background.png?raw=true");

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = applyText(canvas, member.user.username, 48);
    ctx.fillText(member.user.username, canvas.width - 660, canvas.height - 248);

    ctx.font = applyText(canvas, text, 53);
    ctx.fillText(text, canvas.width - 690, canvas.height - 65);
    
    ctx.font = "40px Bold";
    ctx.fillText(member.user.discriminator, canvas.width - 623, canvas.height - 178);
    
    ctx.fillStyle = "#44d14a";
    ctx.font = "75px SketchMatch";
    ctx.fillText("#", canvas.width - 690, canvas.height - 165);
    
    ctx.font = "90px Bold";
    ctx.strokeStyle = "#1d2124";
    ctx.lineWidth = 15;
    ctx.strokeText(title, canvas.width - 620, canvas.height - 330);
    var gradient = ctx.createLinearGradient(canvas.width - 780, 0, canvas.width - 30, 0);
    gradient.addColorStop(0, "#e15500");
    gradient.addColorStop(1, "#e7b121");
    ctx.fillStyle = gradient;
    ctx.fillText(title, canvas.width - 620, canvas.height - 330);

    ctx.beginPath();
    
    ctx.lineWidth = 10;
    
    ctx.strokeStyle = "#03A9F4";
    
    ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
    
    ctx.stroke();
    
    ctx.closePath();
    
    ctx.clip();

    let avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png", size: 512 }));
    
    ctx.drawImage(avatar, 45, 90, 270, 270);

    let attachment = new MessageAttachment(canvas.toBuffer(), "welcome-image.png");
    client.channels.cache.get(config.welcomeChannelID).send(attachment)
  }
}