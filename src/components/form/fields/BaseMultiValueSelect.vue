<template>
    <v-combobox
        v-model="fieldValue"
        :label="label"
        :placeholder="placeholder"
        :items="items"
        item-title="label"
        item-value="value"
        multiple
        chips
        closable-chips
        clearable
        variant="outlined"
        density="comfortable"
        color="#95C2FF"
        :error-messages="errorMessage ? [errorMessage] : []"
        :hide-details="!errorMessage ? 'auto' : false"
        class="mb-5"
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
    items: { type: Array, default: () => [] },
    errorMessages: { type: Array, default: () => [] },
})

const { value, errorMessage } = useField(props.name)

const fieldValue = computed({
    get: () => {
        if (
            Array.isArray(value.value) &&
            typeof value.value[0] === 'string' &&
            typeof props.items[0] === 'object'
        ) {
            return value.value
                .map((id) => props.items.find((item) => item.value === id))
                .filter(Boolean)
        }
        return value.value
    },
    set: (val) => {
        if (Array.isArray(val)) {
            if (typeof val[0] === 'object') {
                value.value = val.map((item) => item.value)
            } else {
                value.value = val
            }
        } else {
            value.value = val
        }
    },
})
</script>
<style scoped>
.v-combobox {
    font-size: 0.95rem;
    transition: all 0.2s ease-in-out;
}

:deep(.v-chip) {
    border-radius: 16px;
    font-weight: 500;
    padding: 8px 16px;
    font-size: 1rem;
}
:deep(.v-chip__close) {
}
:deep(.v-chip__content) {
    font-size: 0.8rem;
}
:deep(.v-chip__underlay) {
    padding: 8px 16px;
}
</style>
