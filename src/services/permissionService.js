import api from './api'
export default {
    getAllPermissions() {
        return api.get('/permissions')
    },
    getPermission(permissionId) {
        return api.get(`/permissions/${permissionId}`)
    },
    createpermission(newpermission) {
        return api.post('/permissions', newpermission)
    },
    updatepermission(permissionId) {
        return api.patch(`/permissions/${permissionId}`)
    },
    deletePermission(permissionId) {
        return api.delete(`/permissions/${permissionId}`)
    },
}
