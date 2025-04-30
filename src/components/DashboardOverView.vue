<template>
    <v-container
        fluid
        style="
            background-color: #ffffff;
            border-radius: 16px;
            max-width: 80%;
            margin: auto;
            margin-top: 16px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        "
    >
        <div class="mb-6">
            <h2 class="text-h5 font-weight-bold mb-3" style="color: #3e5677">Overview</h2>
            <p class="text-body-2" style="color: #454545">
                Welcome back! Here’s what’s happening with your store.
            </p>
        </div>
        <v-row>
            <v-col v-for="kpi in kpis" :key="kpi?.title" cols="12" sm="6" md="4">
                <KpiCard
                    :title="kpi?.title"
                    :value="kpi?.value"
                    :icon="kpi?.icon"
                    :color="kpi?.color"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import KpiCard from '@/components/KPICard.vue'
import { useKpiStore } from '@/stores/KPIStore'
import { useSettingsStore } from '@/stores/storeSettings'

function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount)
}

const KPIStore = useKpiStore()
const storeSettingsStore = useSettingsStore()

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
        // {
        //     title: 'New Customers (Week)',
        //     value: data.newCustomers.thisWeek,
        //     icon: 'mdi-calendar-week',
        //     color: 'gray',
        // },
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
        // {
        //     title: 'New Customers (Year)',
        //     value: data.newCustomers.thisYear,
        //     icon: 'mdi-calendar',
        //     color: 'gray',
        // },
    ]
})

onMounted(async () => {
    await KPIStore.fetchKpis()
    await storeSettingsStore.fetchSettings()
})
</script>
