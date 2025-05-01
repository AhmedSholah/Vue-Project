import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import orderService from '@/services/orderService'

export const useOrderStore = defineStore('orderStore', () => {
    const orderState = reactive({
        userOrders: [],
        allOrders: [],
        selectedOrder: null,
    })

    const loading = ref(false)
    const error = ref(null)

    const fetchUserOrders = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await orderService.getAllUserOrders()
            orderState.userOrders = res.data.data.orders
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const fetchAdminOrders = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await orderService.getAllOrdersAdmin()
            console.log(res.data)
            orderState.allOrders = res.data.data
            console.log(orderState.allOrders)
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
