<template>
    <div>
        <apexchart2 id="candlestick" type="candlestick" height="300" :options="chartOptions" :series="series">
        </apexchart2>
    </div>
</template>

<script>
//<button @click="changeType"> Change Chart</button>
import axios from 'axios'

import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts);
Vue.component('apexchart2', VueApexCharts);

export default {
    name: 'Chart',
    props: ['currentIndex'],
    watch: {
        'currentIndex': function (object) {
            const resetSeries = []
            this.series = resetSeries
            this.getChartData(object.idA, object.idB)
        }
    },
    data: () => ({
        //chartType: ['candlestick', 'area'],
        //typeIndex: 0,
        series: [{
            data: []
        }],
        chartOptions: {
            chart: {
                type: 'candlestick',
                //type: 'area',
                height: 350,
                fontFamily: 'Exo 2'
            },
            legend: {
                show: false
            },
            title: {
                //text: '14 Days chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                }
            }
        },

    }),

    methods: {
        objectRebuild(_array) {
            let array = []

            for (let i = 0; i < _array.length; i++) {
                let object = {}
                object["x"] = new Date(_array[i].time * 1000)
                // candelstick 
                object["y"] = [_array[i].open, _array[i].high, _array[i].low, _array[i].close]
                // area
                //object["y"] = [_array[i].close]
                array.push(object)
            }
            return array
        },
        getChartData(coinA, coinB) {
            axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinA}&tsym=${coinB}&limit=14`)
                .then(response => {
                    const _series = response.data.Data.Data
                    const newData = { "data": this.objectRebuild(_series) }
                    //this.series[0].data = this.objectRebuild(_series)
                    this.series.push(newData)
                })
        },
        // changeType() {},
    },

    mounted() {
        //this.typeIndex = 0
        this.getChartData("BTC", "USD")
        // axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=14')
        //     .then(response => {
        //         const _series = response.data.Data.Data
        //         const newData = { "data": this.objectRebuild(_series) }
        //         //this.series[0].data = this.objectRebuild(_series)
        //         this.series.push(newData)

        //         //console.log(this.objectRebuild(_series))
        //         //let newSeries = this.objectRebuild(_series)
        //         //console.log(response.data.Data.Data)
        //         //chart.updateSeries(this.series.data, true)
        //         //chart.updateSeries(this.series.data)
        //     })
    }
}
</script>

<style scoped>
#candlestick {
    background-color: #fbfcfc;
    margin: 0 auto;
    width: 95%;
    max-width: 800px;
    height: auto;
    margin-bottom: 10px;

    /* font-family: 'Exo 2';
    font-size: 17px;
    font-weight: 100; */
}
</style>