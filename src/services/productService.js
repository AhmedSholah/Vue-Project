import api from './api'
export default {
    getAllProducts(querString = '') {
        return api.get(`/products?${querString}`)
    },
    getProductById(productId) {
        return api.get(`/products/${productId}`)
    },
    createProduct(productData) {
        return api.post('/products', productData)
    },
    updateProduct(productId, updatedProduct) {
        return api.patch(`/products/${productId}`, updatedProduct)
    },
    deleteProduct(productId) {
        return api.delete(`/products/${productId}`)
    },
    uploadImage(productId, file) {
        const formData = new FormData()
        formData.append('file', file)
        return api.put(`/products/${productId}/image`, formData)
    },
    deleteImage(productId, imageIndex) {
        return api.delete(`/products/${productId}/image/${imageIndex}`)
    },
}
