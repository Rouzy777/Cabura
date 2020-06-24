<template>
    <div class="d-flex justify-content-center">
        <div class='spinner-border' :style="{width: size, height: size}" role="status">
            <span class="sr-only">Загрузка...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        size: String
    }
}
</script>
