<template>
    <v-card class="d-flex pa-4" style="border-radius: 16px">
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
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const links = computed(() => [
    ...(userStore.hasPermission('view_store_settings')
        ? [{ to: '/settings/store', text: 'Store Settings' }]
        : []),
    ...(userStore.hasPermission('view_roles')
        ? [{ to: '/settings/roles', text: 'Role Management' }]
        : []),
    ...(userStore.hasPermission('view_categories')
        ? [{ to: '/settings/categories', text: 'Categories Management' }]
        : []),
])
</script>
