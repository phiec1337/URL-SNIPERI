const Discord = require('discord.js'),
      client = new Discord.Client(),
      moment = require("moment-timezone"),
      fetch = require('node-fetch');

class Main {
    constructor() {
        this.sniperInterval;
    }

    async setVanityURL(url, guild) {
        const time = moment.tz(Date.now(), "Europe/Paris").format("HH:mm:ss");
        console.log(`[${time}] [LOG] Sniping discord.gg/${url}`);
        return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": "Bot " + client.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": JSON.stringify({
                "code": url
            }),
            "method": "PATCH",
            "mode": "cors"
        });
    }
    async checkVanityURL(url) {
        return await fetch(`https://discord.com/api/v8/guilds/${guild.id}/vanity-url`, {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "authorization": "Bot " + client.token,
                "content-type": "application/json",
            },
            "referrerPolicy": "no-referrer-when-downgrade",
            "method": "GET",
            "mode": "cors"
        });
    }

    async startSnipe(url, guild) {
        this.sniperInterval = setInterval(async () => {
            await this.setVanityURL(url, guild);
        }, 1000);
    }

    stopSnipe() {
        return clearInterval(this.sniperInterval);
    }
}
const prefix = ".";

let handler = new Main();

client.on('message', async (message) => {
    let messageArray = message.content.split(" "),
        args = messageArray.slice(1);
    const args1 = message.content.slice(prefix.length).split(/ +/),
          command = args1.shift().toLowerCase();

    if (command === "start-snipe") {
        let url = args[0];
        

        if (!message.guild.features.includes('VANITY_URL')) {
            return message.reply("You don't have level 3 boost !");
        };

        message.reply(`Start sniping the url ${url} now!`);
        console.log(`[LOG] Start sniping the url ${url} now!`);
        await handler.startSnipe(url, message.guild);
    };

    if (command === "stop-snipe") {
        handler.stopSnipe();
    };
    

});
client.login("YOUR BOT TOKEN"); 
//phiec