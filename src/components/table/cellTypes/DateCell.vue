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
    <span style="width: 190px">{{
        new Date(value).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })
    }}</span>
</template>
