<script setup>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'

import { ref } from 'vue'

const drawer = ref(window.innerWidth > 1280)
</script>

<template>
    <v-app id="inspire">
        <SideBar :drawer="drawer" />
        <v-main>
            <NavBar @toggle-drawer="drawer = !drawer" />
            <router-view />
        </v-main>
    </v-app>
</template>
