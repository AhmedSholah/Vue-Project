<script setup>
/**
 * Options here does nothing
 */
defineProps({
    value: { type: [String, Number], required: true },
    options: { type: Object, default: () => ({}) },
    item: { type: Object, required: true },
    colName: { type: [String, Number], required: true },
    rowIdentifier: { type: [String, Number], required: true },
})
</script>

<template>
    <span>{{ value }}</span>
</template>
