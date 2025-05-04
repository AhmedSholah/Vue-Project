<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => {
    theme.global.name.value =
        theme.global.name.value === 'myCustomLightTheme'
            ? 'myCustomDarkTheme'
            : 'myCustomLightTheme'
}
</script>

<template>
    <v-app class="bg-error">
        <v-theme-provider with-background>
            <v-switch @click="toggleTheme"></v-switch>

            <router-view />
        </v-theme-provider>
    </v-app>
</template>

<style></style>
