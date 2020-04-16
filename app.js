//Require discord.js
const Discord = require("discord.js");

//create a new client using new login
const client = new Discord.Client;
const {
    token
} = require("./token.json");

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
    const msgLowered = msg.content.toLowerCase();
    // compares to find if certain command is fired or not
    if (msgLowered === strArr[3]) {
        msg.reply("Yo Hi! Let's play lol :laughing:");
    }
    else if(msgLowered === strArr[4]) {
        msg.reply("Currently I have 2 commands, !hi !help");
    }
});

//use token(password)
client.login(token);