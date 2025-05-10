<script setup>
// defineProps(['drawer'])
const rail = ref(true)
const drawer = ref(true)

const links = [
    { text: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
    { text: 'Products', to: '/products', icon: 'mdi-shopping' },
    { text: 'Orders', to: '/orders', icon: 'mdi-cart' },
    { text: 'Users', to: '/users', icon: 'mdi-account-multiple' },
    { text: 'Settings', to: '/settings/store', icon: 'mdi-cog' },
]

import { ref } from 'vue'
import { useSettingsStore } from '../stores/storeSettings'
const store = useSettingsStore()
console.log(store.settings)
</script>

<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list>
            <v-list-item prepend-avatar="user-setting.png" title="Dashboard">
                <template v-slot:append>
                    <v-btn
                        icon="mdi-chevron-left"
                        variant="text"
                        @click.stop="rail = !rail"
                    ></v-btn>
                </template>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item
                v-for="link in links"
                :key="link.text"
                :prepend-icon="link.icon"
                :title="link.text"
                :value="link.to"
                :to="link.to"
                exact
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
.v-theme--light .v-list-item--active {
    background-color: #d4e7ff !important;
    color: #236fd5 !important;
}

.v-theme--dark .v-list-item--active {
    background-color: #2a3b4d !important; /* a darker bluish tone */
    color: #90caf9 !important;
}
</style>
