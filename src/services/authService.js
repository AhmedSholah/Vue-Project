import api from './api'

export default {
    register(credentials) {
        return api.post('/auth/register', credentials)
    },

    login(credentials) {
        return api.post('/auth/login', credentials)
    },

    loginWithGoogle() {
        window.location.href = `http://localhost:5173/auth/google`
    },

    googleCallback() {
        return api.get('/auth/google/callback')
    },
}
