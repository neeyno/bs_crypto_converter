<template>
    <div>
        <div id="pair-container" v-for="(val, key) in cryptos">
            <div class="title">
                <p>1
                    <span> {{ key }} </span>
                    equals
                    <span>{{ Object.values(val)[0] }} {{ Object.keys(val)[0] }}</span>
                </p>
            </div>
            <div class="div-input">
                <input id="input1" class="currency-input" @input="convert(firstVal, true)" v-model.number="firstVal"
                    type="number" placeholder="0.00" /><span> {{ key }}</span>
            </div>
            <div class="div-input">
                <input id="input2" class="currency-input" @input="convert(secondVal, false)" v-model.number="secondVal"
                    type="number" placeholder="0.00" /><span>{{ Object.keys(val)[0] }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Pair',
    props: ['currentIndex'],
    watch: {
        'currentIndex': function (object) {
            this.firstVal = "";
            this.secondVal = "";
            this.getData(object.idA, object.idB)
        }
    },
    data: () => ({
        cryptos: [],
        errors: [],
        firstVal: "",
        secondVal: "",

    }),
    methods: {
        convert: function (val, bool) {
            console.log(val, bool)
            const ratio = Object.values(Object.values(this.cryptos)[0])[0]
            if (bool) {
                this.secondVal = val * ratio
            }
            else { this.firstVal = val * (1 / ratio) }
        },
        async getData(coinA, coinB) {
            await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinA}&tsyms=${coinB}`)
                .then(response => {
                    this.cryptos = response.data
                    //btcUsd = Object.values(Object.values(this.cryptos)[0])[0]
                })

        }
    },

    mounted() {
        this.getData("BTC", "USD")
        // axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        //     .then(response => {
        //         this.cryptos = response.data
        //         console.log(this.cryptos)
        //         //this.ratio = Object.values(Object.values(this.cryptos)[0])[0]
        //     })
    }
}
</script>

<style scoped>
#pair-container {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    height: 180px;
    display: block;
}

.title {
    width: 95%;
    justify-content: center;
    margin: 0 auto;
    padding-top: 10px;
    height: 60px;
    display: flex;
    font-size: 17px;
}

.title span {
    margin: 15px auto;
    font-size: 21px;
    font-weight: 300;
    letter-spacing: 0.1em;
}

.div-input {
    justify-content: center;
    width: 95%;
    display: flex;
    margin: 0 auto;
    max-width: 300px;
}

.div-input span {
    float: right;
    margin: 11px;
    width: 30px;
    font-size: 17px;
    font-weight: 300;
}

.div-input input {
    /* background-color: #e9eeef;
    color: #090030;
    border-width: 0px;

    -webkit-box-shadow: 1px 0px 5px 1px rgba(34, 60, 80, 0.15) inset;
    -moz-box-shadow: 1px 0px 5px 1px rgba(34, 60, 80, 0.15) inset;
    box-shadow: 1px 0px 5px 1px rgba(34, 60, 80, 0.15) inset; */

    display: flex;
    margin: 5px 0;
    margin-left: 5px;
    padding-left: 10px;
    letter-spacing: 00.1em;
    width: 100%;
    max-width: 300px;
    height: 36px;
    font-family: 'Exo 2', sans-serif;
    font-size: 17px;
    font-weight: 100;

    background-color: #fbfcfc;
    color: #090030;
    border-width: 0px;
    border-bottom: 1px solid #d2d6d7;


}

.div-input input:focus {
    outline: none;
    border-bottom: 1px solid #090030;
    transition: 0.2s;
    transform: scale(1.01);
}
</style>