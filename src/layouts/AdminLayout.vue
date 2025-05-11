<script setup>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'

import { ref } from 'vue'
const drawer = ref(true)
</script>

<template>
    <v-app id="inspire">
        <v-container class="pa-4">
            <SideBar v-model="drawer" />
        </v-container>
        <v-main>
            <NavBar @toggle-drawer="drawer = !drawer" />
            <router-view />
        </v-main>
    </v-app>
</template>
