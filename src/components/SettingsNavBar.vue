<template>
    <v-card class="d-flex pa-4" style="border-radius: 16px; margin-right: 100px">
        <router-link
            v-for="(link, index) in links"
            :key="index"
            :to="link.to"
            class="text-decoration-none mr-4 px-4 py-2 d-flex align-center"
            :class="{
                'bg-primary white--text': $route.path === link.to,
                'text-primary hover-primary': $route.path !== link.to,
            }"
            style="border-radius: 16px; height: 56px; transition: all 0.3s ease"
        >
            {{ link.text }}
        </router-link>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'

const links = [
    { to: '/settings/store', text: 'Store Settings' },
    { to: '/settings/roles', text: 'Role Management' },
    { to: '/settings/categories', text: 'Categories Management' },
]
</script>
