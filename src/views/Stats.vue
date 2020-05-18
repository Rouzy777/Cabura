<template>
    <div>
        <Navbar activePage='stats'/>
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
    }
}
</script>
