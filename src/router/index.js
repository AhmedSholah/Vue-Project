import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'

// Views
import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'
import Users from '@/views/Users.vue'
import SignIn from '@/views/SignIn.vue'
import StoreSettings from '@/views/Settings/StoreSettings.vue'
import RoleManagement from '@/views/Settings/RoleManagement.vue'
import CategoryManagement from '@/views/Settings/CategoryManagement.vue'

const routes = [
    {
        path: '/',
        component: AdminLayout,
        children: [
            { path: '', name: 'Dashboard', component: Dashboard },
            { path: 'products', name: 'Products', component: Products },
            { path: 'orders', name: 'Orders', component: Orders },
            { path: 'users', name: 'Users', component: Users },
            {
                path: 'settings',
                component: SettingsLayout,
                children: [
                    { path: '', redirect: 'settings/store' },
                    {
                        path: 'store',
                        name: 'StoreSettings',
                        component: StoreSettings,
                    },
                    {
                        path: 'roles',
                        name: 'RoleManagement',
                        component: RoleManagement,
                    },
                    {
                        path: 'categories',
                        name: 'CategoryManagement',
                        component: CategoryManagement,
                    },
                ],
            },
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
