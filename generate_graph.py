import json
import matplotlib.pyplot as plt

with open('./crypto_prices.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

prices = []
legend_labels = []

for crypto, value in data.items():
    price = float(
        ''.join(filter(str.isdigit, value))[:-2]
        + '.'
        + ''.join(filter(str.isdigit, value))[-2:]
    )
    prices.append(price)
    legend_labels.append(f'{crypto} : {value}')

sorted_data = sorted(
    zip(data.keys(), prices, legend_labels), key=lambda x: x[1], reverse=True
)
cryptos, sorted_prices, sorted_legend_labels = zip(*sorted_data)

colors = [
    '#250036',
    '#381530',
    '#4b2a2b',
    '#5f3f26',
    '#725421',
    '#85691c',
    '#997e17',
    '#ac9312',
    '#bfa80d',
    '#d3be08',
]

bars = plt.bar(cryptos, sorted_prices, color=colors, width=0.5)


plt.title('Valor de mercado nas últimas 24h', fontsize=16)

plt.xticks(rotation=45)

plt.grid(linestyle='--', color='0.95')
plt.gca().set_axisbelow(True)

plt.legend(bars, sorted_legend_labels, loc='upper right')
plt.margins(0.05)

plt.savefig('crypto_prices_graph.png')
