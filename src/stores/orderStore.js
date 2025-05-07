import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import orderService from '@/services/orderService'
import { useFormStore } from './formStore'

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
            console.log(orderState.selectedOrder, 33333333333333333333333333333)
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
            return res.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }
    const updateOrder = async (orderId, data) => {
        try {
            const res = await orderService.updateOrder(orderId, data)
            await fetchOrder(orderId)
            console.log(useFormStore().initialValues, 6666666666)
            // orderState.selectedOrder = res.data.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
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
