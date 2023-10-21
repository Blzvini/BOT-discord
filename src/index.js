require('dotenv').config();
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


client.on("ready", (x) => {
    console.log(`${x.user.tag} is ready`);
    client.user.setActivity(`${x.user.tag} is online.`)
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hey') {
        interaction.reply('Hey')
    }

    if (interaction.commandName === 'zietz') {
        interaction.reply('Salve corninho!')
    }
    
    if (interaction.commandName === 'fibo') {
        const inputNumber = interaction.options.getInteger('int');
        
        if (isNaN(inputNumber) || !Number.isInteger(inputNumber) || inputNumber < 1) {

            interaction.reply('Por favor, forneça um número inteiro válido maior ou igual a 1.');
        } else {
            const fibonacciSequence = generateFibonacci(inputNumber);
            interaction.reply(`Sequência de Fibonacci com os primeiros ${inputNumber} números: ${fibonacciSequence.join(', ')}`);
        }
    }
});

function generateFibonacci(n) {
    const sequence = [0, 1];

    while (sequence.length < n) {
        const nextValue = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        sequence.push(nextValue);
    }

    return sequence;
}

client.login(process.env.TOKEN)