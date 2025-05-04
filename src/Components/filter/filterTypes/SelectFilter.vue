<script setup>
const props = defineProps({
    modelValue: { type: String },
    label: {
        type: String,
    },
    options: { type: Object },
})

const emit = defineEmits(['update:modelValue'])

function changeValue(value) {
    emit('update:modelValue', value)
}
</script>
<template>
    <v-select
        :label="label"
        :items="options.items"
        variant="outlined"
        @update:model-value="changeValue"
    ></v-select>
</template>
