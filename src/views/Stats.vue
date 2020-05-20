<template>
    <div>
        <Navbar :nickname='name' activePage='stats'/>
        <div class="container mt-4 text-center">
            <h4>В разработке...</h4>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    name: 'Stats',
    components: {
        Navbar
    },
    data: () => ({
        loading: true
    }),
    async mounted() {
        if(!Object.keys(this.$store.getters.info).length || Object.keys(this.$store.getters.info)) {
            await this.$store.dispatch('fetchInfo');
            this.loading = false;
        }
    },
    computed: {
        name() {
            return this.$store.getters.info.name
        }
    }
}
</script>
