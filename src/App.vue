<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
    userStore.fetchCurrentUser()
})
</script>

<template>
    <v-app>
        <v-theme-provider with-background>
            <router-view />
        </v-theme-provider>
    </v-app>
</template>

<style></style>
