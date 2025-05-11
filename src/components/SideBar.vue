<script setup>
// defineProps(['drawer'])
import { ref, onMounted, computed } from 'vue'
import { useSettingsStore } from '../stores/storeSettings'
const settingsStore = useSettingsStore()
import { useDisplay } from 'vuetify'

const drawer = defineModel()

const rail = ref(true)

import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const links = computed(() => [
    { text: 'Dashboard', to: '/', icon: 'mdi-view-dashboard' },
    { text: 'Products', to: '/products', icon: 'mdi-shopping' },
    ...(userStore.hasPermission('view_all_user_orders')
        ? [{ text: 'Orders', to: '/orders', icon: 'mdi-cart' }]
        : []),
    { text: 'Users', to: '/users', icon: 'mdi-account-multiple' },
    { text: 'Settings', to: '/settings/store', icon: 'mdi-cog' },
])

const { mdAndDown } = useDisplay()

const isMobile = computed(() => mdAndDown.value)
const drawerProps = computed(() => ({
    modelValue: drawer.value,
    temporary: isMobile.value,
    rail: !isMobile.value && rail.value,
    permanent: !isMobile.value,
}))

onMounted(async () => {
    await userStore.fetchCurrentUser()
    await settingsStore.fetchSettings()
})
</script>

<template>
    <v-navigation-drawer v-model="drawer" v-bind="drawerProps" @click="!isMobile && (rail = false)">
        <v-list>
            <v-list-item
                prepend-avatar="user-setting.png"
                :title="settingsStore.settings.storeName"
            >
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
