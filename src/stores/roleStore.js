import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import roleService from '@/services/roleService'

export const useRoleStore = defineStore('role', () => {
    const state = reactive({
        roles: [],
        loading: false,
        error: null,
    })

    const fetchRoles = async () => {
        state.loading = true
        state.error = null
        try {
            const res = await roleService.getAllRoles()
            state.roles = res.data.data.roles
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to fetch roles.'
        } finally {
            state.loading = false
        }
    }

    const addRole = async (roleData) => {
        const tempId = Date.now().toString()
        const tempRole = { _id: tempId, ...roleData }

        state.roles.push(tempRole)

        try {
            const res = await roleService.createRole(roleData)

            const index = state.roles.findIndex((r) => r._id === tempId)
            if (index !== -1) {
                state.roles[index] = res.data.data.role
            }
        } catch (err) {
            state.roles = state.roles.filter((r) => r._id !== tempId)
            state.error = err.response?.data?.message || 'Failed to add role.'
        }
    }

    const updateRole = async (roleId, roleData) => {
        try {
            await roleService.updateRole(roleId, roleData)
            await fetchRoles()
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to update role.'
        }
    }

    const deleteRole = async (roleId) => {
        const oldRoles = [...state.roles]
        state.roles = state.roles.filter((r) => r._id !== roleId)

        try {
            await roleService.deleteRole(roleId)
        } catch (err) {
            state.roles = oldRoles
            state.error = err.response?.data?.message || 'Failed to delete role.'
        }
    }

    return {
        ...toRefs(state),
        fetchRoles,
        addRole,
        updateRole,
        deleteRole,
    }
})
