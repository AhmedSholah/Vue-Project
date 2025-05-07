<template>
    <v-select
        v-model="fieldValue"
        :label="label"
        :placeholder="placeholder"
        :items="items"
        item-title="label"
        item-value="value"
        :variant="variant"
        :density="density"
        :color="color"
        :error-messages="errorMessage ? [errorMessage] : []"
        :hide-details="!errorMessage ? 'auto' : false"
        :class="customClass"
        :menu-props="{ offsetY: true }"
        clearable
        :rules="[]"
        :error="!!errorMessage"
    />
</template>

<script setup>
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    items: {
        type: Array,
        default: () => [],
    },
    variant: { type: String, default: 'outlined' },
    density: { type: String, default: 'comfortable' },
    color: { type: String, default: '#95C2FF' },
    customClass: { type: String, default: 'mb-5' },
    errorMessages: { type: Array, default: () => [] },
})

const { value, errorMessage } = useField(props.name)

const fieldValue = computed({
    get: () => value.value,
    set: (val) => (value.value = val),
})
</script>

<style scoped>
.v-select {
    font-size: 0.95rem;
    transition: all 0.2s ease-in-out;
}
</style>
