<script setup>
import SettingsNavBar from '../components/SettingsNavBar.vue'
</script>

<template>
    <div class="d-flex flex-column px-8 ga-8">
        <SettingsNavBar />
        <br />
        <router-view />
    </div>
</template>
