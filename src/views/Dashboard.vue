<template>
    <div id="dashboard">
        <div class="title">
            <p>PORTFOLIO</p>
        </div>
        <div class="dashboard-box">
            <div class="chart-box">
                <DoughnutChart ref="chart"></DoughnutChart>
            </div>

            <div class="assets-box">
                <ul class="ul-asset">
                    <li v-for="(item, i) in Items" :key="i">
                        <div><span>{{ item.name }} </span> <span>{{ item.value }} {{ item.ticker }}</span></div>
                        <input v-model.number="newValue[i]" type="number" :placeholder="item.value + item.ticker" />
                        <button @click="changeAsset(i, newValue[i])">Change</button>
                    </li>
                    <li class="add-li">
                        <input v-model="newAsset[0]" type="text" placeholder="Name" />
                        <input class="add-input" v-model="newAsset[1]" type="text" placeholder="Ticker" />
                        <input class="add-input" v-model.number="newAsset[2]" type="number" placeholder="0.00 Amount" />
                        <button @click="addAsset(newAsset)">Add +</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import DoughnutChart from '../components/Doughnut'

// const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//         animateRotate: false
//     }
// }

export default {
    name: 'Dashboard',
    components: { DoughnutChart },
    data: () => ({
        newValue: ["", "", ""],
        newAsset: ["", "", ""],

        Items: [
            {
                ticker: "BTC",
                name: "Bitcoin",
                value: 0.1
            }, {
                ticker: "ETH",
                name: "Ethereum",
                value: 1
            }, {
                ticker: "USD",
                name: "US Dollar",
                value: 1000
            },
        ],

        totalBalance: 0
    }),
    emits: ['update'],
    methods: {
        addAsset(asset) {
            const newAsset = {
                ticker: asset[1],
                name: asset[0],
                value: asset[2]
            }
            console.log(newAsset)
            this.Items.push(newAsset)

            this.$refs.chart.updateChart(this.Items)
        },

        changeAsset(id, _value) {
            if (_value === 0) {
                this.Items.splice(id, 1);
            } else {
                this.Items[id].value = _value
            }
            this.$refs.chart.updateChart(this.Items)
        },

    },
    mounted() {
        //this.$emit('update', console.log(this.Items))
        this.$refs.chart.updateChart(this.Items)
    }

}
</script>

<style scoped>
#dashboard {
    display: block;
    max-width: 840px;
    margin: 0 auto;
}

.dashboard-box {
    margin: 0 auto;
    background-color: #fbfcfc;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    -webkit-box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
    -moz-box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);
    box-shadow: -2px 5px 11px 0px rgba(34, 60, 80, 0.18);

    font-family: 'Exo 2';
    font-size: 17px;
    font-weight: 100;
}

.title {
    display: flex;
    justify-content: center;
    font-size: 13px;
    letter-spacing: 0.15em;
    height: 37px;
    margin: 0 auto;
    padding: 0;
    width: 35%;
    max-width: 220px;
    border-bottom: solid 2px #090030;
    opacity: 1;
    margin-top: -4px;
}

.chart-box {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    height: auto;
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
}

.assets-box {
    width: 100%;
    max-width: 420px;
    height: auto;
    box-sizing: border-box;
}

.assets-box div {
    height: 40px;
    display: flex;
}

.assets-box div h3 {
    background-color: blueviolet;
}

.ul-asset {
    background: #f1f1f1;
    color: var(--main-color);
    display: inline;
    font-size: 16px;
    height: 30px;
    justify-content: space-between;
    line-height: 16px;
    list-style-type: none;
    margin: 0;
    max-width: var(--max-width);
    padding: 0;
    text-align: center;
    width: 85%;
}

.ul-asset li {
    display: flex;
    width: 98%;
    height: 50px;
    background-color: #ceccd6;
    color: #090030;

    margin: 5px;
    justify-content: space-between;
}

li:hover {
    opacity: 0.9;
    border-left: 2px solid #090030;
    width: 97.5%;
}

.ul-asset div {
    font-size: 17px;
    font-weight: 300;
    letter-spacing: 0.1em;
    margin: 16px 0 0 5px;
    justify-content: space-between;
    width: 200px;
}

.ul-asset input {
    margin: 8px 0px 0 5px;
    height: 30px;
    width: 26%;

    background-color: #fbfcfc;
    color: #090030;
    border-width: 0px;
    padding-left: 5px;
    font-family: 'Exo 2', sans-serif;
    font-size: 13px;
    font-weight: 100;
    border-bottom: 1px solid #d2d6d7
}

.ul-asset input:focus {
    outline: none;
    border-bottom: 1px solid #090030;
    transition: 0.2s;
}

.ul-asset button {
    margin: 8px 5px 0 5px;
    height: 32px;
    width: 60px;
    cursor: pointer;
    background-color: #090030;
    color: #fbfcfc;
    border: none;
}

button:hover {
    opacity: 0.8;
}

button:active {
    transform: scale(0.95);

}

.ul-asset .add-li {
    background-color: #fbfcfc;
    border: 1px solid #d2d6d7;
    width: 97.5%;
    height: 48px;
}
</style>