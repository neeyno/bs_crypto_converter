<template>
  <div class="hello">
    <div id="crypto-container" v-for="(value, key) in cryptos">
      <span class="left">{{ key }}</span>
      <span class="right">${{ value.USD }}</span>
    </div>
    <!--<Chart /> -->


    <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container">
      <div id="tradingview_01d82"></div>
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCUSDT/?exchange=BINANCE"
          rel="noopener" target="_blank"><span class="blue-text">BTCUSDT Rates</span></a> by TradingView</div>

    </div>
    <!-- TradingView Widget END -->
  </div>
</template>

<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
<script type="text/javascript">
  new TradingView.MediumWidget(
    {
      "symbols": [
        [
          "bitcoin",
          "BINANCE:BTCUSDT|1D"
        ]
      ],
      "chartOnly": false,
      "width": 1000,
      "height": 500,
      "locale": "en",
      "colorTheme": "light",
      "isTransparent": false,
      "autosize": false,
      "showVolume": false,
      "hideDateRanges": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "noTimeScale": false,
      "valuesTracking": "1",
      "chartType": "line",
      "fontColor": "#787b86",
      "gridLineColor": "rgba(42, 46, 57, 0.06)",
      "container_id": "tradingview_01d82"
    }
  );
</script>

<script>
import axios from 'axios';
//import Chart from '@/components/Chart'

export default {
  name: 'HelloWorld',
  data: () => ({
    cryptos: [],
    errors: []
  }),

  created () {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
      .then(response => {
        this.cryptos = response.data
        console.log(response)
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

