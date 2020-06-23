<template>
    <header>
        <nav class="navbar py-0 sticky-top bg-white border-bottom navbar-expand-lg navbar-light">
            <div class="container">
                <a class="navbar-brand font-weight-bold" href="#">Cabura</a>
                <div class="collapse navbar-collapse ml-4" id="navbarTogglerDemo02">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <router-link
                            v-for='item in links'
                            :key='item.title'
                            tag="li"
                            class="nav-item"
                            active-class="active"
                            :to="item.link"
                            exact
                        >
                            <a class="nav-link smallerFSize">{{item.title}}</a>
                        </router-link>
                    </ul>
                    <div class="form-inline my-2 my-lg-0">
                        <div class="special-round mr-2 text-center">
                            <h6 class="text-light font-weight-bold">{{avatarName}}</h6>
                        </div>
                        <div class="d-flex flex-column">
                            <div>
                                <small class="text-muted">{{nickname}}</small>
                            </div>
                            <div>
                                <h5><IOdometer class="iOdometer" :value="Number($store.state.score)"/></h5>
                            </div>
                        </div>
                        <svg data-toggle="modal" data-target="#settings" viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class='ml-1 mr-4 pointer'>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        <!--div class="btn btn-special px-3 btn-nav">
                            <small class='light-font'>ВЫВОД</small>
                        </div-->
                        <div data-toggle="modal" data-target="#addMoney" class="btn bg-primary2 px-3 btn-nav">
                            <small class='text-light'>ПОПОЛНИТЬ</small>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="modal fade" id="settings" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header border-bottom">
                        <h5 class="modal-title">Настройки</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <button @click='logout' data-dismiss="modal" class='col-12 btn btn-primary'>Выйти из аккаунта</button>
                    </div>
                </div>
            </div>
        </div>
        <MoneyModal @clicked='getNumber'/>
        <div class='d-lg-none d-flex w-100 border-bottom px-3 bg-white'>
            <div class="container px-0 form-inline">
                <div data-toggle="modal" data-target="#addMoney" class="btn bg-primary2 px-3 btn-nav smallerFSize">
                    <small class='text-light'>ПОПОЛНИТЬ</small>
                </div>
                <div class="ml-2 d-flex flex-column">
                    <div>
                        <small class="text-muted">{{nickname}}</small>
                    </div>
                    <div>
                        <h5><IOdometer class="iOdometer" :value="Number($store.state.score)"/></h5>
                    </div>
                </div>
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class='ml-1 mr-4'>
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
    </header>
</template>

<script>
import MoneyModal from './navComponents/AddMoney'
import IOdometer from 'vue-odometer'
import 'odometer/themes/odometer-theme-default.css'

export default {
    name: 'Navbar',
    props: {
        activePage: String,
        nickname: String
    },
    components: {
        MoneyModal, IOdometer
    },
    data: () => ({
        links: [
            {title: "Играть", link: "/"},
            {title: "Статистика", link: "/stats"}
        ]
    }),
    computed: {
        avatarName() {
            return this.nickname.slice(0, 2).toUpperCase();
        }
    },
    methods: {
        async getNumber(num) {
            this.$store.state.score = Number(num) + Number(this.$store.state.score);
            try {
                await this.$store.dispatch('updateBill', {
                    bill: this.$store.state.score
                })
            } catch(e) {
                //continue regardless of error
            }
        },
        async logout() {
            this.$router.push('/signin?message=logout');
            await this.$store.dispatch('logout')
        }
    }
}
</script>
