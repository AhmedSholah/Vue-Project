<script setup>
import { ref } from 'vue'
import SideBar from '../Components/SideBar.vue'
import NavBar from '../Components/NavBar.vue'

const drawer = ref(true) // default open
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
