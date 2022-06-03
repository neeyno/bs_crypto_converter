<template>
    <div id="doughnut">
        <apexchart width="420" :options="options" :series="options.series"></apexchart>
    </div>

</template>

<script>
import axios from 'axios'
let btcUsd, ethUsd, ethBtc

async function callPrice() {
    await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD`)
        .then(response => {
            btcUsd = Object.values(Object.values(response.data)[0])[0]
            ethUsd = Object.values(Object.values(response.data)[1])[0]
            //ethBtc = Object.values(Object.values(response.data)[1])[1]
            console.log(btcUsd, ethUsd)
        })
};
// setInterval(function () {
//     callPrice()
// }, 15000);

import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

export default {
    name: "DoughnutChart",
    //props: ['ratio'],
    data: () => ({
        options: {
            title: {
                //text: "Crypto doughnut",
                align: 'center',
                style: {
                    fontSize: '17px',
                    fontWeight: '300',
                },
            },
            labels: [],
            chart: {
                type: 'donut',
                fontFamily: 'Exo 2, sans-serif',
            },
            colors: ['#d89b00', '#090030', '#ceccd6', '#451a34', '#4500d8', '#8b3d63', '#6fcb9f', '#ffe28a', '#ff71ce', '#05ffa1'],
            legend: {
                show: true,
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '21px',
                                fontFamily: 'Exo 2, sans-serif',
                                fontWeight: 100,
                                color: undefined,
                                offsetY: -10,
                                formatter: function (val) {
                                    return val
                                }
                            },
                            value: {
                                show: true,
                                fontSize: '21px',
                                fontFamily: 'Exo 2, sans-serif',
                                fontWeight: 300,
                                color: undefined,
                                offsetY: 16,
                                formatter: function (val) {
                                    //return "$ " + val
                                    return "$ " + Math.round(val * 100) / 100
                                }
                            },
                            total: {
                                show: true,
                                showAlways: false,
                                label: 'Total',
                                fontSize: '21px',
                                fontFamily: 'Exo 2, Arial, sans-serif',
                                fontWeight: 500,
                                color: '#090030',
                                formatter: function (w) {
                                    return "$ " + w.globals.seriesTotals.reduce((a, b) => {
                                        //return a + b
                                        return Math.round((a + b) * 100) / 100
                                    }, 0)
                                }
                            }
                        }
                    },
                }
            },
            series: [],
            responsive: [{
                breakpoint: 420,
                options: {
                    chart: {
                        width: 360
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]

        }

    }),

    methods: {
        async updateChart(array) {
            await callPrice()
            // this.options.labels = []
            // this.options.series = []
            while (this.options.labels.length > 0) {
                this.options.labels.pop();
            }
            while (this.options.series.length > 0) {
                this.options.series.pop();
            }
            for (let i = 0; i < array.length; i++) {
                let _value
                if (array[i].ticker === "BTC") {
                    _value = array[i].value * btcUsd
                } else if (array[i].ticker === "ETH") {
                    _value = array[i].value * ethUsd
                } else {
                    _value = array[i].value
                }

                this.options.series.push(Math.round(_value * 100) / 100)
                this.options.labels.push(array[i].name)

            }
        }
    }
}
</script>

<style scoped>
#doughnut {
    /*  display: flex;
    align-items: center;
    justify-content: center */
}
</style>