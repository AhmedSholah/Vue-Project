<script setup>
/**
 * This cell takes an object and displays a primitive valued key from within that object
 * This is useful for properties like seller or category where the backend returns them as objects
 * and all we need is the value of a single key from within that object
 *
 * Options:
 * - key: String
 * a string of the name of the key of the property that you want displayed in the table
 */
const props = defineProps({
    value: { type: Object, required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})
</script>
<template>
    <span>{{ value[options.key] }}</span>
</template>
