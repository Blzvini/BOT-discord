import matplotlib.pyplot as plt
import json

with open('./crypto_prices.json') as f:
    data = json.load(f)

cryptos = list(data.keys())
prices = list(data.values())

plt.figure(figsize=(10, 6))

plt.bar(cryptos, prices, color='skyblue')

plt.title('Preços das Criptomoedas', fontsize=16)
plt.xlabel('Criptomoedas', fontsize=12)
plt.ylabel('Preço em USD', fontsize=12)


plt.xticks(rotation=45)


plt.margins(0.05)


plt.savefig('crypto_prices_graph.png')
