<template>
    <div id="converter">
        <div class="tab-selector">
            <ul class="pair-tabs">
                <li v-for="(pair, i) in Pairs" :key="i" :class="{ active: currentIndex === i }" @click="changeIndex(i)">
                    <span>{{ pair.idA }} / {{ pair.idB }}</span>
                </li>
            </ul>
        </div>

        <div class="tab-active">
            <Pair :currentIndex="Pairs[currentIndex]" />
            <Chart :currentIndex="Pairs[currentIndex]" />
        </div>
    </div>
</template>

<script>
import Pair from '../components/Pair'
import Chart from '../components/Chart'

export default {
    name: 'Converter',
    components: { Pair, Chart },
    data: () => ({
        currentIndex: 0,
        Pairs: [{
            idA: "BTC",
            idB: "USD"
        }, {
            idA: "ETH",
            idB: "USD"
        }, {
            idA: "ETH",
            idB: "BTC"
        }]
    }),
    methods: {
        changeIndex(index) {
            this.currentIndex = index;
            //console.log(index)
            // this.$emit("changeIndex", this.Pairs[index].idA, this.Pairs[index].idB)
        },
    },

}
</script>

<style scoped>
#converter {
    display: block;
    max-width: 840px;
    margin: 0 auto;
    color: #090030;
}

.tab-selector {
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    width: 97%;
    max-width: 500px;
}

.pair-tabs {
    color: var(--main-color);
    display: flex;
    letter-spacing: 0.15em;
    font-size: 13px;
    height: 35px;
    justify-content: space-between;
    line-height: 16px;
    list-style-type: none;
    list-style: inside;
    list-style: none;

    margin: 0;
    padding: 0;
    text-align: center;
    width: 100%;
    max-width: 500px;

}

.pair-tabs li {
    border-bottom: solid 1px var(--main-color);
    cursor: pointer;
    opacity: 0.5;
    padding-top: 10px;
    text-transform: uppercase;
    width: 100%;
}

.pair-tabs li:hover {
    transform: scale(1.01);
    opacity: 0.8;
    transition: 0.2s;
}

.pair-tabs li.active {
    border-bottom: solid 2px #090030;
    margin-top: -2px;
    opacity: 1;
    transform: scale(1.02);
    transition: 0.2s;
}

.tab-active {
    margin: 0 auto;
    width: 100%;
    background-color: #fbfcfc;

    -webkit-box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
    -moz-box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
    box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
}
</style>