<template>
    <v-radio-group
        v-model="fieldValue"
        :label="label"
        :inline="inline"
        :error-messages="errorMessage ? [errorMessage] : []"
        :hide-details="!errorMessage ? 'auto' : false"
        class="radio-group"
    >
        <v-radio
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
            color="blue"
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
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background-color: #fafafa;
}

.radio-option {
    margin-bottom: 8px;
}

.v-label {
    font-weight: 600;
    color: blue !important;
}
</style>
