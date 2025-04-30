import api from './api'

export default {
    getAllUsers(query = '') {
        return api.get(`/users/${query}`)
    },

    getUser(userId) {
        return api.get(`/users/${userId}`)
    },

    updateUser(updatedData) {
        return api.patch('/users', updatedData)
    },

    deleteUser(userId) {
        return api.delete(`/users/${userId}`)
    },

    getCurrentUser() {
        return api.get('/users/me/user')
    },

    updateAvatar(file) {
        const formData = new FormData()
        formData.append('file', file)

        return api.put('/users/me/avatar', formData)
    },
}
