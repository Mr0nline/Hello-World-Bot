//Require discord.js
const Discord = require("discord.js");

//create a new client using new login
const client = new Discord.Client;
// heroes and builds
var heroes = [
        {"name":"miya", "build":""},
        {"name":"balmond", "build":""},
        {"name":"alice", "build":""},
        {"name":"tigreal", "build":""},
        {"name":"alucard", "build":""},
        {"name":"franco", "build":""},
        {"name":"clint", "build":""},
        {"name":"rafaela", "build":""},
        {"name":"eudora", "build":""},
        {"name":"zilong", "build":""},
        {"name":"fanny", "build":""},
        {"name":"layla", "build":""},
        {"name":"lolita", "build":""},
        {"name":"hayabusa", "build":"Here is the build for Hayabusa.\nThis build suggested by <@!331736432957718529> \nHayabusa is assassin hero which is very capable for ganking and pushing.\n\n\n<:Raptor_machete:700662865270669333> Core jungling item, Increse stacks as fast as you can.\n\n<:Boots:700662871822041188> Boot for speed and defence, Prioritize this boot before building whole raptor machate.\n\n<:Blade_of_the_7_Seas:700662570515824640> Core ganking item, with the passive you can deal pretty much damage.\n\n<:Endless_Battle:700662581345648700> All round item to give you sustainability.\n\n<:Blade_of_despair:700662581068562475> Increase base and skill damage\n\n<:Queens_Wing:700662699817828412> Increasing HP and lifesteal for late game."},
        {"name":"freya", "build":""},
        {"name":"gord", "build":""},
        {"name":"kagura", "build":""},
        {"name":"chou", "build":""},
        {"name":"cyclops", "build":""},
        {"name":"roger", "build":""},
        {"name":"karrie", "build":""},
        {"name":"odette", "build":""},
        {"name":"lancelot", "build":""},
        {"name":"helcurt", "build":""},
        {"name":"angela", "build":""},
        {"name":"chang'e", "build":""},
        {"name":"selena", "build":""},
        {"name":"claude", "build":""},
        {"name":"leomord", "build":""},
        {"name":"kimmy", "build":""},
        {"name":"faramis", "build":""},
        {"name":"badang", "build":""},
        {"name":"granger", "build":""},
        {"name":"guinevere", "build":""},
        {"name":"ling", "build":""},
        {"name":"baxia", "build":""},
        {"name":"masha", "build":""},
        {"name":"wanwan", "build":""},
        {"name":"silvanna", "build":""},
        {"name":"natalia", "build":""},
        {"name":"aurora", "build":""},
        {"name":"hanabi", "build":""},
        {"name":"khufra", "build":""},
        {"name":"saber", "build":""},
        {"name":"nana", "build":""},
        {"name":"karina", "build":""},
        {"name":"akai", "build":""},
        {"name":"bane", "build":""},
        {"name":"bruno", "build":""},
        {"name":"minotaur", "build":""},
        {"name":"sun", "build":""},
        {"name":"alpha", "build":""},
        {"name":"ruby", "build":""},
        {"name":"yi-sun-shin", "build":""},
        {"name":"moskov", "build":""},
        {"name":"jhonson", "build":""},
        {"name":"estes", "build":""},
        {"name":"hilda", "build":""},
        {"name":"lapu-lapu", "build":""},
        {"name":"vexana", "build":""},
        {"name":"gatotkaca", "build":""},
        {"name":"harley", "build":""},
        {"name":"irithel", "build":""},
        {"name":"grock", "build":""},
        {"name":"argus", "build":""},
        {"name":"diggie", "build":""},
        {"name":"hylos", "build":""},
        {"name":"pharsa", "build":""},
        {"name":"lesley", "build":""},
        {"name":"jawhead", "build":""},
        {"name":"gusion", "build":""},
        {"name":"valir", "build":""},
        {"name":"martis", "build":""},
        {"name":"uranus", "build":""},
        {"name":"kaja", "build":""},
        {"name":"aldous", "build":""},
        {"name":"vale", "build":""},
        {"name":"lunox", "build":""},
        {"name":"hanzo", "build":""},
        {"name":"belerick", "build":""},
        {"name":"thamuz", "build":""},
        {"name":"harith", "build":""},
        {"name":"minsitthar", "build":""},
        {"name":"kadita", "build":""},
        {"name":"esmeralda", "build":""},
        {"name":"terizla", "build":""},
        {"name":"x.borg", "build":""},
        {"name":"dyrroth", "build":""},
        {"name":"lylia", "build":""},
        {"name":"cecilion", "build":""},
        {"name":"carmilla", "build":""},
        {"name":"atlas", "build":""}
    ]

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
                    client.channels.get("700567874624028682").send("This build is submitted by **" + msg.author.username + "** for " + heroes[i].name + ".\n-----The build starts from here-----\n" + submitedBuild)
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
            var OrigUser = client.users.find(user => user.username === submiter);
            client.channels.get("700556396185518220").send("Build request for hero "+finalHeroName+" submitted by <@!"+OrigUser.id+"> has been approved! Thanks for contributing :heart:");
                if (finalHeroName===heroes[i].name) {
                    heroes[i].build = "Here is the build for "+finalHeroName+".\nThis build suggested by <@!"+OrigUser.id+">\n"+buildMessage;
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
            var OrigUser = client.users.find(user => user.username === submiter);
            client.channels.get("700556396185518220").send("Sorry! Build submission for "+finalHeroName+" submitted by <@!"+OrigUser.id+"> has been rejected! Please submit valid build :sob:");
        } else {
            msg.channel.send("Please quote message first");
        }
    }

});

//use token(password)
client.login(process.env.BOT_TOKEN);
