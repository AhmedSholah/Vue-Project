<template>
    <div class="label-wrapper" v-if="label">
        <!-- <span class="label-text">{{ label }}</span> -->
        <span v-if="required" class="required-asterisk">*</span>
    </div>
    <v-textarea
        v-model="fieldValue"
        :label="label"
        :placeholder="placeholder"
        :variant="variant"
        :density="density"
        :auto-grow="autoGrow"
        :rows="rows"
        :color="color"
        :error="!!errorMessage"
        :error-messages="errorMessage ? [errorMessage] : []"
        :hide-details="!errorMessage ? 'auto' : false"
        :class="customClass"
        :outlined="variant === 'outlined'"
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
    variant: { type: String, default: 'outlined' },
    density: { type: String, default: 'comfortable' },
    rows: { type: Number, default: 3 },
    autoGrow: { type: Boolean, default: true },
    color: { type: String, default: '#95C2FF' },
    customClass: { type: String, default: 'mb-5' },
    errorMessages: { type: Array, default: () => [] },
    required: { type: Boolean, default: false },
})

const { value, errorMessage } = useField(props.name)

const fieldValue = computed({
    get: () => value.value,
    set: (val) => (value.value = val),
})
</script>

<style scoped>
.v-textarea {
    font-size: 0.95rem;
    transition: all 0.2s ease-in-out;
}
.label-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    justify-content: flex-end;
}

.required-asterisk {
    color: red;
}
</style>
