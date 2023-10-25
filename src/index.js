require("dotenv").config();
const axios = require("axios");
const { spawn } = require('child_process');
const pythonProcess = spawn('python3.11', ['./generate_graph.py']);
const fs = require("fs");
const { choices } = require("./cripto.js");
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  IntentsBitField,
} = require("discord.js");
//const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (x) => {
  console.log(`${x.user.tag} is ready`);
  client.user.setActivity(`${x.user.tag} is online.`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("Hey");
  }

  if (interaction.commandName === "zietz") {
    interaction.reply("Salve corninho!");
  }

  if (interaction.commandName === "fibo") {
    const inputNumber = interaction.options.getInteger("int");

    if (
      isNaN(inputNumber) ||
      !Number.isInteger(inputNumber) ||
      inputNumber < 1
    ) {
      interaction.reply(
        "Por favor, forneça um número inteiro válido maior ou igual a 1."
      );
    } else {
      const fibonacciSequence = generateFibonacci(inputNumber);
      interaction.reply(
        `Sequência de Fibonacci com os primeiros ${inputNumber} números: ${fibonacciSequence.join(
          ", "
        )}`
      );
    }
  }

  if (interaction.commandName === "cripto") {
    const moeda = interaction.options.getString("moeda").toLowerCase();
    const currencyMapping = {};
    choices.forEach((choice) => {
      currencyMapping[choice.value] = choice.value;
    });

    if (currencyMapping[moeda]) {
      try {
        const cryptoInfo = await getCurrencyDataInBRL(moeda);
        interaction.reply(cryptoInfo);
      } catch (error) {
        console.error("Erro ao buscar informações da criptomoeda:", error);
        interaction.reply(
          `Ocorreu um erro ao buscar informações da criptomoeda ${moeda}.`
        );
      }
    } else {
      interaction.reply(
        `A moeda "${moeda}" não está mapeada. Verifique a ortografia ou adicione-a ao mapeamento.`
      );
    }
  }

  if (interaction.commandName === "graph") {
    try {
      const pythonProcess = spawn('python3.11', ['./generate_graph.py']);
  
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          // O script Python foi executado com sucesso
          // Envie a imagem gerada no Discord
          interaction.reply({
            content: 'Aqui está o gráfico:',
            files: ['./crypto_prices_graph.png'],
          });
        } else {
          // O script Python falhou
          interaction.reply('Houve um erro ao gerar o gráfico.');
          
        }
      });
    } catch (error) {
      // Se ocorrer um erro durante a execução do spawn, ele será capturado aqui
      console.error('Erro ao executar o script Python:', error);
      interaction.reply('Houve um erro ao gerar o gráfico.');
    }
  }
});

async function getCurrencyDataInBRL(currency) {
  const currencyMapping = {};
  choices.forEach((choice) => {
    currencyMapping[choice.value] = choice.value;
  });

  if (currencyMapping[currency]) {
    const currencyId = currencyMapping[currency];
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${currencyId}`
      );
      const currencyData = response.data.market_data;

      const name = response.data.name;
      const symbol = response.data.symbol;
      const currentPriceBRL = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(currencyData.current_price.brl);
      const marketCapBRL = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(currencyData.market_cap.brl);
      const volumeIn24hBRL = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(currencyData.total_volume.brl);
      const priceChangeIn24h = currencyData.price_change_percentage_24h;

      const cryptoInfo =
        `Informações de ${name} (${symbol}) em BRL:\n` +
        `Preço atual: R$${currentPriceBRL}\n` +
        `Market Cap: R$${marketCapBRL}\n` +
        `Volume nas últimas 24 horas: R$${volumeIn24hBRL}\n` +
        `Variação nas últimas 24 horas: ${priceChangeIn24h}%`;

      return cryptoInfo;
    } catch (error) {
      console.error(
        `Erro ao obter dados de ${currency.toUpperCase()} em BRL:`,
        error
      );
      return `Ocorreu um erro ao buscar informações da criptomoeda: ${error.message}`;
    }
  } else {
    const notFoundMessage = `A moeda "${currency}" não está mapeada. Verifique a ortografia ou adicione-a ao mapeamento.`;
    return notFoundMessage;
  }
}

function generateFibonacci(n) {
  const sequence = [0, 1];

  while (sequence.length < n) {
    const nextValue =
      sequence[sequence.length - 1] + sequence[sequence.length - 2];
    sequence.push(nextValue);
  }

  return sequence;
}

async function getPrices() {
  const prices = {};

  for (const crypto of choices) {
    const currencyId = crypto.value;

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${currencyId}&vs_currencies=usd`
      );

      const price = response.data[currencyId].usd;
      prices[currencyId] = price;
    } catch (error) {
      console.error(`Erro ao obter preço de ${crypto.name}: ${error}`);
    }
  }

  return prices;
}

// Chame a função para obter os preços e salve em um arquivo JSON
getPrices()
  .then((prices) => {
    fs.writeFile(
      "crypto_prices.json",
      JSON.stringify(prices, null, 2),
      (err) => {
        if (err) {
          console.error(`Erro ao salvar os preços: ${err}`);
        } else {
          console.log("Preços salvos com sucesso.");
        }
      }
    );
  })
  .catch((error) => {
    console.error(`Erro ao obter preços: ${error}`);
  });

client.login(process.env.TOKEN);
