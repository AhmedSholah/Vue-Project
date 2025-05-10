<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: { type: String },
    label: {
        type: String,
    },
    options: { type: Object },
})

function changeValue(value) {
    emit('update:modelValue', value)
}

const emit = defineEmits(['update:modelValue'])

const dateValue = ref(props.modelValue)
</script>

<template>
    <v-sheet class="mb-6">
        <v-text-field
            v-model="dateValue"
            :label="label"
            type="date"
            variant="outlined"
            hide-details
            density="comfortable"
            @update:model-value="changeValue"
        />
    </v-sheet>
</template>
