require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey',
    },
    {
        name: 'zietz',
        description: 'Salve pro corninho',
    },
    {
        name: 'fibo',
        description: 'Retorna uma sequência fibonacci',
        options: [
            {
                name: 'int',
                description: 'Número inteiro',
                type: 4, 
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        )

        console.log('Slash commands were registered succesfully')
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();