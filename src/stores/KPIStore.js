import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import kpiService from '@/services/KPIService'

export const useKpiStore = defineStore('kpi', () => {
    const state = reactive({
        kpis: null,
        isLoading: false,
        error: null,
    })

    async function fetchKpis() {
        state.isLoading = true
        state.error = null
        try {
            const response = await kpiService.getKPIs()
            state.kpis = response.data.data
        } catch (err) {
            console.error('Failed to fetch KPIs:', err)
            state.error = err
        } finally {
            state.isLoading = false
        }
    }

    return {
        ...toRefs(state),
        fetchKpis,
    }
})
