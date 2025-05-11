<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: { type: Array },
    label: {
        type: String,
    },
    options: { type: Object },
})

const emit = defineEmits(['update:modelValue'])

const initialValue = ref([0, 0])

props.options?.initialValue[0] ? (initialValue.value[0] = props.options?.initialValue[0]) : 0
props.options?.initialValue[1] ? (initialValue.value[1] = props.options?.initialValue[1]) : 0

function changeValue(value) {
    initialValue.value = value
    emit('update:modelValue', value)
}

watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal) initialValue.value = newVal
    },
)
</script>
<template>
    <v-label>{{ label }}</v-label>
    <v-range-slider
        @update:model-value="changeValue"
        :model-value="initialValue"
        step="1"
        thumb-label
        strict
        :max="options.max"
        :min="options.min"
        color="primary"
        class="mt-2"
    ></v-range-slider>
</template>
