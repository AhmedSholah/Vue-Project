<template>
    <v-card class="px-5 py-5 mb-5" style="border-radius: 16px; margin-right: 100px" elevation="3">
        <div class="mb-5" style="font-size: 34px">Category Information</div>
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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { useCategoryStore } from '@/stores/categoryStore'

const route = useRoute()
const router = useRouter()
const categoryId = route.params.id
const categoryStore = useCategoryStore()

const loading = ref(true)

const { handleSubmit } = useForm({
    validationSchema: {
        categoryName(value) {
            if (!value) return 'Category Name is required'
            if (!/^[a-zA-Z\s]+$/.test(value)) {
                return 'Category name must contain only letters and spaces'
            }
            return true
        },
    },
})

const categoryName = useField('categoryName')

onMounted(async () => {
    if (categoryStore.categories.length === 0) {
        await categoryStore.fetchCategories()
    }
    const category = categoryStore.categories.find((r) => r._id == categoryId)
    categoryName.value.value = category?.name
    loading.value = false
})

const submit = handleSubmit(async (values) => {
    loading.value = true
    const newCategory = {
        name: values.categoryName,
    }
    await categoryStore.updateCategory(categoryId, newCategory)
    if (categoryStore.error) {
        console.log(categoryStore.error)
    }
    router.push('/settings/categories')
})
</script>
