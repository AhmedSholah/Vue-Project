<template>
    <v-card class="pa-3 kpi-card border-sm" rounded="xlg" :color="color" elevation="0">
        <v-row align="center" justify="space-between" class="no-wrap-row">
            <v-col cols="auto" class="d-flex align-center title-col">
                <div class="text-cardTitle kpi-title font-medium">
                    {{ title }}
                </div>
            </v-col>
            <v-col cols="auto" class="d-flex align-center text-iconColor">
                <v-icon size="32">{{ icon }}</v-icon>
            </v-col>
        </v-row>

        <div class="mt-2 kpi-value font-bold text-cardValue">
            {{ value }}
        </div>
    </v-card>
</template>

<script setup>
const props = defineProps({
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    icon: { type: String, default: 'mdi-chart-bar' },
    color: { type: String, default: 'primary' },
})
</script>

<style scoped>
.kpi-card {
    background-color: var(--v-theme-card-bg) !important;
    border: 1px solid var(--v-theme-cardBorder);
    box-shadow: none;
    border-radius: 12px;
}

.kpi-title {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.kpi-value {
    color: var(--v-theme-number-color);
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
