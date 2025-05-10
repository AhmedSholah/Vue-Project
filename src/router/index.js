import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SettingsLayout from '@/layouts/SettingsLayout.vue'

// Views
import Dashboard from '@/views/Dashboard.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'
import Users from '@/views/Users.vue'
import SignIn from '@/views/SignIn.vue'
import ProductsForm from '@/views/ProductsForm.vue'
import UsersForm from '@/views/UsersForm.vue'
import OrdersForm from '@/views/OrdersForm.vue'
import StoreSettings from '@/views/Settings/StoreSettings.vue'
import RoleManagement from '@/views/Settings/roles/RoleManagement.vue'
import RoleEdit from '@/views/Settings/roles/RoledEdit.vue'
import RoleCreate from '@/views/Settings/roles/RoleCreate.vue'
import CategoryManagement from '@/views/Settings/categories/CategoryManagement.vue'
import CategoryCreate from '@/views/Settings/categories/CategoryCreate.vue'
import CategoryEdit from '@/views/Settings/categories/CategoryEdit.vue'
import NotFound from '@/views/NotFound.vue'
import Error from '@/views/Error.vue'
import OrderDetails from '@/views/OrderDetails.vue'


const routes = [
    {
        path: '/',
        component: AdminLayout,
        children: [
            { path: '', name: 'Dashboard', component: Dashboard },
            { path: 'products', name: 'Products', component: Products },
            { path: 'orders', name: 'Orders', component: Orders },
            { path: 'orders/:id', name: 'OrderDetails', component: OrderDetails },
            { path: 'users', name: 'Users', component: Users },
            //  { path: 'settings', name: 'Settings', component: Settings },
            { path: 'form/products/:id?', name: 'Product Form', component: ProductsForm },
            { path: 'form/users/:id?', name: 'User Form', component: UsersForm },
            { path: 'form/orders/:id?', name: 'Order Form', component: OrdersForm },

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
                        path: 'roles/create',
                        name: 'RoleCreate',
                        component: RoleCreate,
                    },
                    {
                        path: 'roles/edit/:id',
                        name: 'RoleEdit',
                        component: RoleEdit,
                    },
                    {
                        path: 'categories',
                        name: 'CategoryManagement',
                        component: CategoryManagement,
                    },
                    {
                        path: 'categories/create',
                        name: 'categoryCreate',
                        component: CategoryCreate,
                    },
                    {
                        path: 'categories/edit/:id',
                        name: 'CategoryEdit',
                        component: CategoryEdit,
                    },
                ],
            },
        ],
    },
    {
        path: '/signin',
        component: SignIn,
    },
    {
        path: '/error',
        component: Error,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
