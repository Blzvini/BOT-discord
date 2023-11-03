require("dotenv").config();
const { choices } = require("./cripto.js");
const { REST, Routes } = require("discord.js");

const commands = [
    {
<<<<<<< HEAD
        name: 'hey',
        description: 'Replies with hey',
        options: [
            {
                name: 'option-1',
                description: 'aaaaaaaa',
                type: boolean
            }

        ]
=======
        name: "hey",
        description: "Replies with hey",
>>>>>>> main
    },
    {
        name: "zietz",
        description: "Salve pro corninho",
    },
<<<<<<< HEAD

=======
    {
        name: "fibo",
        description: "Retorna uma sequência fibonacci",
        options: [
            {
                name: "int",
                description: "Número inteiro",
                type: 4,
                required: true,
            },
        ],
    },
    {
        name: "cripto",
        description: "Obtém informações sobre uma criptomoeda específica",
        options: [
            {
                name: "moeda",
                description: "Nome ou símbolo da criptomoeda",
                type: 3,
                required: true,
                choices: choices,
            },
        ],
    },
    {
        name: "graph",
        description: "Gera um gráfico com as informações das criptomoedas",
    },
>>>>>>> main
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("Slash commands were registered succesfully");
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();