<script setup>
import { useForm, useFormContext } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseInputField from './fields/BaseInputField.vue'
import BaseTextAreaField from './fields/BaseTextAreaField.vue'
import BaseSelectField from './fields/BaseSelectField.vue'
import BaseMultiValueSelect from './fields/BaseMultiValueSelect.vue'
import BaseRadioField from './fields/BaseRadioField.vue'

const props = defineProps({
    title: String,
    fields: Array,
    schema: Object,
    initialValues: Object,
    mode: { type: String, default: 'add' },
    id: String,
    createHandler: Function,
    updateHandler: Function,
})

const emit = defineEmits(['submitted'])

const { handleSubmit, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(props.schema),
    initialValues: props.initialValues,
})

watch(
    () => props.initialValues,
    (newValues) => {
        resetForm({ values: newValues })
    },
    { deep: true, immediate: true },
)

const submitForm = handleSubmit(
    async (values) => {
        const payload = { ...values }
        console.log('values', values)

        if (props.mode === 'edit') {
            await props.updateHandler(props.id, payload)
            resetForm({ values: props.initialValues })
        } else {
            await props.createHandler(payload)
            resetForm({ values: props.initialValues })
        }

        emit('submitted', { success: true })
    },
    (err) => {
        console.log('❌ Validation errors:', err)
    },
)

function getComponent(type) {
    switch (type) {
        case 'input':
            return BaseInputField
        case 'textarea':
            return BaseTextAreaField
        case 'select':
            return BaseSelectField
        case 'multiselect':
            return BaseMultiValueSelect
        case 'radio':
            return BaseRadioField
        default:
            return BaseInputField
    }
}
import { useSlots, computed, watch } from 'vue'

const slots = useSlots()

const hasSidebar = computed(() => !!slots.sidebar)
</script>

<template>
    <v-container fluid class="form-container">
        <v-form @submit.prevent="submitForm">
            <v-row no-gutters class="pa-6" align="start">
                <v-col :cols="12" :md="hasSidebar ? 8 : 11" class="form-section">
                    <h3 class="text-h5 font-weight-bold mb-6">
                        {{ mode === 'edit' ? 'Edit ' + title : 'Add ' + title }}
                    </h3>

                    <component
                        v-for="field in fields"
                        :is="getComponent(field.type)"
                        v-bind="field.props"
                        :key="field.props.name"
                        :error-messages="errors[field.props.name] ? [errors[field.props.name]] : []"
                    />

                    <slot name="orderItems" />

                    <div class="d-flex justify-end mt-6">
                        <v-btn color="blue" variant="flat" class="submit-btn" type="submit">
                            {{ mode === 'edit' ? 'Update' : 'Add' }}
                        </v-btn>
                    </div>
                </v-col>

                <v-col cols="12" md="4" class="sidebar-section">
                    <slot name="sidebar" />
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<style scoped>
.form-container {
    max-width: 70%;
    margin: 40px auto;
    padding: 32px;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.form-section {
    padding: 24px;
    border-radius: 16px;
}

.sidebar-section {
    padding-left: 24px;
}

h3 {
    color: #1e293b;
}

.submit-btn {
    width: 30%;
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: none;
    border-radius: 10px;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #2563eb !important;
}
</style>
