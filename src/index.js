require('dotenv').config();
const cron = require('cron');



const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, IntentsBitField } = require('discord.js');
//const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

function formatDate(date) {
    const dateFormat = new Date(date.replace(/-/g, '\/'));
    let newDate = ('0' + dateFormat.getDate()).slice(-2) + '/'
        + ('0' + (dateFormat.getMonth() + 1)).slice(-2) + '/'
        + dateFormat.getFullYear();
    console.log(MyDateString)
    console.log(birthdayComparable)
    return newDate;
}


client.on("ready", (x) => {

    console.log(`${x.user.tag} is ready`);

    client.user.setActivity(`${x.user.tag} is online.`)
})

client.on('messageCreate', (message) => {

    /* const embed = new EmbedBuilder()
         .setTitle('Feliz Aniversário')
         .setDescription('Ta ficando mais velho é?')
         .setColor('Random')
         .setURL('https://www.youtube.com/watch?v=5DD8fhgJGfw')
 
     message.reply({ embeds: [embed] });
     return;
     */


});

const birthdayDates = [
    new Date('2000/9/26'),
    new Date('2003/10/25'),
    new Date('2000/2/8'),
    new Date('1999/2/8'),

]

client.once("ready", () => {
    console.log(`Online as ${client.user.tag}`);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const embed = new EmbedBuilder()
        .setTitle('Feliz Aniversário')
        .setDescription('Ta ficando mais velho é?')
        .setColor('Random')
        .setURL('https://www.youtube.com/watch?v=5DD8fhgJGfw')

    let scheduledMessage = new cron.CronJob('* * * * *', () => {
        // This runs every day at 10:30:00, you can do anything you want
        // Specifing your guild (server) and your channel


        birthdayDates.forEach((date) => {
            if (date.getDate() == today.getDate() && date.getMonth() == today.getMonth()) {
                const guild = client.guilds.cache.get(process.env.GUILD_ID);
                const channel = guild.channels.cache.get(process.env.CHANNEL_ID);
                channel.send({ embeds: [embed] });
            }

        })

    });

    // When you want to start it, use:
    scheduledMessage.start()
});




client.login(process.env.TOKEN)