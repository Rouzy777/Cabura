<template>
    <div class="modal fade" id="addMoney">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-bottom">
                    <h5 class="modal-title" id="exampleModalLongTitle">Пополнить</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body border-bottom">
                    <div class="container list-price text-center">
                        <div class="row">
                            <div @click='updateScore(10)' class="col-lg col-12">
                                <h2>+10₽</h2>
                            </div>
                            <div @click='updateScore(20)' class="col-lg col-12 my-lg-0 my-2 mx-lg-3">
                                <h2>+20₽</h2>
                            </div>
                            <div @click='updateScore(30)' class="col-lg col-12">
                                <h2>+30₽</h2>
                            </div>
                        </div>
                        <div class="row mt-lg-5 mt-2">
                            <div @click='updateScore(50)' class="col-lg col-12">
                                <h2>+50₽</h2>
                            </div>
                            <div @click='updateScore(100)' class="col-lg col-12 my-lg-0 my-2 mx-lg-3">
                                <h2>+100₽</h2>
                            </div>
                            <div @click='updateScore(200)' class="col-lg col-12">
                                <h2>+200₽</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddMoneyModal',
    methods: {
        updateScore: function(num) { //пополнение счета (передача в родительский компонент)
            this.$emit('clicked', num);
        }
    }
}
</script>
