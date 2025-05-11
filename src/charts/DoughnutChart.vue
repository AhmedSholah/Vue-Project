<template>
    <v-container
        class="pa-4"
        max-width="400"
        style="
            background-color: var(--v-theme-cardValue);
            margin-bottom: 24px;
            border-radius: 16px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        "
    >
        <v-row class="text-center mb-4">
            <v-col cols="12" class="aspect-ratio">
                <h3 class="text-h6 font-weight-bold text-headingColor">Order Status</h3>
                <p class="text-subtitle-2 text-grey-darken-1">
                    {{ kpiStore.kpis?.orderCount }} Orders
                </p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <div class="chart-wrapper">
                    <v-skeleton-loader
                        v-if="kpiStore.isLoading"
                        class="doughnut-skeleton"
                        type="image"
                        :elevation="2"
                    />
                    <Doughnut v-else :data="chartData" :options="chartOptions" ref="chartRef" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.chart-wrapper {
    width: 100%;
    max-width: 100%;
    max-height: 250px;
    position: relative;
}

.doughnut-skeleton {
    height: 100%;
    width: 100%;
    border-radius: 16px;
    background-color: var(--v-theme-surface);
}
</style>

<script setup>
import { ref, onMounted, watch, toRaw, onBeforeUnmount } from 'vue'
import { Doughnut } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useKpiStore } from '@/stores/KPIStore'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const kpiStore = useKpiStore()
const chartRef = ref(null)

const handleResize = () => {
    if (chartRef.value?.chart) {
        chartRef.value.chart.resize()
    }
}

let chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Order Status Distribution',
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
            borderColor: '#fff',
            borderWidth: 2,
        },
    ],
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
        legend: {
            position: 'right',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
        tooltip: {
            enabled: true,
        },
        datalabels: {
            color: '#fff',
            font: {
                weight: 'bold',
            },
            formatter: (value, context) => {
                const data = context.chart.data.datasets[0].data
                const total = data.reduce((sum, val) => sum + val, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return `${percentage}%`
            },
        },
    },
})

const updateChartData = () => {
    const statusData = kpiStore.kpis?.orderStatusDistribution || []

    if (!statusData.length) return

    chartData.value = {
        labels: statusData.map((item) => item.status),
        datasets: [
            {
                label: 'Order Status Distribution',
                data: statusData.map((item) => item.count),
                backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    }
}

onMounted(async () => {
    await kpiStore.fetchKpis()
    updateChartData()
    window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
watch(
    () => kpiStore.kpis?.orderStatusDistribution,
    () => updateChartData(),
)
</script>
