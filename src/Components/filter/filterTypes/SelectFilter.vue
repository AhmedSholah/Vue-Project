<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
    modelValue: { type: String },
    label: {
        type: String,
    },
    options: { type: Object },
})

const emit = defineEmits(['update:modelValue'])

const initialValue = ref(props.options?.initialValue ? props.options?.initialValue : undefined)

function changeValue(value) {
    initialValue.value = value
    emit('update:modelValue', value)
}

watch(
    () => props.modelValue,
    (newVal) => {
        initialValue.value = newVal
    },
)
</script>
<template>
    <v-select
        :label="label"
        :items="options.items"
        item-title="title"
        item-value="value"
        variant="outlined"
        :model-value="initialValue"
        @update:model-value="changeValue"
    />
</template>
