<template>
    <div id="app">
        <Navbar/>
        <Main/>
    </div>
</template>

<script>
import Navbar from './components/Navbar'
import Main from './components/Main'

export default {
    name: 'App',
    components: {
        Navbar, Main
    }
}
</script>

<style>
@import './assets/style.css';

</style>
