<template>
    <div class="h-full flex flex-col space-y-2 items-center justify-center">
        <h1 class="text-5xl font-medium font-[#0A0A0A]">Start Game</h1>
        <div class="flex space-x-2">
            <Input placeholder="Number of players" v-model.trim="players"/>
            <Button class="bg-green-500 w-fit text-white py-1 px-3 rounded-lg font-medium text-base hover:ring hover:ring-green-200 transition delay-200 ease-in-out" @click="startGame">
                <span>Play!</span>
            </Button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    name: "home",
    setup() {
        const router = useRouter()
        const store = useStore()
        const players = ref('')
        const startGame = () => {
            if (parseInt(players.value) > 1 && parseInt(players.value) < 5) {
                store.commit('setNumOfPlayers', parseInt(players.value))
                router.push('/play')
            } else {
                alert('Players should be between 1 and 5')
            }
        }
        return {
            players,
            startGame
        };
    }
})
</script>

<style scoped>

</style>