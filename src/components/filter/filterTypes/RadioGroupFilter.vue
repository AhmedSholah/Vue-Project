<script setup>
import { ref, watch } from 'vue'

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
    <v-radio-group :label="label" @update:model-value="changeValue">
        <v-radio
            v-for="item in options.items"
            :label="item.label"
            :value="item.value"
            color="primary"
        ></v-radio>
    </v-radio-group>
</template>
