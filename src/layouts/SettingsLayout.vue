<script setup>
import SettingsNavBar from '../components/SettingsNavBar.vue'
</script>

<template>
    <div class="d-flex flex-column px-8 ga-4">
        <SettingsNavBar />
        <br />
        <router-view />
    </div>
</template>
