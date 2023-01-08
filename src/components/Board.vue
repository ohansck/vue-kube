<template>
    <div v-if="winner">Winner is {{ winner.name }}!!🥳</div>
    <div v-else class="grid grid-cols-5 gap-0">
        <div v-for="field in fields.slice().reverse()" class="grid border border-6 border-gray-900 w-20 h-20" :class="{ 'bg-green-400': field.fieldType === 'BONUS', 'bg-red-400': field.fieldType === 'TRAP' }">
            <small class="place-self-center">{{ field.position }}</small>
            <div v-if="players" class="place-self-end">
                <small v-for="player in players">
                    <span v-if="player.joker">{{ player.field === field.position ? `🃏${player.name}` : '' }}</span>
                    <span v-else>{{ player.field === field.position ? player.name : '' }}</span>
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'board',
    setup () {
        const store = useStore()
        return {
            fields: computed(() => store.state.fields),
            players: computed(() => store.state.players),
            winner: computed(() => store.state.winner)
        }
    }
})
</script>

<style scoped>

</style>