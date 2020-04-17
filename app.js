//Require discord.js
const Discord = require("discord.js");

//create a new client using new login
const client = new Discord.Client;
var {
    heroes
} = require("./heroesBuild.json");

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
    //console.log(msg.content);
    const msgLowered = msg.content.toLowerCase();

    // !hi command
    if (msgLowered === strArr[3]) {
        msg.channel.send("Yo Hi! Let's play lol :laughing:");
    }
    
    // !help command
    else if (msgLowered === strArr[4]) {
        msg.channel.send("Currently I have *3* commands,\n```css\n[!hi] Simple hello reply \n[!help] : all bot commands list \n[!build (heroname)] : Provides builds information for all heroes. Only valid in #mlbb-builds channel\n```");
    }
    
    // who are we? command
    else if (msgLowered === "who are we?" || msgLowered === "who we are?" || msgLowered === "who are we" || msgLowered === "who we are") {
        msg.channel.send("We are Deviliance", {
            files: ["./Images/DevilianceUser/Deviliance_Logo.png"]
        });
    }
    
    // who am i?
    else if (msgLowered === "who am i?" || msgLowered === "who i am?" || msgLowered === "who am i" || msgLowered === "who i am") {
        for (var i = 0; i < idArr.length; i++) {
            if (msg.author.id === idArr[i]) {
                msg.channel.send("Fetching your profile! Please wait...");
                msg.channel.send("", {
                    files: ["./Images/DevilianceUser/DV_" + nickArr[i] + ".png"]
                });
            }
        }
    }
    
    // !build command
    else if (msgLowered.includes("!build") && !msg.author.bot) {

        //bot check for channel
        if (msg.channel.id === "700358079556092026" || msg.channel.id === "700334848749076552" || msg.channel.id === "700556396185518220" || msg.channel.id === "700567874624028682") { //this is mlbb-build , mlbb-bot-testing , mlbb-build-submission , mlbb-build-approval
            var count = 0;
            for (var i = 0; i < heroes.length; i++) {
                if (msgLowered === "!build " + heroes[i].name) {
                    //check if build is empty
                    if (heroes[i].build === "") {
                        msg.channel.send("This hero doesn't contains build yet :pleading_face: Please submit a build from <#700556396185518220>");
                    } else {
                        msg.channel.send(heroes[i].build);
                    }
                } else {
                    count++;
                }
                if (count == heroes.length) {
                    msg.channel.send("This hero doesn't exist in mlbb :poop:");
                }
            }
        } else {
            msg.channel.send("Build discussion only allowed in <#700358079556092026> channel. Try the command there.");
        }
    }
    
    // !submit build command
    else if (msgLowered.includes("!submit build") && !msg.author.bot) {
        if (msg.channel.id === "700556396185518220") { //this is  mlbb-build-submission
            var count = 0;
            for (var i = 0; i < heroes.length; i++) {
                if (msgLowered.includes("!submit build " + heroes[i].name)) {
                    //check if build is empty
                    var submitedHeroName = "!submit build " + heroes[i].name;
                    var submitedBuild = msgLowered.replace(submitedHeroName, "");
                    msg.channel.send("Thanks you so much <@!" + msg.author.id + "> for submitting build for " + heroes[i].name + ". Your build has been sent for approval in <#700567874624028682>");
                    // msg.channel.send("This build is submitted by <@!"+ msg.author.id + "> for "+ heroes[i].name+".\n\n" + submitedBuild);
                    client.channels.cache.get("700567874624028682").send("This build is submitted by **" + msg.author.username + "** for " + heroes[i].name + ".\n-----The build starts from here-----\n" + submitedBuild)
                } else {
                    count++;
                }
                if (count == heroes.length) {
                    msg.channel.send("This hero doesn't exist in mlbb :poop:");
                }
            }
        } else {
            msg.channel.send("Build discussion only allowed in <#700358079556092026> channel. Try the command there.");
        }
    }
    
    // !approve build command
    else if (msgLowered.includes("<@!700258171842723940> !approve build") && !msg.author.bot) {
        if (msg.channel.id === "700567874624028682" && msgLowered.includes("> ")) { //this is  mlbb-build-approval
            var removeFirstArrow = msg.content.replace("> ","").replace("<@!700258171842723940> !approve build","");
            var removeAllArrow = removeFirstArrow.replace(/> /g,"\n");
            var splitMessage = removeAllArrow.split("\n-----The build starts from here-----\n");
            var frontMessage = splitMessage[0];
            var buildMessage = splitMessage[1];
            var submiterName = frontMessage.split("**");
            var submiter = submiterName[1];
            var heroName = submiterName[2].replace(" for ","").replace(".",""); //submiterName[2] will " for nana."
            var finalHeroName = heroName.replace(/\s/g, "");
            var OrigUser = client.users.cache.find(user => user.username === submiter);
            client.channels.cache.get("700556396185518220").send("Build request for hero "+finalHeroName+" submitted by <@!"+OrigUser.id+"> has been approved! Thanks for contributing :heart:");
            for (var i = 0; i < heroes.length; i++) {
                if (finalHeroName===heroes[i].name) {
                    heroes[i].build = "Here is the build for "+finalHeroName+".\nThis build suggested by <@!"+OrigUser.id+">\n\n"+buildMessage;
                }
            }
        } else {
            msg.channel.send("Please quote message first");
        }
    }

    // !reject build command
    else if (msgLowered.includes("<@!700258171842723940> !reject build") && !msg.author.bot) {
        if (msg.channel.id === "700567874624028682" && msgLowered.includes("> ")) { //this is  mlbb-build-approval
            var removeFirstArrow = msg.content.replace("> ","").replace("<@!700258171842723940> !approve build","");
            var removeAllArrow = removeFirstArrow.replace(/> /g,"\n");
            var splitMessage = removeAllArrow.split("\n-----The build starts from here-----\n");
            var frontMessage = splitMessage[0];
            var buildMessage = splitMessage[1];
            var submiterName = frontMessage.split("**");
            var submiter = submiterName[1];
            var heroName = submiterName[2].replace(" for ","").replace(".",""); //submiterName[2] will " for nana."
            var finalHeroName = heroName.replace(/\s/g, "");
            var OrigUser = client.users.cache.find(user => user.username === submiter);
            client.channels.cache.get("700556396185518220").send("Sorry! Build submission for "+finalHeroName+" submitted by <@!"+OrigUser.id+"> has been rejected! Please submit valid build :sob:");
        } else {
            msg.channel.send("Please quote message first");
        }
    }

});

//use token(password)
client.login(process.env.BOT_TOKEN);
