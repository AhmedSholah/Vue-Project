<script setup>
import { ref, computed } from 'vue'
import { useSettingsStore } from '../stores/storeSettings'
import { useDisplay } from 'vuetify'

const drawer = defineModel()

const rail = ref(true)
const store = useSettingsStore()
console.log(store.settings)

const links = [
    { text: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
    { text: 'Products', to: '/products', icon: 'mdi-shopping' },
    { text: 'Orders', to: '/orders', icon: 'mdi-cart' },
    { text: 'Users', to: '/users', icon: 'mdi-account-multiple' },
    { text: 'Settings', to: '/settings/store', icon: 'mdi-cog' },
]

const { mdAndDown } = useDisplay()

const isMobile = computed(() => mdAndDown.value)
const drawerProps = computed(() => ({
    modelValue: drawer.value,
    temporary: isMobile.value,
    rail: !isMobile.value && rail.value,
    permanent: !isMobile.value,
}))
</script>

<template>
    <v-navigation-drawer v-model="drawer" v-bind="drawerProps" @click="!isMobile && (rail = false)">
        <v-list>
            <v-list-item prepend-avatar="user-setting.png" title="Dashboard">
                <template v-slot:append>
                    <v-btn
                        icon="mdi-chevron-left"
                        variant="text"
                        v-if="!isMobile"
                        @click.stop="rail = !rail"
                    ></v-btn>
                </template>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item
                color="primary"
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
