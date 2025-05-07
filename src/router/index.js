import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '@/Layouts/AdminLayout.vue'
import DefaultLayout from '@/Layouts/DefaultLayout.vue'

import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'
import Users from '@/views/Users.vue'
import Settings from '@/views/Settings.vue'
import SignIn from '@/views/SignIn.vue'
import ProductsForm from '@/views/ProductsForm.vue'
import UsersForm from '@/views/UsersForm.vue'
import OrdersForm from '@/views/OrdersForm.vue'

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
            { path: 'form/products/:id?', name: 'Product Form', component: ProductsForm },
            { path: 'form/users/:id?', name: 'User Form', component: UsersForm },
            { path: 'form/orders/:id?', name: 'Order Form', component: OrdersForm },
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
