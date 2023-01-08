import { createRouter, createWebHistory } from 'vue-router'
import Home from '~/pages/Home.vue'
import Play from '~/pages/Play.vue'
export const routerHistory = createWebHistory()

export const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/play',
            name: 'play',
            component: Play,
            meta: { requiresAuth: true }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
        // always scroll to top
        return { top: 0 }
    }
});