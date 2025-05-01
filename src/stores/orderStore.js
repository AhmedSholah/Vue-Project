import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import orderService from '@/services/orderService'

export const useOrderStore = defineStore('orderStore', () => {
    const orderState = reactive({
        userOrders: [],
        allOrders: [],
        selectedOrder: null,
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
            orderState.selectedOrder = res.data.data
            console.log(orderState)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
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
    }
})
