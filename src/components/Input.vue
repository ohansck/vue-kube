<template>
    <div class="p-0 border-0 shadow-none text-left">
        <input type="text" v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
export default defineComponent({
    name: 'input',
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    setup(props) {
        props = reactive(props);
        return {
        }
    },
})
</script>