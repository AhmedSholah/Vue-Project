<script setup>
import { useTheme } from 'vuetify'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const emit = defineEmits(['toggle-drawer'])

const theme = useTheme()
const toggleTheme = () => {
    theme.global.name.value =
        theme.global.name.value === 'myCustomLightTheme'
            ? 'myCustomDarkTheme'
            : 'myCustomLightTheme'
}

const route = useRoute()

const pageTitle = computed(() => {
    const path = route.path
    if (path === '/') return 'Dashboard'
    if (path.includes('products')) return 'Products'
    if (path.includes('orders')) return 'Orders'
    if (path.includes('users')) return 'Users'
    if (path.includes('settings')) return 'Settings'
    return 'Application'
})
</script>

<template>
    <v-app-bar elevation="0" class="border-b">
        <!-- <v-app-bar-nav-icon @click="emit('toggle-drawer')" /> -->

        <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>

        <v-spacer />

        <!-- <v-btn class="mr-" icon to="" router>
        <v-icon>theme-light-dark</v-icon>
    </v-btn> -->

        <v-switch @click="toggleTheme" class="mt-5 mr-1" />

        <v-btn class="mr-" icon to="/settings" router>
            <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn icon to="/users" router>
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </v-app-bar>
</template>
