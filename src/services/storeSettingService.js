import api from './api'

export default {
    getStoreSettings() {
        return api.get('/settings')
    },
    updateStoreSettings(updateData) {
        return api.patch('/settings', updateData)
    },
}
