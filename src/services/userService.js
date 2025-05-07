import api from './api'

export default {
    getAllUsers(query = '') {
        return api.get(`/users?${query}`)
    },

    getUser(userId) {
        return api.get(`/users/${userId}`)
    },
    createUser(newUser) {
        return api.post(`/users`, newUser)
    },
    updateUser(userId, updatedData) {
        return api.patch(`/users/${userId}`, updatedData)
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
