<template>
    <header>
        <nav class="navbar pb-0 sticky-top bg-white border-bottom navbar-expand-lg navbar-light">
            <div class="container">
                <a class="navbar-brand font-weight-bold" href="#">Cabura</a>
                <div class="collapse navbar-collapse ml-4" id="navbarTogglerDemo02">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a class="nav-link smallerFSize" href="#">Главная</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link smallerFSize" href="#">Как играть</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link smallerFSize" href="#">FAQ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link smallerFSize" href="#">Рефералы</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link smallerFSize" href="#">Бонусы</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <div class="special-round mr-2 text-center">
                            <h6 class="text-light font-weight-bold">RO</h6>
                        </div>
                        <div class="d-flex flex-column">
                            <div>
                                <small class="text-muted">{{user}}</small>
                            </div>
                            <div>
                                <h5 class='odometer'>{{$store.state.score}}</h5>
                            </div>
                        </div>
                        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class='ml-1 mr-4'>
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        <!--div class="btn btn-special px-3 btn-nav">
                            <small class='light-font'>ВЫВОД</small>
                        </div-->
                        <div data-toggle="modal" data-target="#addMoney" class="btn bg-primary2 px-3 btn-nav">
                            <small class='text-light'>ПОПОЛНИТЬ</small>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
        <MoneyModal @clicked='getNumber'/>
        <div class='d-lg-none d-flex w-100 border-bottom px-3 bg-white'>
            <div class="container px-0 form-inline">
                <div data-toggle="modal" data-target="#addMoney" class="btn bg-primary2 px-3 btn-nav smallerFSize">
                    <small class='text-light'>ПОПОЛНИТЬ</small>
                </div>
                <div class="ml-2 d-flex flex-column">
                    <div>
                        <small class="text-muted">{{user}}</small>
                    </div>
                    <div>
                        <h5 class='odometer'>{{$store.state.score}}</h5>
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
import Cookies from 'js-cookie'

export default {
    name: 'Navbar',
    components: {
        MoneyModal
    },
    data() {
        return {
            user: this.$store.state.user //никнейм
        }
    },
    methods: {
        getNumber(num) {
            this.$store.state.score = Number(num) + Number(this.$store.state.score);
            // od.update(this.score);
            // od2.update(this.score);
            Cookies.set('score', this.$store.state.score, { expires: 7 });
        }
    }
}
</script>
