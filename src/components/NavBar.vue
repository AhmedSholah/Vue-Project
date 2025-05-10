<script setup>
import { computed, onMounted, ref, watch } from 'vue' // Added watch
import { useTheme } from 'vuetify'
import { useRoute } from 'vue-router'

const emit = defineEmits(['toggle-drawer'])

const theme = useTheme()
const route = useRoute()

const isDarkMode = ref(false)

onMounted(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
        isDarkMode.value = true
        theme.global.name.value = 'myCustomDarkTheme'
    } else {
        isDarkMode.value = false
        theme.global.name.value = 'myCustomLightTheme'
        if (!storedTheme) {
            localStorage.setItem('theme', 'light')
        }
    }
})

watch(isDarkMode, (newValue) => {
    if (newValue) {
        theme.global.name.value = 'myCustomDarkTheme'
        localStorage.setItem('theme', 'dark')
    } else {
        theme.global.name.value = 'myCustomLightTheme'
        localStorage.setItem('theme', 'light')
    }
})

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

        <v-switch v-model="isDarkMode" class="mt-5 mr-1" />

        <v-btn class="mr-" icon to="/settings/store" router>
            <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn icon to="/users" router>
            <v-icon>mdi-account-circle</v-icon>
        </v-btn>
    </v-app-bar>
</template>
