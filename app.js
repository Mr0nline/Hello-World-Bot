//Require discord.js
const Discord = require("discord.js");

//create a new client using new login
const client = new Discord.Client;

//Constants Array
const strArr = ["ready","reconnecting","message","!hi","!help"];
//Display message when bot comes online
client.on(strArr[0],()=>{
    console.log(`Logged in as ${client.user.tag}!`)
});

//Display message when reconnecting
client.on(strArr[1],()=>{
    console.log(`This bot is reconnecting: ${client.user.tag}!`)
});

//check for new messages
client.on(strArr[2], msg => {
    //converts new messages into lowecase
    // console.log(msg.content);
    const msgLowered = msg.content.toLowerCase();
    // compares to find if certain command is fired or not
    if (msgLowered === strArr[3]) {
        msg.reply("Test Mesage!\nYo Hi! Let's play lol :laughing:");
    }
    else if(msgLowered === strArr[4]) {
        msg.reply("Currently I have 3 commands, '!hi' '!help' '!build hayabusa'");
    }
    else if(msgLowered === "raghu") {
        msg.reply("LOL :joy:");
    }
    else if(msgLowered === "!build hayabusa") {
        msg.reply("Here is the build for Hayabusa.\nThis build suggested by <@!331736432957718529> \nHayabusa is assassin hero which is very capable for ganking and pushing.\n<:raptor_machate:700311879779876874> Core jungling item, Increse stacks as fast as you can.\n<:warrior_boot:700311881692348427> Boot for speed and defence, Prioritize this boot before building whole raptor machate.\n<:blade_of_heptaseas:700311877581930516> Core ganking item, with the passive you can deal pretty much damage.\n<:endless_battle:700311878953336852> All round item to give you sustainability.\n<:blade_of_despair:700311821764001932> Increase base and skill damage\n<:queen_wing:700311879683145819> Increasing HP and lifesteal for late game.");
    }
});

//use token(password)
client.login(process.env.BOT_TOKEN);
