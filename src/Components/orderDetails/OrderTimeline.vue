<template>
    <v-card class="pa-4" elevation="1">
        <v-card-title class="text-h6 font-weight-bold">Order Timeline</v-card-title>
        <v-card-text>
            <v-timeline direction="horizontal" dense>
                <v-timeline-item
                    v-for="(step, index) in steps"
                    :key="index"
                    :dot-color="index <= currentStepIndex ? 'primary' : 'grey'"
                    :icon="step.icon"
                    fill-dot
                >
                    <template #default>
                        <span :class="index <= currentStepIndex ? 'text-primary' : 'text-grey'">
                            {{ step.label }}
                        </span>
                    </template>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { computed } from 'vue'

const orderStore = useOrderStore()

const steps = [
    { label: 'Placed', icon: 'mdi-cart' },
    { label: 'Processing', icon: 'mdi-cogs' },
    { label: 'Shipped', icon: 'mdi-truck' },
    { label: 'Delivered', icon: 'mdi-home-check' },
]

const statusOrder = ['placed', 'processing', 'shipped', 'delivered']

const currentStepIndex = computed(() => {
    return statusOrder.indexOf(orderStore.selectedOrder.orderStatus)
})
</script>
