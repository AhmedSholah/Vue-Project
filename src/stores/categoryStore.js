import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import categoryService from '@/services/categoryService'

export const useCategoryStore = defineStore('categoryStore', () => {
    const state = reactive({
        categories: [],
        loading: false,
        error: null,
    })

    const fetchCategories = async (query) => {
        state.loading = true
        state.error = null
        try {
            const response = await categoryService.getAllCategories(query)
            state.categories = response.data.data.categories
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to fetch categories.'
            throw err
        } finally {
            state.loading = false
        }
    }

    const addCategory = async (categoryData) => {
        state.loading = true
        state.error = null
        try {
            const response = await categoryService.addCategory(categoryData)
            state.categories.push(response.data.data.category)
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to add category.'
            throw err
        } finally {
            state.loading = false
        }
    }

    const updateCategory = async (categoryId, categoryData) => {
        state.loading = true
        state.error = null
        try {
            const response = await categoryService.updateCategory(categoryId, categoryData)
            const index = state.categories.findIndex((c) => c._id === categoryId)
            if (index !== -1) {
                state.categories[index] = response.data.data.category
            }
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to update category.'
            throw err
        } finally {
            state.loading = false
        }
    }

    const deleteCategory = async (categoryId) => {
        state.loading = true
        state.error = null
        try {
            await categoryService.deleteCategory(categoryId)
            state.categories = state.categories.filter((c) => c._id !== categoryId)
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to delete category.'
        } finally {
            state.loading = false
        }
    }
    // const updateCategoryImage = async (categoryId, file) => {
    //     try {
    //         const res = await categoryService.updateCategoryImage(categoryId, file)
    //         // Update the image URL if you want
    //         const index = categories.value.findIndex((c) => c._id === categoryId)
    //         if (index !== -1) {
    //             categories.value[index].imageUrl = res.data.imageUrl
    //         }
    //     } catch (err) {
    //         error.value = err.response?.data?.message || 'Something went wrong while updating image'
    //     }
    // }

    return {
        ...toRefs(state),
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        // updateCategoryImage,
    }
})
