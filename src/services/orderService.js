import api from './api'

export default {
    getAllOrdersAdmin(queryString = '') {
        return api.get(`/orders/admin?${queryString}`)
    },
    getOrder(orderId) {
        return api.get(`/orders/${orderId}`)
    },
    getAllUserOrders() {
        return api.get('/orders')
    },
    createOrder(orderData) {
        return api.post('/orders', orderData)
    },
    updateOrderStatus(orderId, newStatus) {
        return api.patch(`/orders/${orderId}`, newStatus)
    },
}
