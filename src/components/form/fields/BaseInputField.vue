<template>
    <div class="label-wrapper" v-if="label">
        <!-- <span class="label-text">{{ label }}</span> -->
        <span v-if="required" class="required-asterisk">*</span>
    </div>
    <v-text-field
        v-model="fieldValue"
        :label="label"
        :placeholder="placeholder"
        :type="inputType"
        :variant="variant"
        :density="density"
        :prepend-inner-icon="prependIcon"
        :append-inner-icon="appendInnerIcon"
        @click:append-inner="handleAppendClick"
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
    required: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
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
import { ref } from 'vue'

const showPassword = ref(false)

const inputType = computed(() => {
    if (props.type !== 'password') return props.type
    return showPassword.value ? 'text' : 'password'
})

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
}
const appendInnerIcon = computed(() => {
    if (props.type === 'password') return showPassword.value ? 'mdi-eye' : 'mdi-eye-off'
    return props.appendIcon
})

const handleAppendClick = () => {
    if (props.type === 'password') {
        togglePasswordVisibility()
    }
}
</script>

<style scoped>
.v-text-field {
    font-size: 0.95rem;
    transition: all 0.2s ease-in-out;
}
.label-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-weight: 500;
}

.required-asterisk {
    color: red;
}
</style>
