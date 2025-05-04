<script setup>
import SideBar from '../components/SideBar.vue'
import NavBar from '../components/NavBar.vue'
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
