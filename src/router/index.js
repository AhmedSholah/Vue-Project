import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '@/Layouts/AdminLayout.vue'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'

import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'
import Users from '@/views/Users.vue'
import Settings from '@/views/Settings.vue'
import SignIn from '@/views/SignIn.vue'

const routes = [
    {
        path: '/',
        component: AdminLayout,
        children: [
            { path: '', name: 'Dashboard', component: Dashboard },
            { path: 'products', name: 'Products', component: Products },
            { path: 'orders', name: 'Orders', component: Orders },
            { path: 'users', name: 'Users', component: Users },
            { path: 'settings', name: 'Settings', component: Settings },
        ],
    },
    {
        path: '/signin',
        component: SignIn,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
