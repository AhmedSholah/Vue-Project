<script setup>
const props = defineProps({
    modelValue: { type: Boolean },
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
    <v-checkbox :label="label" @update:model-value="changeValue"></v-checkbox>
</template>
