<script setup>
const props = defineProps({
    value: { type: String, required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})
</script>
<template>
    <v-img :width="100" :aspect-ratio="1 / 1" cover :src="value"> </v-img>
</template>
