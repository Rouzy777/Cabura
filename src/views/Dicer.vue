<template>
    <div v-if='!loading'>
        <Navbar :nickname='name' activePage='play'/>
        <Main/>
    </div>
    <div v-else class='d-flex min-vh-100'>
        <div class="m-auto">
            <Loader size='5rem'/>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Main from '@/components/Main'

export default {
    name: 'Dicer',
    components: {
        Navbar, Main
    },
    data: () => ({
        loading: true
    }),
    async mounted() {
        if(!Object.keys(this.$store.getters.info).length || Object.keys(this.$store.getters.info)) {
            await this.$store.dispatch('fetchInfo');
            this.$store.state.score = this.bill
            this.loading = false;
        }
    },
    computed: {
        name() {
            return this.$store.getters.info.name
        },
        bill() {
            return this.$store.getters.info.bill
        }
    }
}
</script>
