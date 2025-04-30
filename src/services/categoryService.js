import api from './api'
export default {
    getAllCategories(queryString = '') {
        return api.get(`/categories?${queryString}`)
    },
    addCategory(newCategory) {
        return api.post('/categories', newCategory)
    },
    deleteCategory(categoryId) {
        return api.delete(`/categories/${categoryId}`)
    },
    updateCategoryImage(categoryId, file) {
        const formData = new FormData()
        formData.append('file', file)

        return api.put(`/categories/${categoryId}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}
