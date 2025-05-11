<template>
    <v-container fluid class="overview-container bg-surface border border-cardBorder">
        <div class="mb-6">
            <h2 class="text-h5 font-weight-bold mb-3 text-headingColor">Overview</h2>
            <p class="text-body-2 text-subheadingColor">
                Welcome back! Here’s what’s happening with your store.
            </p>
        </div>

        <v-row>
            <template v-if="KPIStore.isLoading || !kpis.length">
                <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
                    <v-skeleton-loader
                        class="mb-4"
                        height="100"
                        elevation="2"
                        boilerplate
                        :loading="true"
                    >
                        <template #default>
                            <v-row no-gutters align="center">
                                <v-col cols="3">
                                    <v-skeleton-loader type="avatar" />
                                </v-col>
                                <v-col cols="9">
                                    <v-skeleton-loader type="text" class="mb-2" />
                                    <v-skeleton-loader type="text" width="60%" />
                                </v-col>
                            </v-row>
                        </template>
                    </v-skeleton-loader>
                </v-col>
            </template>

            <template v-else>
                <v-col v-for="kpi in kpis" :key="kpi?.title" cols="12" sm="6" md="4">
                    <KpiCard
                        :title="kpi?.title"
                        :value="kpi?.value"
                        :icon="kpi?.icon"
                        :color="kpi?.color"
                    />
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import KpiCard from '@/components/KPICard.vue'
import { useKpiStore } from '@/stores/KPIStore'
import { useSettingsStore } from '@/stores/storeSettings'
import { useUserStore } from '@/stores/userStore'

function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount)
}

const KPIStore = useKpiStore()
const storeSettingsStore = useSettingsStore()
const userStore = useUserStore()

const kpis = computed(() => {
    const data = KPIStore.kpis
    if (!data) return []

    return [
        {
            title: 'Total Revenue',
            value: `${formatCurrency(Math.ceil(data.totalRevenue), 'en-US', storeSettingsStore?.settings?.currency || 'USD')}`,
            icon: 'mdi-currency-usd',
            color: 'gray',
        },
        {
            title: 'Order Count',
            value: data.orderCount,
            icon: 'mdi-cart',
            color: 'gray',
        },
        {
            title: 'Avg Order Value',
            value: `${formatCurrency(Math.ceil(data.avgOrderValue), 'en-US', storeSettingsStore?.settings?.currency || 'USD')}`,
            icon: 'mdi-finance',
            color: 'gray',
        },
        {
            title: 'Total Customers',
            value: data.totalCustomers,
            icon: 'mdi-account-group',
            color: 'gray',
        },
        {
            title: 'Product Count',
            value: data.productCount,
            icon: 'mdi-package-variant',
            color: 'gray',
        },
        {
            title: 'New Customers',
            value: data.newCustomers.thisMonth,
            icon: 'mdi-calendar-month',
            color: 'gray',
        },
    ]
})

onMounted(async () => {
    await KPIStore.fetchKpis()
    await storeSettingsStore.fetchSettings()
})
</script>

<style scoped>
.overview-container {
    border-radius: 16px;
}
</style>
