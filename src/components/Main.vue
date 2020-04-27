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
                        <div v-show='success' class="bg-success2 py-special rounded justify-content-center mt-3 mx-auto">
                            <h6 class='text-light py-1 smallerFSize font-weight-light mb-0'>Выиграли {{ lastSuccessValue }}</h6>
                        </div>
                        <div v-show='fail' class="bg-danger py-special rounded justify-content-center mt-3 mx-auto">
                            <h6 class='text-light py-1 smallerFSize font-weight-light mb-0'>Выпало {{ lastNum }}</h6>
                        </div>
                        <div v-show='money' class="bg-danger py-special rounded justify-content-center mt-3 mx-auto">
                            <h6 class='text-light py-1 smallerFSize font-weight-light mb-0'>Недостаточно средств</h6>
                        </div>
                        <div v-show='oneruble' class="bg-danger py-special rounded justify-content-center mt-3 mx-auto">
                            <h6 class='text-light py-1 smallerFSize font-weight-light mb-0'>Ставки от 1 рубля</h6>
                        </div>
                    </div>
                </div>
            </div>
            <History :lastGames='lastGames'/>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import Inputs from './mainComponents/Inputs'
import History from './mainComponents/History'

export default {
    name: 'Main',
    components: {
        Inputs, History
    },
    data() {
        return {
            successValue: 1.25, //шанс выигрыша
            lastSuccessValue: 0, //последний выигрыш
            lastNum: 0, //последнее выпавшее число
            minValue: 799999, //мин. разброс генерации числа в инпуте
            maxValue: 200000, //макс. разброс генерации числа в инпуте
            success: false, //уведомление о победе
            fail: false, //уведомление о проигрыше
            money: false, //предупреждение о нехватке средств
            oneruble: false, //предупреждение ставок от 1 рубля
            lastGames: [
                {},{},{},{},{},{},{},{},{},{},{},{},{},{}
            ]
        }
    },
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
                user: this.$store.state.user,
                sum: this.$store.state.sum,
                coef: "x"+(this.successValue / this.$store.state.sum).toFixed(2),
                result: this.fail ? 0 : this.lastSuccessValue,
                color: this.fail ? "#000" : "#3bbc73",
                show: true
            });
            this.lastGames.pop();
        },
        playSmaller: function() { //игра "меньше"
            this.oneruble = false;
            this.money = false;
            this.fail = false;
            this.success = false;
            if(this.$store.state.sum <= this.$store.state.score ) {
                if(this.$store.state.sum >= 1) {
                    var num = this.getRandomArbitrary(0, 1000000).toFixed(0);
                    this.$store.state.score -= this.$store.state.sum;
                    if(num <= Number(this.minValue)) {
                        this.$store.state.score += Number(this.successValue);
                        this.$store.state.score = (this.$store.state.score).toFixed(2);
                        this.success = true;
                        this.lastSuccessValue = this.successValue;
                        this.loadLastGame();
                        // od.update(this.$store.state.score);
                        // od2.update(this.$store.state.score);
                        Cookies.set('score', this.$store.state.score, { expires: 7 });
                        this.$store.commit('updateScore', this.$store.state.score);
                    } else {
                        this.fail = true;
                        this.lastNum = num;
                        this.loadLastGame();
                        // od.update(this.$store.state.score);
                        // od2.update(this.$store.state.score);
                        Cookies.set('score', this.$store.state.score, { expires: 7 });
                        this.$store.commit('updateScore', this.$store.state.score);
                    }
                } else {
                    this.oneruble = true;
                }
            } else {
                this.money = true;
            }
        },
        playBigger: function() { //игра "больше"
            this.oneruble = false;
            this.money = false;
            this.fail = false;
            this.success = false;
            if(this.$store.state.sum <= this.$store.state.score) {
                if(this.$store.state.sum >= 1) {
                    var num = this.getRandomArbitrary(0, 1000000).toFixed(0);
                    this.$store.state.score -= this.$store.state.sum;
                    if(num >= Number(this.maxValue)) {
                        this.$store.state.score += Number(this.successValue);
                        this.$store.state.score = (this.$store.state.score).toFixed(2);
                        // od.update(this.$store.state.score);
                        // od2.update(this.$store.state.score);
                        this.success = true;
                        this.lastSuccessValue = this.successValue;
                        this.loadLastGame();
                        Cookies.set('score', this.$store.state.score, { expires: 7 });
                        this.$store.commit('updateScore', this.$store.state.score);
                    } else {
                        this.fail = true;
                        this.lastNum = num;
                        this.loadLastGame();
                        // od.update(this.$store.state.score);
                        // od2.update(this.$store.state.score);
                        Cookies.set('score', this.$store.state.score, { expires: 7 });
                        this.$store.commit('updateScore', this.$store.state.score);
                    }
                } else {
                    this.oneruble = true;
                }
            } else {
                this.money = true;
            }
        }
    }
}
</script>
