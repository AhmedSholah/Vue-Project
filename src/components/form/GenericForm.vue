<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BaseInputField from './fields/BaseInputField.vue'
import BaseTextAreaField from './fields/BaseTextAreaField.vue'
import BaseSelectField from './fields/BaseSelectField.vue'
import BaseMultiValueSelect from './fields/BaseMultiValueSelect.vue'
import BaseRadioField from './fields/BaseRadioField.vue'
import { useSlots, computed, watch, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useToast } from 'vue-toastification'

const toast = useToast()
const submitLoading = ref(false)
const props = defineProps({
    title: String,
    fields: Array,
    schema: Object,
    loading: { type: Boolean, default: false },
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
        submitLoading.value = true
        try {
            if (props.mode === 'edit') {
                await props.updateHandler(props.id, payload)
                toast.success(`${props.title} updated successfully`)
            } else {
                await props.createHandler(payload)
                toast.success(`${props.title} added successfully`)
            }

            resetForm({ values: props.initialValues })
            emit('submitted', { success: true })
        } catch (error) {
            console.error('❌ Submit failed:', error)
            toast.error(
                error.message ||
                    `Failed to ${props.mode === 'edit' ? 'update' : 'add'} ${props.title}`,
            )
        } finally {
            submitLoading.value = false

        }
    },
    (err) => {
        toast.error('Please enter valid values.')
        console.warn('❌ Validation errors:', err)
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

const slots = useSlots()
const hasSidebar = computed(() => !!slots.sidebar)
const { mdAndUp } = useDisplay()
const buttonWidth = computed(() => (mdAndUp.value ? '30%' : '100%'))
</script>

<template>
    <v-container fluid class="form-container">
        <v-skeleton-loader
            v-if="props.loading && !submitLoading"
            class="mb-6"
            elevation="2"
            boilerplate
            width="100%"
        >
            <template #default>
                <v-container fluid>
                    <v-row no-gutters class="pa-6">
                        <v-col :cols="12" :md="hasSidebar ? 8 : 11">
                            <v-skeleton-loader type="heading" class="mb-4" width="40%" />

                            <v-skeleton-loader
                                v-for="i in 5"
                                :key="i"
                                type="text"
                                class="mb-4"
                                height="56"
                                width="100%"
                            />

                            <div class="d-flex justify-end mt-6">
                                <v-skeleton-loader type="button" width="30%" height="48" />
                            </div>
                        </v-col>

                        <v-col cols="12" md="4" v-if="hasSidebar">
                            <v-skeleton-loader
                                type="image"
                                width="100%"
                                height="200"
                                class="ml-md-6"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </template>
        </v-skeleton-loader>

        <v-form v-else @submit.prevent="submitForm">
            <v-row no-gutters class="pa-6" align="start">
                <v-col :cols="12" :md="hasSidebar ? 8 : 11" class="form-section">
                    <h3 class="text-h5 font-weight-bold mb-6 text-primary">
                        {{ mode === 'edit' ? 'Edit ' + title : 'Add ' + title }}
                    </h3>

                    <component
                        v-for="field in fields"
                        :is="getComponent(field.type)"
                        v-bind="field.props"
                        :key="field.props.name"
                        :error-messages="errors[field.props.name] ? [errors[field.props.name]] : []"
                        :required="field.required"
                    />

                    <slot name="orderItems" />

                    <div class="d-flex justify-end mt-6">
                        <v-btn
                            color="primary"
                            variant="flat"
                            class="submit-btn"
                            :loading="submitLoading"
                            type="submit"
                            height="48"
                            :style="{ width: buttonWidth }"
                        >
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
    background-color: var(--v-theme-surface);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    color: var(--v-theme-on-surface);
}

.form-section {
    padding: 24px;
    border-radius: 16px;
}

.sidebar-section {
    padding-left: 24px;
}

h3 {
    color: var(--v-theme-headingColor);
}

.submit-btn {
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: none;
    border-radius: 10px;
}
</style>
