<template>
    <v-card class="px-5 py-5 mb-5" style="border-radius: 16px; margin-right: 100px" elevation="3">
        <div class="mb-5" style="font-size: 34px">Add new category</div>
        <v-form @submit.prevent="submit">
            <v-text-field
                class="mb-5"
                variant="outlined"
                label="Category Name"
                :loading="loading"
                :disabled="loading"
                v-model="categoryName.value.value"
                :error-messages="categoryName.errorMessage.value"
                prepend-inner-icon="mdi mdi-alphabetical"
                required
            ></v-text-field>

            <v-btn
                class="mt-5"
                style="float: right; height: 56px"
                variant="elevated"
                color="primary"
                type="submit"
                :loading="loading"
            >
                Save
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { useCategoryStore } from '@/stores/categoryStore'

const router = useRouter()
const categoryStore = useCategoryStore()

const loading = ref(false)

const { handleSubmit } = useForm({
    validationSchema: {
        categoryName(value) {
            if (!value) return 'Category name is required'
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                return 'Category name must contain only letters and spaces'
            }
            return true
        },
    },
})

const categoryName = useField('categoryName')

const submit = handleSubmit(async (values) => {
    loading.value = true
    const newCategory = {
        name: values.categoryName,
    }
    await categoryStore.addCategory(newCategory)
    if (categoryStore.error) {
        console.log(categoryStore.error)
        return
    }
    router.push('/settings/categories')
})
</script>
