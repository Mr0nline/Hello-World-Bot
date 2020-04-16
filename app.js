const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('Logged in as ${client.user.tag}!');

});

 

client.on('message', message => {
    //converts new messages into lowecase
    const msgLowered = message.content.toLowerCase();
    // compares to find if certain command is fired or not
    if (msgLowered === "!hi") {
        msg.reply("Yo Hi! Let's play lol :laughing:");
    }
    else if(msgLowered === "!help") {
        msg.reply("Currently I have 2 commands, !hi !help");
    }
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
