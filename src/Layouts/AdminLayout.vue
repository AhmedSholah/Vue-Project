<script setup>
import SideBar from '../Components/SideBar.vue'
import NavBar from '../Components/NavBar.vue'
</script>

<template>
    <v-app>
        <v-layout>
            <side-bar />

            <v-main>
                <NavBar />
                <router-view />
            </v-main>
        </v-layout>
    </v-app>
</template>
