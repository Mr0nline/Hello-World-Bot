//Require discord.js
const Discord = require("discord.js");

//create a new client using new login
const client = new Discord.Client;

//Constants Array
const strArr = ["ready", "reconnecting", "message", "!hi", "!help"];
const idArr = ["331736432957718529", "700007423540330516", "616187183510061077", "298577032084848652", "466953466724745216", "407126500798758914"];
const nickArr = ["MrOnline", "BaneAP", "Troll", "RStar", "Cherry", "Rohit"];

//Display message when bot comes online
client.on(strArr[0], () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

//Display message when reconnecting
client.on(strArr[1], () => {
    console.log(`This bot is reconnecting: ${client.user.tag}!`)
});

//check for new messages
client.on(strArr[2], msg => {
    //converts new messages into lowecase
    console.log(msg.author.username);
    const msgLowered = msg.content.toLowerCase();
    // compares to find if certain command is fired or not
    if (msgLowered === strArr[3]) {
        msg.reply("Test Mesage!\nYo Hi! Let's play lol :laughing:");
    } else if (msgLowered === strArr[4]) {
        msg.reply("Currently I have 3 commands, '!hi' '!help' '!build hayabusa'");
    } else if (msgLowered === "who are we?") {
        msg.channel.send("Finding Identity! Please wait...");
        msg.channel.send("We are Deviliance", {
            files: ["./Images/DevilianceUser/Deviliance_Logo.png"]
        });
    } else if (msgLowered === "who am i?") {
        for (var i = 0; i < idArr.length; i++) {
            if (msg.author.id === idArr[i]) {
                msg.channel.send("Fetching your profile! Please wait...");
                msg.channel.send("", {
                    files: ["./Images/DevilianceUser/DV_" + nickArr[i] + ".png"]
                });
            }
        }
    } else if (msgLowered === "!build hayabusa") {
        msg.channel.send("Here is the build for Hayabusa.\nThis build suggested by <@!331736432957718529> \nHayabusa is assassin hero which is very capable for ganking and pushing.\n<:raptor_machate:700311879779876874> Core jungling item, Increse stacks as fast as you can.\n<:warrior_boot:700311881692348427> Boot for speed and defence, Prioritize this boot before building whole raptor machate.\n<:blade_of_heptaseas:700311877581930516> Core ganking item, with the passive you can deal pretty much damage.\n<:endless_battle:700311878953336852> All round item to give you sustainability.\n<:blade_of_despair:700311821764001932> Increase base and skill damage\n<:queen_wing:700311879683145819> Increasing HP and lifesteal for late game.");
    }
});

//use token(password)
client.login(process.env.BOT_TOKEN);
