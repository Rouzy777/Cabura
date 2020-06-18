<template>
    <div class="d-md-block d-none rounded bshadow border mt-3 px-0 py-2 mx-auto bg-white">
        <h6 class='mx-3 pt-2 pb-3 smallerFSize'>История</h6>
        <table class="table mb-0 text-center">
            <thead>
                <tr>
                    <th scope="col">ИГРА</th>
                    <th scope="col">ЛОГИН</th>
                    <th scope="col">СУММА</th>
                    <th scope="col">КОЭФФИЦИЕНТ</th>
                    <th scope="col">РЕЗУЛЬТАТ</th>
                </tr>
            </thead>
            <tbody>
            <tr class='h-special' v-for="(item, i) in lastGames" :key='`game-${i}`'>
                <th scope="row">
                    <svg v-show="item.show" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"></path>
                        <polyline points="2.32 6.16 12 11 21.68 6.16"></polyline>
                        <line x1="12" y1="22.76" x2="12" y2="11"></line>
                    </svg>
                </th>
                <td>{{item.user}}</td>
                <td>{{item.sum}}</td>
                <td>{{item.coef}}</td>
                <td :style="{ color: item.color }">{{item.result}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "History",
    props: {
        lastGames: Array
    }
}
</script>
