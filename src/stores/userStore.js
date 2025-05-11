import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'
import userService from '@/services/userService'
import { formatErrorMessage } from '@/utils/errorMessageFormat'

export const useUserStore = defineStore('userStore', () => {
    const state = reactive({
        users: [],
        currentUser: null,
        selectedUser: {},
        totalUsers: null,
    })

    const loading = ref(false)
    const error = ref(null)

    const fetchUsers = async (query) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.getAllUsers(query)
            state.users.length = 0
            state.users.push(...res.data.data.users)
            state.totalUsers = res.data.totalUsers
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const fetchUser = async (userId) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.getUser(userId)
            // state.selectedUser = res.data.data.user
            Object.assign(state.selectedUser, res.data.data.user)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const createUser = async (newUser) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.createUser(newUser)
            await fetchUsers()
            return res.data.data
        } catch (err) {
            // const msg =
            //     err.response?.data?.message || err.message || 'Unexpected error.Please try again.'
            // error.value = msg
            // throw new Error(msg)
            const rawMsg = err.response?.data?.message || err.message
            const userMsg = formatErrorMessage(rawMsg)
            error.value = userMsg
            throw new Error(userMsg)
        } finally {
            loading.value = false
        }
    }

    const fetchCurrentUser = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.getCurrentUser()
            state.currentUser = res.data.data
        } catch (err) {
            const rawMsg = err.response?.data?.message || err.message
            const userMsg = formatErrorMessage(rawMsg)
            error.value = userMsg
            throw new Error(userMsg)
        } finally {
            loading.value = false
        }
    }

    const updateUser = async (userId, data) => {
        loading.value = true
        error.value = null
        try {
            const res = await userService.updateUser(userId, data)
            await fetchUser(userId)
            // Object.assign(state.selectedUser, res.data.data)
            return res.data.data
        } catch (err) {
            const msg =
                err.response?.data?.message || err.message || 'Unexpected error.Please try again.'
            error.value = msg
            throw new Error(msg)
        } finally {
            loading.value = false
        }
    }

    const deleteUser = async (userId) => {
        loading.value = true
        error.value = null
        try {
            await userService.deleteUser(userId)
            await fetchUsers()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const updateCurrentUserAvatar = async (file) => {
        loading.value = true
        error.value = null
        try {
            await userService.updateCurrentUserAvatar(file)
            // await fetchCurrentUser()
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const updateUserAvatar = async (userId, file) => {
        loading.value = true
        error.value = null
        try {
            await userService.updateUserAvatar(userId, file)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    const deleteUserAvatar = async (userId) => {
        loading.value = true
        error.value = null
        try {
            await userService.deleteUserAvatar(userId)
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            loading.value = false
        }
    }

    // const hasPermission = (permissionName) => {
    //     const user = state.currentUser?.currentUser
    //     console.log(user)

    //     if (!user || !Array.isArray(user.permissions)) {
    //         return false
    //     }

    //     return user.permissions.some((permission) => permission.code === permissionName)
    // }
    const hasPermission = (permissionCode) => {
        const user = state.currentUser?.currentUser
        if (!user) return false

        const directPermissions = Array.isArray(user.permissions) ? user.permissions : []
        const rolePermissions = Array.isArray(user.role?.permissions) ? user.role.permissions : []

        const allPermissions = [...directPermissions, ...rolePermissions]

        return allPermissions.some((permission) => permission.code === permissionCode)
    }

    return {
        ...toRefs(state),
        loading,
        error,
        fetchUsers,
        fetchUser,
        fetchCurrentUser,
        updateUser,
        deleteUser,
        updateCurrentUserAvatar,
        updateUserAvatar,
        deleteUserAvatar,
        createUser,
        hasPermission,
    }
})
