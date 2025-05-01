import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import permissionService from '@/services/permissionService'

export const usePermissionStore = defineStore('permission', () => {
    const state = reactive({
        permissions: [],
        loading: false,
        error: null,
    })

    const fetchPermissions = async () => {
        console.log('fetching permissions')
        state.loading = true
        state.error = null
        try {
            const res = await permissionService.getAllPermissionss()
            state.permissions = res.data.data.permissions
            console.log(res.data.data.permissions)
        } catch (err) {
            state.error = err.response?.data?.message || 'Failed to fetch permissions.'
        } finally {
            state.loading = false
        }
    }

    const addPermission = async (permissionData) => {
        state.loading = true
        state.error = null

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
        } finally {
            state.loading = false
        }
    }

    return {
        ...toRefs(state),
        fetchPermissions,
        addPermission,
    }
})
