<script setup>
const props = defineProps({
    value: { type: [String, Number], required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})
</script>
<template>
    <v-chip color="orange" prepend-icon="mdi-star" variant="outlined">
        {{ Number(value).toFixed(2) }}
    </v-chip>
</template>
