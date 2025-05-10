<script setup>
defineProps(['drawer'])

const links = [
    { text: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
    { text: 'Products', to: '/products', icon: 'mdi-shopping' },
    { text: 'Orders', to: '/orders', icon: 'mdi-cart' },
    { text: 'Users', to: '/users', icon: 'mdi-account-multiple' },
    { text: 'Settings', to: '/settings/store', icon: 'mdi-cog' },
]

import { useSettingsStore } from '../stores/storeSettings'
const store = useSettingsStore()
console.log(store.settings)
</script>

<template>
    <v-navigation-drawer :model-value="drawer" app>
        <v-list-item>
            <v-list-item-icon>
                <v-icon>mdi-vuetify</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="text-h6">{{
                    store.settings.storeName
                }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item
                class="d-flex justify-space-between align-center border-b"
                v-for="item in links"
                :key="item.text"
                :to="item.to"
                link
                exact
                :active-class="'v-list-item--active'"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.v-list-item--active {
    background-color: #484f57e6 !important;
    border-radius: 8px;
}
</style>
