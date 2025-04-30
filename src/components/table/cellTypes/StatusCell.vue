<script setup>
defineProps({
    value: { type: [String, Number], required: true },
    options: { type: Object, default: () => ({}) },
    item: { type: Object, required: true },
    colName: { type: [String, Number], required: true },
    rowIdentifier: { type: [String, Number], required: true },
})
</script>
<template>
    <v-chip :color="options.variant[value]"
        ><v-icon icon="mdi-circle-medium" start></v-icon>{{ value }}</v-chip
    >
</template>
