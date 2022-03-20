/*
    NoUBot by Jordan Bleu

    Add a bit of wholesomeness (or snarkiness) to your discord server with NoUBot!  
    This bot uses simple regex to parse each message sent in your server, and will
    respond 'no u' if a match is found.  

    To use this locally, you'll need to set up a discord bot with an API key 
    and paste that key below.  You should then be able to run the bot in a local
    node.js server.

*/
const discord = require('discord.js');
const fs = require("fs");
const client = new discord.Client();
let termsList;

client.once("ready", ()=>{
    console.log("NoUBot says hello");
    // Loads our list of regular expressions from the terms.json file
    termsList = JSON.parse(fs.readFileSync("terms.json", "utf-8"));
});

client.on("message", message => {
    // if we see a message and it's not a bot
    if (!message.author.bot && termsList) {
        console.log("Analyzing message '" + message.content + "'");
        if (termsList) {
            const mentions = getUsernamesMentioned(message);
            
            if (mentions.length > 0) {
                console.log("\tMentions:" + mentions)
            }
            
            // if the bot is replied to with a "no u", respond accordingly
            if (mentions.includes(client.user.username)) {
                if (message.content.toLowerCase().includes("no u")) {
                    console.log("\tUser hit me with the no u reversal, they've learned well.");
                    message.reply("omg <3");
                } else if (message.content.toLowerCase().includes("good night")) {
                    console.log("\tUser wished me a good night, wish them one too");
                    message.reply("Good night, " + message.author.username);
                }
            // Else decide if it should say "no u" to the user
            } else {
                // Evaluate each term's regex against our message content
                for (const term of termsList.terms) {
                    if (message.content.toLowerCase().match(term)) {
                        console.log("\tMatches regex:" + term)
                        message.reply("no u");
                        return;
                    }
                }
            }
        }
    }
});

var getUsernamesMentioned = function(message) {
    const usernames = new Array();

    for (const user of message.mentions.users.array()) {
        usernames.push(user.username);
    }

    return usernames;
}

client.login("ODMyMzk1NDQ0NzU1NzU5MTI0.YHjKqw.-fZY73MCvzLtr-b5gD6t17-xCtA");