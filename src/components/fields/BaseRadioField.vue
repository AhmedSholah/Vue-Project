<template>
    <v-radio-group
        v-model="fieldValue"
        :label="label"
        :inline="inline"
        :error-messages="errorMessage ? [errorMessage] : []"
        :hide-details="!errorMessage ? 'auto' : false"
        class="radio-group"
        style="color: var(--v-theme-headingColor)"
    >
        <v-radio
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            color="primary"
            class="radio-option"
        />
    </v-radio-group>
</template>

<script setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, default: '' },
    options: {
        type: Array,
        required: true,
        default: () => [],
    },
    inline: { type: Boolean, default: true },
})

const { value, errorMessage } = useField(props.name)

const fieldValue = computed({
    get: () => value.value,
    set: (val) => (value.value = val),
})
</script>
<style scoped>
.radio-group {
    margin-bottom: 24px;
    padding: 12px 16px;
    border-radius: 12px;
}

.radio-option {
    margin-bottom: 8px;
}

.v-label {
    font-weight: 600;
}
</style>
