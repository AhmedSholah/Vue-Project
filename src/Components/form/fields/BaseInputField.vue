<template>
    <v-text-field
        v-model="fieldValue"
        :label="label"
        :placeholder="placeholder"
        :type="type"
        :variant="variant"
        :density="density"
        :append-inner-icon="appendIcon"
        :prepend-inner-icon="prependIcon"
        :color="color"
        :error="!!mergedErrorMessages.length"
        :error-messages="mergedErrorMessages"
        :hide-details="!mergedErrorMessages.length ? 'auto' : false"
        :class="customClass"
        clearable
        :rules="[]"
    />
</template>

<script setup>
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    variant: { type: String, default: 'outlined' },
    density: { type: String, default: 'comfortable' },
    appendIcon: { type: String, default: '' },
    prependIcon: { type: String, default: '' },
    color: { type: String, default: '#95C2FF' },
    customClass: { type: String, default: 'mb-5' },
    errorMessages: { type: Array, default: () => [] },
})

const { value, errorMessage } = useField(props.name)

const fieldValue = computed({
    get: () => value.value,
    set: (val) => (value.value = val),
})

const mergedErrorMessages = computed(() =>
    props.errorMessages.length
        ? props.errorMessages
        : errorMessage.value
          ? [errorMessage.value]
          : [],
)
</script>

<style scoped>
.v-text-field {
    font-size: 0.95rem;
    transition: all 0.2s ease-in-out;
}
</style>
