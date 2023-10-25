import matplotlib.pyplot as plt
import json

# Abra o arquivo JSON gerado pelo JavaScript
with open('./crypto_prices.json') as f:
    data = json.load(f)

# Separe os dados para plotagem
cryptos = list(data.keys())
prices = list(data.values())

# Aumentar o tamanho da figura
plt.figure(figsize=(10, 6))

# Criar um gráfico de barras com cores personalizadas
plt.bar(cryptos, prices, color='skyblue')

# Personalizar o gráfico
plt.title('Preços das Criptomoedas', fontsize=16)
plt.xlabel('Criptomoedas', fontsize=12)
plt.ylabel('Preço em USD', fontsize=12)

# Rotacionar os rótulos do eixo x para maior legibilidade
plt.xticks(rotation=45)

# Ajustar as margens
plt.margins(0.05)

# Salvar o gráfico em um arquivo
plt.savefig('crypto_prices_graph.png')
