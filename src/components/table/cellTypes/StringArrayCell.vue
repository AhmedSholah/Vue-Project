<script setup>
const props = defineProps({
    value: { type: Array, required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})
</script>
<template>
    <p>
        <span v-if="!value.length">No {{ colName }}</span>
        <span v-for="(item, index) in value.slice(0, 2)" :key="rowIdentifier + item"
            >{{ index ? ', ' : '' }}{{ item.charAt(0).toUpperCase() + item.slice(1) }}</span
        >
        <span v-if="value.length > 2">, +{{ value.length - 2 }} More</span>
    </p>
</template>
