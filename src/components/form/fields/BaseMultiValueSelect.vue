<template>
    <div class="label-wrapper" v-if="label">
        <!-- <span class="label-text">{{ label }}</span> -->
        <span v-if="required" class="required-asterisk">*</span>
    </div>
    <v-select
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
    required: { type: Boolean, default: false },
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
:deep(.v-select .v-chip) {
    border-radius: 16px;
    font-weight: 500;
    padding: 8px 16px;
    font-size: 0.85rem;
    background-color: var(--v-theme-primary);
    color: var(--v-theme-on-primary);
}

:deep(.v-select .v-chip__close) {
    color: var(--v-theme-on-primary);
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
