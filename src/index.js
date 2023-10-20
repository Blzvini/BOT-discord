require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.on("ready", (x) => {
    console.log(`${x.user.tag} is ready`);
    client.user.setActivity(`Bot Vini Vini em ação`)
})



client.login(process.env.TOKEN)