import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import permissionService from '@/services/permissionService'

export const usePermissionStore = defineStore('permission', () => {
    const state = reactive({
        permissions: [],
        loading: false,
        error: null,
    })

    const addPermission = async (permissionData) => {
        const tempId = Date.now().toString()
        const tempPermission = { _id: tempId, ...permissionData }

        state.permissions.push(tempPermission)

        try {
            const res = await permissionService.createpermission(permissionData)

            const index = state.permissions.findIndex((p) => p._id === tempId)
            if (index !== -1) {
                state.permissions[index] = res.data.data.permissions
            }
        } catch (err) {
            state.permissions.filter((p) => p._id !== tempId)
            state.error = err.response?.data?.message || 'Failed to add permission.'
        }
    }

    const fetchPermissions = async () => {
        state.loading = true
        state.error = null
        try {
            const res = await permissionService.getAllPermissions()
            console.log(res)
            state.permissions = res.data.data.permissions
            console.log(res.data.data.permissions)
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to fetch permissions.'
        } finally {
            state.loading = false
        }
    }

    const updatePermission = async (id, data) => {
        try {
            await permissionService.updatePermission(id, data)
            await fetchPermissions()
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to update permission.'
        }
    }

    return {
        ...toRefs(state),
        addPermission,
        fetchPermissions,
        updatePermission,
    }
})
