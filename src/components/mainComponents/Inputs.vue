<template>
    <div class="row mx-0 pl-lg-5 px-lg-0 px-sm-5 px-4 col-lg-6 col-12">
        <div class="col-6 px-0 pr-2">
            <h6 class='font-weight-normal'>Сумма:</h6>
            <input v-model='sum' class='col-12 p-2 border px-0 text-center' placeholder="Сумма">
            <div class="row input-controls mx-auto">
                <button @click='sum = $store.state.score' class='col-3 p-2 light-font px-0 border-left border-bottom border-right'>Max</button>
                <button @click='sum = "1"' class='col-3 p-2 light-font px-0 border-bottom border-right'>Min</button>
                <button @click='sum = parseFloat((sum*2).toFixed(2))' class='col-3 p-2 light-font px-0 border-bottom border-right'>x2</button>
                <button @click='sum = parseFloat((sum/2).toFixed(2))' class='col-3 p-2 light-font px-0 border-bottom border-right'>/2</button>
            </div>
        </div>
        <div class="col-6 px-0 pl-2">
            <h6 class='font-weight-normal'>Шанс:</h6>
            <input v-model='chance' class='col-12 p-2 border px-0 text-center' placeholder="Шанс">
            <div class="row input-controls mx-auto">
                <button @click='chance = 95' class='col-3 p-2 light-font px-0 border-left border-bottom border-right'>Max</button>
                <button @click='chance = 1' class='col-3 p-2 light-font px-0 border-bottom border-right'>Min</button>
                <button @click='chance = parseFloat((chance*2).toFixed(2))' class='col-3 p-2 light-font px-0 border-bottom border-right'>x2</button>
                <button @click='chance = parseFloat((chance/2).toFixed(2))' class='col-3 p-2 light-font px-0 border-bottom border-right'>/2</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ChanceInput",
    data() {
        return {
            sum: this.$store.state.sum, //начальная сумма в инпуте
            chance: this.$store.state.chance //начальный шанс в инпуте
        }
    },
    watch: {
        chance: function() { //генерация шанса и валидаторы
            this.chance > 95 ? this.chance = 95 : true;
            if(this.chance.length != 0) {
                let str = String(this.chance);
                let arr = str.split('.');
                if(arr[1] != undefined) {
                    if(arr[1].length > 2) {
                        this.chance = arr[0]+'.'+arr[1].substr(0,2);
                    }
                }
            }

            const newData = {
                successValue: +(this.sum * 100 / this.chance).toFixed(2),
                minValue: this.chance != "" ? +(this.chance * 10000 - 1).toFixed(0) : 0,
                maxValue: this.chance != "" ? +(999999 - (this.chance * 10000 - 1)).toFixed(0) : 999999
            }

            this.$store.commit('updateChance', this.chance);
            this.$emit('updateChance', newData);
        },
        sum: function() { //генерация суммы выигрыша и валидаторы
            this.sum > 1000000 ? this.sum = 1000000 : true;
            if(this.sum.length != 0) {
                let str = String(this.sum);
                let arr = str.split('.');
                if(arr[1] != undefined) {
                    if(arr[1].length > 2) {
                        this.sum = arr[0]+'.'+arr[1].substr(0,2);
                    }
                }
            }

            let newData = {
                successValue: +(this.sum * 100 / this.chance).toFixed(2)
            }

            this.$store.commit('updateSum', this.sum);
            this.$emit('updateSum', newData);
        }
    }
}
</script>
