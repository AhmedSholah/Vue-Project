import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import kpiService from '@/services/KPIService'
import { useRouter } from 'vue-router'
const router = useRouter()
export const useKpiStore = defineStore('kpiStore', () => {
    const state = reactive({
        kpis: null,
        isLoading: false,
        error: null,
    })

    // async function fetchKpis(startDate = '', endDate = '', groupBy = 'month') {
    //     state.isLoading = true
    //     state.error = null
    //     try {
    //         const response = await kpiService.getKPIs(startDate, endDate, groupBy)
    //         state.kpis = response.data.data
    //     } catch (err) {
    //         router.push('/error')
    //         console.error('Failed to fetch KPIs:', err)
    //         state.error = err
    //     } finally {
    //         state.isLoading = false
    //     }
    // }
    async function fetchKpis(startDate = '', endDate = '', groupBy = 'month') {
        state.isLoading = true
        state.error = null
        try {
            const response = await kpiService.getKPIs(startDate, endDate, groupBy)
            state.kpis = response.data.data
        } catch (err) {
            state.error = err
            console.error('Failed to fetch KPIs:', err)
            throw err
        } finally {
            state.isLoading = false
        }
    }

    return {
        ...toRefs(state),
        fetchKpis,
    }
})
