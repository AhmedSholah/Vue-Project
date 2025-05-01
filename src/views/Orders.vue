<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { onMounted } from 'vue'
const ordersStore = useOrderStore()

onMounted(async () => {
    await ordersStore.fetchAdminOrders()
    console.log(ordersStore.allOrders)
})
</script>
<template></template>
