<script setup>
const props = defineProps({
    value: { type: String, required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})

console.log(props.value)
</script>
<template>
    <v-img :width="40" :aspect-ratio="1 / 1" cover :src="value" class="rounded"> </v-img>
</template>
