import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import settingsService from '@/services/storeSettingService'

export const useSettingsStore = defineStore('settingsStore', () => {
    const settings = reactive({})
    const loading = ref(false)
    const error = ref(null)

    const fetchSettings = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await settingsService.getStoreSettings()
            const storeSettings = res.data.data.storeSettings[0]
            console.log(storeSettings)
            Object.assign(settings, storeSettings)
        } catch (err) {
            console.error('Failed to fetch settings:', err)
            error.value = err.response?.data?.message || err.message || 'An error occurred'
        } finally {
            loading.value = false
        }
    }

    const updateSettings = async (newSettings) => {
        loading.value = true
        error.value = null
        try {
            await settingsService.updateStoreSettings(newSettings)
            await fetchSettings()
        } catch (err) {
            console.error('Failed to update settings:', err)
            error.value = err.response?.data?.message || err.message || 'An error occurred'
        } finally {
            loading.value = false
        }
    }

    return { settings, loading, error, fetchSettings, updateSettings }
})
