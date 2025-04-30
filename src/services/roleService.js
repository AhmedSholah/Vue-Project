import api from './api'
export default {
    getAllRoles() {
        return api.get('/roles')
    },
    getRole(roleId) {
        return api.get(`/roles/${roleId}`)
    },
    createRole(newRole) {
        return api.post('/roles', newRole)
    },
    updateRole(roleId) {
        return api.patch(`/roles/${roleId}`)
    },
    deleteRole(roleId) {
        return api.delete(`/roles/${roleId}`)
    },
}
