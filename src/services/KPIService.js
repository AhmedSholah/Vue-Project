import api from './api'
export default {
    getKPIs(startDate = '', endDate = '', groupBy = 'month') {
        // getKPIs(startDate = '2025-01-01', endDate = '2025-04-31', groupBy = 'month') {
        return api.get(
            `/dashboard/kpis?start=${startDate}&end=${endDate}&useSimulated=true&groupBy=${groupBy}`,
        )
    },
}
