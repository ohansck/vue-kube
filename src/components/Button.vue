<template>
    <button v-if="!to" v-bind="$attrs" type="button" @click="onClick" class="flex items-center justify-center">
        <slot></slot>
    </button>
    <router-link v-else v-bind="$attrs" :to="to" @click="onClick" class="flex items-center justify-center">
        <span>
            <slot></slot>
        </span>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    name: 'Button',
    props: {
        to: {
            type: String,
            required: false,
        }
    },
    emits: ["click"],
    setup (props, { emit }) {
        props = reactive(props);
        return {
            onClick() {
                emit("click");
            }
        }
    }
})
</script>