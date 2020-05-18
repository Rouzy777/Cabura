<template>
    <div>
        <Navbar activePage='play'/>
        <Main/>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Main from '@/components/Main'

export default {
    name: 'Dicer',
    components: {
        Navbar, Main
    }
}
</script>
