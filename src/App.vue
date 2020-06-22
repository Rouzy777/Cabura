<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        metaInfo() {
            let routeName = this.$route.name;
            return {
                title: routeName,
                titleTemplate: '%s - UpWin'
            }
        }
    }
</script>

<style>
@import './assets/style.css';
</style>
