import api from './api'
export default {
    getKPIs() {
        return api.get('/dashboard/kpis')
    },
}
