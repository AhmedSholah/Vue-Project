import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import productService from '@/services/productService'

export const useProductStore = defineStore('productStore', () => {
    const products = reactive([])
    const totalProducts = ref(null)
    const product = reactive({})
    const loading = ref(false)
    const error = ref(null)

    const fetchProducts = async (query = '') => {
        loading.value = true
        error.value = null
        try {
            const res = await productService.getAllProducts(query)
            products.length = 0
            products.push(...res.data.data.products)
            totalProducts.value = res.data.data.totalProducts
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const fetchProduct = async (id) => {
        loading.value = true
        error.value = null
        try {
            const res = await productService.getProductById(id)
            Object.assign(product, res.data.data.product)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const createProduct = async (data) => {
        error.value = null
        try {
            const res = await productService.createProduct(data)
            await fetchProducts()
            return res.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
            throw err
        }
    }

    const updateProduct = async (id, data) => {
        try {
            await productService.updateProduct(id, data)
            await fetchProducts()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        }
    }

    const deleteProduct = async (id) => {
        try {
            await productService.deleteProduct(id)
            await fetchProducts()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        }
    }

    const uploadProductImage = async (id, file) => {
        try {
            await productService.uploadImage(id, file)
            await fetchProduct(id)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        }
    }

    const deleteProductImage = async (id, index) => {
        try {
            await productService.deleteImage(id, index)
            await fetchProduct(id)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        }
    }

    return {
        products,
        product,
        loading,
        totalProducts,
        error,
        fetchProducts,
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        deleteProductImage,
    }
})
