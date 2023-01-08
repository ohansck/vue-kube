<template>
    <div v-if="fields.length < 1" class="h-full flex flex-col space-y-6 items-center justify-center">
        Loading game...
    </div>
    <div v-else class="h-full flex flex-col space-y-6 items-center justify-center">
        <div class="flex space-x-6 items-center">
            <div v-if="!winner" class="text-lg text-gray-600 font-medium">
                <small>Current Dice number</small>
                <h4>{{ diceNumber || '' }}</h4>
            </div>
            <Board></Board>
            <div v-if="!winner" class="text-lg text-gray-600 font-medium">
                {{ nextPlayer.name }} has the next turn
            </div>
        </div>
        <Button v-if="!winner" class="bg-green-500 w-fit text-white py-2 px-3 rounded-lg font-medium text-base hover:ring hover:ring-green-200 transition delay-200 ease-in-out" @click="nextTurn">
            <span>Roll Dice</span>
        </Button>
        <Button v-if="winner" class="bg-green-500 w-fit text-white py-2 px-3 rounded-lg font-medium text-base hover:ring hover:ring-green-200 transition delay-200 ease-in-out" @click="newGame">
            <span>New Game</span>
        </Button>
    </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import alexandriaApi from '~/api'

export default defineComponent({
    name: 'play',
    setup () {
        const store = useStore()
        const router = useRouter()
        const gameId = ref('')
        const players = computed(() => store.state.numOfPlayers)
        const startGame = async() => {
            await alexandriaApi.get('/start').then(res => {
                gameId.value = res.data;
                store.commit('setGameId', gameId.value)
            }).catch(err => {
                console.log(err);
            })
        }
        const getPlayers = async() => {
            await startGame();
            await alexandriaApi.post('/players', { id: gameId.value, numberOfPlayers: players.value }).then(res => {
                store.commit('setFields', res.data.fields)
                store.commit('setNextPlayer', res.data.nextPlayer)
                store.commit('setPlayers', res.data.players)
                store.commit('setWinner', res.data.winner)
            }).catch(err => {
                console.log(err);
            })
        }
        const nextTurn = async () => {
            let diceNumber = await rollDice();
            await alexandriaApi.post('/next', { id: store.state.gameId, player: store.state.nextPlayer.name, numberOfDice: diceNumber }).then(res => {
                store.commit('setFields', res.data.fields)
                store.commit('setNextPlayer', res.data.nextPlayer)
                store.commit('setPlayers', res.data.players)
                store.commit('setWinner', res.data.winner)
                store.commit('setGameId', res.data.id)
            }).catch(err => {
                console.log(err)
            })
        }
        const diceNumber = ref()
        const rollDice = async() => {
            diceNumber.value = await Math.floor(Math.random() * (6 - 1 + 1) + 1)
            return diceNumber.value
        }
        const newGame = () => {
            router.push('/');
        }
        onMounted(() => {
            getPlayers();
        });
        return {
            fields: computed(() => store.state.fields),
            nextPlayer: computed(() => store.state.nextPlayer),
            winner: computed(() => store.state.winner),
            nextTurn,
            diceNumber,
            newGame
        }
    }
})
</script>

<style scoped>

</style>