import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import orderService from '@/services/orderService'
import { useFormStore } from './formStore'
import { formatErrorMessage } from '@/utils/errorMessageFormat'

export const useOrderStore = defineStore('orderStore', () => {
    const orderState = reactive({
        userOrders: [],
        allOrders: [],
        selectedOrder: {},
        totalOrders: null,
    })

    const loading = ref(false)
    const error = ref(null)

    const fetchUserOrders = async (query) => {
        loading.value = true
        error.value = null
        try {
            const res = await orderService.getAllUserOrders(query)
            orderState.userOrders = res.data.data.orders
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const fetchAdminOrders = async (query) => {
        loading.value = true
        error.value = null
        try {
            const res = await orderService.getAllOrdersAdmin(query)
            orderState.allOrders = res.data.data
            orderState.totalOrders = res.data.totalOrders
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const fetchOrder = async (orderId) => {
        loading.value = true
        error.value = null
        try {
            const res = await orderService.getOrder(orderId)
            // orderState.selectedOrder = res.data.data
            Object.assign(orderState.selectedOrder, res.data.data)
            return res.data.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const createOrder = async (orderData) => {
        loading.value = true
        error.value = null
        try {
            const res = await orderService.createOrder(orderData)
            await fetchAdminOrders()
            return res.data.data
        } catch (err) {
            const rawMsg = err.response?.data?.message || err.message
            const userMsg = formatErrorMessage(rawMsg)
            error.value = userMsg
            throw new Error(userMsg)
        } finally {
            loading.value = false
        }
    }

    const updateOrder = async (orderId, data) => {
        loading.value = true
        error.value = null
        try {
            const res = await orderService.updateOrder(orderId, data)
            await fetchOrder(orderId)
            // orderState.selectedOrder = res.data.data
        } catch (err) {
            const rawMsg = err.response?.data?.message || err.message
            const userMsg = formatErrorMessage(rawMsg)
            error.value = userMsg
            throw new Error(userMsg)
        } finally {
            loading.value = false
        }
    }
    return {
        ...toRefs(orderState),
        loading,
        error,
        fetchUserOrders,
        fetchAdminOrders,
        fetchOrder,
        createOrder,
        updateOrder,
    }
})
