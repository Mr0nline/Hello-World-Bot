//Require discord.js
const Discord = require("discord.js");
const fs = require("fs");

//create a new client using new login
const client = new Discord.Client;

//read heroes build file
var heroesData;
//First promise to read json file

new Promise(function (resolve, reject) {
    fs.readFile('./heroesBuild.json', 'utf8', (err, jsonString) => {
        heroesData = JSON.parse(jsonString);
        resolve(heroesData);
    });
}).then(data => {
    //id and nick for images
    const idArr = ["331736432957718529", "700007423540330516", "616187183510061077", "298577032084848652", "466953466724745216", "407126500798758914"];
    const nickArr = ["MrOnline", "BaneAP", "Troll", "RStar", "Cherry", "Rohit"];

    //Display message when bot comes online
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`)
    });

    //Display message when reconnecting
    client.on("reconnecting", () => {
        console.log(`This bot is reconnecting: ${client.user.tag}!`)
    });

    //check for new messages
    client.on("message", msg => {

        //converts new messages into lowercase
        const msgLowered = msg.content.toLowerCase();

        // !hi command
        if (msgLowered === "!hi") {
            msg.channel.send("Yo Hi! Let's play lol :laughing:");
        }

        // !help command
        else if (msgLowered === "!help") {
            msg.channel.send("Currently I have *3* commands,\n```css\n[!hi] Simple hello reply \n[!who are we/am i?] gets profile pictures \n[!help] : all bot commands list \n[!build (heroname)] : Provides builds information for all heroes. Only valid in #mlbb-builds channel \n[!submit build (heroname) (build description)] Submit the build for any hero, Only valid in #mlbb-builds-submmision channel. \n```");
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
                for (var i = 0; i < heroesData.heroes.length; i++) {
                    if (msgLowered === "!build " + heroesData.heroes[i].name) {
                        //check if build is empty
                        if (heroesData.heroes[i].build === "") {
                            msg.channel.send("This hero doesn't contains build yet :pleading_face: Please submit a build from <#700556396185518220>");
                        } else {
                            msg.channel.send(heroesData.heroes[i].build);
                        }
                    } else {
                        count++;
                    }
                    if (count == heroesData.heroes.length) {
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
                for (var i = 0; i < heroesData.heroes.length; i++) {
                    if (msgLowered.includes("!submit build " + heroesData.heroes[i].name)) {
                        //check if build is empty
                        var submitedHeroName = "!submit build " + heroesData.heroes[i].name;
                        var submitedBuild = msgLowered.replace(submitedHeroName, "");
                        msg.channel.send("Thanks you so much <@!" + msg.author.id + "> for submitting build for " + heroesData.heroes[i].name + ". Your build has been sent for approval in <#700567874624028682>");
                        client.channels.cache.get("700567874624028682").send("This build is submitted by **" + msg.author.username + "** for " + heroesData.heroes[i].name + ".\n-----The build starts from here-----\n" + submitedBuild)
                    } else {
                        count++;
                    }
                    if (count == heroesData.heroes.length) {
                        msg.channel.send("This hero doesn't exist in mlbb :poop:");
                    }
                }
            } else {
                msg.channel.send("You can submit build only in <#700556396185518220> channel. Try the command there.");
            }
        }

        // !approve build command
        else if (msgLowered.includes("!approve build") && !msg.author.bot) {
            if (msg.channel.id === "700567874624028682") { //this is  mlbb-build-approval
                var botFrwrdMsgID = msg.content.replace("!approve build ", "");
                var botFrwrdMsg = "";
                //Promise to fetch bot message
                new Promise(function (resolve, reject) {
                    msg.channel.messages.fetch().then(messages => {
                        const fetchedMessage = messages.filter(msg => msg.id === botFrwrdMsgID);
                        var botJSON = JSON.stringify(fetchedMessage);
                        var botMessage = JSON.parse(botJSON);
                        if (botMessage != undefined) {
                            botFrwrdMsg = botMessage[0].content;
                            var splitMessage = botFrwrdMsg.split("\n-----The build starts from here-----\n");
                            var frontMessage = splitMessage[0];
                            var buildMessage = splitMessage[1];
                            var submiterName = frontMessage.split("**");
                            var submiter = submiterName[1];
                            var heroName = submiterName[2].replace(" for ", "").replace(".", ""); //submiterName[2] will " for nana."
                            var finalHeroName = heroName.replace(/\s/g, "");
                            var OrigUser = client.users.cache.find(user => user.username === submiter);
                            client.channels.cache.get("700556396185518220").send("Build request for hero " + finalHeroName + " submitted by <@!" + OrigUser.id + "> has been approved! Thanks for contributing :heart:");
                            resolve(0);
                            for (var i = 0; i < heroesData.heroes.length; i++) {
                                if (finalHeroName === heroesData.heroes[i].name) {
                                    //write data to JSON
                                    try {
                                        heroesData.heroes[i].build = "Here is the build for " + finalHeroName + ".\nThis build suggested by <@!" + OrigUser.id + ">\n" + buildMessage;;
                                        fs.writeFile('./heroesBuild.json', JSON.stringify(heroesData), (err) => {
                                            if (err) console.log('Error writing file:', err)
                                        })
                                    } catch (err) {
                                        console.log('Error parsing JSON string:', err);
                                    }
                                }
                            }
                        }

                    }).then(data => {});
                }).catch(err => {
                    console.log(err);
                });
            } else {
                msg.channel.send("This command can only be used in <#700567874624028682> by members of that channel");
            }
        }

        // !reject build command
        else if (msgLowered.includes("!reject build") && !msg.author.bot) {
            if (msg.channel.id === "700567874624028682") { //this is  mlbb-build-approval
                var botFrwrdMsgID = msg.content.replace("!approve build ", "");
                var botFrwrdMsg = "";
                //Promise to fetch bot message
                new Promise(function (resolve, reject) {
                    msg.channel.messages.fetch().then(messages => {
                        const fetchedMessage = messages.filter(msg => msg.id === botFrwrdMsgID);
                        var botJSON = JSON.stringify(fetchedMessage);
                        var botMessage = JSON.parse(botJSON);
                        if (botMessage != undefined) {
                            botFrwrdMsg = botMessage[0].content;
                            var splitMessage = botFrwrdMsg.split("\n-----The build starts from here-----\n");
                            var frontMessage = splitMessage[0];
                            var buildMessage = splitMessage[1];
                            var submiterName = frontMessage.split("**");
                            var submiter = submiterName[1];
                            var heroName = submiterName[2].replace(" for ", "").replace(".", ""); //submiterName[2] will " for nana."
                            var finalHeroName = heroName.replace(/\s/g, "");
                            var OrigUser = client.users.cache.find(user => user.username === submiter);
                            client.channels.cache.get("700556396185518220").send("Sorry! Build submission for " + finalHeroName + " submitted by <@!" + OrigUser.id + "> has been rejected! Please submit valid build :sob:");
                            resolve(0);
                        }

                    }).then(data => {});
                }).catch(err => {
                    console.log(err);
                });
            } else {
                msg.channel.send("This command can only be used in <#700567874624028682> by members of that channel");
            }
        }

        //download build command
        else if(msg.channel.id === "700334848749076552" && !msg.author.bot && msgLowered === "!download build"){
            console.log(JSON.stringify(heroesData));
            msg.channel.send("Backup log generated!\nOpen heroku terminal and access log by `heroku logs -t --app hello-world-deviliance`");
        }
    });
});
client.login(token);
//use token(password)
client.login(process.env.BOT_TOKEN);
