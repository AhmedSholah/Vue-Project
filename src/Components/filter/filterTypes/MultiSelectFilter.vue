<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
    modelValue: { type: Array },
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
        multiple
        @update:model-value="changeValue"
    />
</template>
