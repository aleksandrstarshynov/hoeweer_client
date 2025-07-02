# Hoeweer (Hoe weer is het?)
**Weather forecast** accuracy assessment service: set up collection and aggregation of data from three providers, automated calculation of average error, which allowed to increase the accuracy of temperature forecasts.

## 🛠 Technologies

### Languages, Frameworks & Libraries
- JavaScript
- NodeJS+Express
- 3 external APIs

###Logic
In this project I used the full JavaScript stack: on the server – Node.js with Express for request orchestration and fs/ESM modules for storing sliding data in JSON files, on the client – ​​​​pure JS with dynamic import and Chart.js for visualization. As an interesting technical solution I implemented a "sliding" data update: with each request the forecast for the day after tomorrow is written to a file, then three files are shifted – thus supporting the history of "yesterday", "today" and "tomorrow" – and only then the final array for the graph is assembled. This provided a simple alternative for databases without external storage, with automatic data rolling. There is no justification for this choice, I just wanted to practice with the functionality of fs modules. The mathematics of the forecast is based on the analysis of temperature differences between three horizons: the day before yesterday → yesterday and yesterday → today. For each hour we calculate the difference in direction (drift) between the adjacent forecasts, average these two drifts and get the value avgDrift. Our "suggested" temperature is calculated as the original forecast of today plus this average drift. In this way we take into account the tendency of the forecast to drift over the last two days and produce a more uniform temperature, adapted to the real dynamics.

## 🚀 Key Features
- **Chart**: created with chart.js it gives the graphic view of the data, fetched from 3 APIs and calculated data on our side.
- **Own Weather forecast**: calcutating the - forecast


---

## Production Link
https://hoeweer.netlify.app/
Sometimes for unexpected some reasome server is slipping, even if I have uptime robot me wake him up once per 15 minute, sorry. This desiccion is on render.com side.  

## 📦 Installation & Running Locally
```

cd quickshop

# Frontend
cd my-app
npm install
npm start
```
Services will run locally on ports 3000 and 5000.

# Backend (is in a separate repository, (https://github.com/aleksandrstarshynov/hoeweer_server))
