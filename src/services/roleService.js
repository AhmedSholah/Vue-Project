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
    updateRole(roleId, updatedRole) {
        return api.patch(`/roles/${roleId}`, updatedRole)
    },
    deleteRole(roleId) {
        return api.delete(`/roles/${roleId}`)
    },
}
