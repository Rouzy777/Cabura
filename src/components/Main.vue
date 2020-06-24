<template>
    <div class="py-lg-5 py-3 d-flex">
        <div class="m-auto container px-lg-3 px-sm-0 px-3">
            <div class="rounded h-box-block bshadow border px-0 py-2 mx-auto bg-white">
                <div class="border-bottom d-sm-block d-none py-3">
                    <h4 class="mx-3 font-weight-normal">Dice</h4>
                </div>
                <div class='pt-4 row'>
                    <Inputs @updateSum='updateSum' @updateChance='updateChance'/>
                    <div class="col-lg-6 px-sm-5 px-4 text-center col-12">
                        <h1 class='display-4 mt-lg-0 mt-4 font-weight-normal mb-0'>{{ successValue }}</h1>
                        <small class="text-muted font-weight-light">Возможный выигрыш</small>
                        <div class="col-12 mt-3 px-0 mx-auto row">
                            <div class="col-6 px-0 pr-2">
                                <small class='text-muted font-weight-light'>0 - {{minValue}}</small>
                                <button @click='playSmaller' class='btn smallerFSize font-weight-light mt-2 btn-secondary col-12 py-2'>Меньше</button>
                            </div>
                            <div class="col-6 px-0 pl-2">
                                <small class='text-muted font-weight-light'>{{maxValue}} - 999999</small>
                                <button @click='playBigger' class='btn smallerFSize font-weight-light mt-2 btn-secondary col-12 py-2'>Больше</button>
                            </div>
                        </div>
                        <div
                            v-for='warning in warnings'
                            :key='warning.message'
                            :class='{"bg-success2": warning.greenColor, "bg-danger": !warning.greenColor}'
                            class="py-special rounded justify-content-center mt-3 mx-auto"
                        >
                            <h6 class='text-light py-1 smallerFSize font-weight-light mb-0'>{{warning.message}}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <History :lastGames='lastGames'/>
        </div>
    </div>
</template>

<script>
import Inputs from './mainComponents/Inputs'
import History from './mainComponents/History'
import { mapState } from 'vuex'

export default {
    name: 'Main',
    components: {
        Inputs, History
    },
    data: () => ({
        successValue: 1.25, //шанс выигрыша
        lastSuccessValue: 0, //последний выигрыш
        lastNum: 0, //последнее выпавшее число
        minValue: 799999, //мин. разброс генерации числа в инпуте
        maxValue: 200000, //макс. разброс генерации числа в инпуте
        success: false, //уведомление о победе
        warnings: [],
        lastGames: [
            {},{},{},{},{},{},{},{},{},{},{},{},{},{}
        ]
    }),
    computed: mapState({
        score: state => state.score,
        sum: state => state.sum
    }),
    methods: {
        updateSum: function(data) {
            this.successValue = data.successValue
        },
        updateChance: function(data) {
            this.successValue = data.successValue
            this.minValue = data.minValue
            this.maxValue = data.maxValue
        },
        getRandomArbitrary(min, max) { //генерация числа для игры
            return Math.random() * (max - min) + min
        },
        loadLastGame() {
            this.lastGames.unshift({
                user: this.$store.getters.info.name,
                sum: this.sum,
                coef: "x"+(this.successValue / this.sum).toFixed(2),
                result: !this.success ? 0 : this.lastSuccessValue,
                color: !this.success ? "#000" : "#3bbc73",
                show: true
            });
            this.lastGames.pop();
        },
        emptyWarnings() {
            this.success = false;
            this.warnings = [];
        },
        async playSmaller() { //игра "меньше"
            this.emptyWarnings();
            if(this.sum <= this.score ) {
                if(this.sum >= 1) {
                    const num = this.getRandomArbitrary(0, 1000000).toFixed(0);
                    this.$store.state.score -= this.sum;
                    if(num <= this.minValue) {
                        Number(this.$store.state.score += this.successValue).toFixed(2);
                        this.success = true;
                        this.lastSuccessValue = this.successValue;
                        this.warnings.push({
                            message: `Выиграли ${this.lastSuccessValue}`,
                            greenColor: true
                        });
                        this.loadLastGame();
                        await this.$store.dispatch('updateBill', {
                            bill: this.score
                        })
                    } else {
                        this.success = false;
                        this.lastNum = num;
                        this.warnings.push({
                            message: `Выпало ${this.lastNum}`,
                            greenColor: false
                        });
                        this.loadLastGame();
                        await this.$store.dispatch('updateBill', {
                            bill: this.score
                        })
                    }
                } else {
                    this.warnings.push({
                        message: 'Ставки от 1 рубля',
                        greenColor: false
                    });
                }
            } else {
                this.warnings.push({
                    message: 'Недостаточно средств',
                    greenColor: false
                });
            }
        },
        async playBigger() { //игра "больше"
            this.emptyWarnings();
            if(this.sum <= this.score) {
                if(this.sum >= 1) {
                    const num = this.getRandomArbitrary(0, 1000000).toFixed(0);
                    this.$store.state.score -= this.sum;
                    if(num >= this.maxValue) {
                        Number(this.$store.state.score += this.successValue).toFixed(2);
                        this.success = true;
                        this.lastSuccessValue = this.successValue;
                        this.warnings.push({
                            message: `Выиграли ${this.lastSuccessValue}`,
                            greenColor: true
                        });
                        this.loadLastGame();
                        await this.$store.dispatch('updateBill', {
                            bill: this.score
                        })
                    } else {
                        this.success = false;
                        this.lastNum = num;
                        this.warnings.push({
                            message: `Выпало ${this.lastNum}`,
                            greenColor: false
                        });
                        this.loadLastGame();
                        await this.$store.dispatch('updateBill', {
                            bill: this.score
                        })
                    }
                } else {
                    this.warnings.push({
                        message: 'Ставки от 1 рубля',
                        greenColor: false
                    });
                }
            } else {
                this.warnings.push({
                    message: 'Недостаточно средств',
                    greenColor: false
                });
            }
        }
    }
}
</script>
