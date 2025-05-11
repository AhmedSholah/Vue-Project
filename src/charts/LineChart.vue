<template>
    <div class="chart-wrapper">
        <h3 class="chart-title text-headingColor">Revenue Over Time</h3>
        <div class="chart-container">
            <template v-if="!kpiStore.isLoading">
                <Line :data="data" :options="options" />
            </template>
            <template v-else>
                <v-skeleton-loader
                    class="chart-skeleton"
                    type="image"
                    :elevation="2"
                    :loading="true"
                />
            </template>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useKpiStore } from '@/stores/KPIStore'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartDataLabels,
)

const data = ref({
    labels: [],
    datasets: [],
})

const options = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            anchor: 'end',
            align: 'top',
            color: 'rgb(62, 86, 119)',
            font: {
                size: 10,
                weight: 'medium',
            },
            formatter: (value) => {
                if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M'
                if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K'
                return value
            },
        },
        legend: {
            display: false,
            labels: {
                color: '#333',
                font: {
                    size: 12,
                    weight: 'bold',
                },
            },
        },
        title: {
            display: true,
            color: '#2c3e50',
            font: {
                size: 16,
            },
        },
        tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
        },
    },
    scales: {
        x: {
            ticks: {
                color: '#666',
                font: {
                    size: 12,
                },
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                color: '#666',
                font: {
                    size: 12,
                },
                callback: function (value) {
                    if (value >= 1_000_000) return value / 1_000_000 + 'M'
                    if (value >= 1_000) return value / 1_000 + 'K'
                    return value
                },
            },
            grid: {
                color: '#e5e5e5',
            },
        },
    },
})

const kpiStore = useKpiStore()
const dataLoaded = ref(false)

onMounted(async () => {
    try {
        const res = await kpiStore.fetchKpis()
        const revenueData = kpiStore.kpis.revenueOverTime

        data.value = {
            labels: revenueData.map((item) => item._id),
            datasets: [
                {
                    label: 'Revenue',
                    data: revenueData.map((item) => item.total),
                    fill: true,
                    backgroundColor: 'rgba(149, 194, 255,0.2)',
                    borderColor: '#95C2FF',
                    pointBackgroundColor: '#95C2FF',
                    pointBorderColor: '#fff',
                    tension: 0.4,
                },
            ],
        }

        dataLoaded.value = true
    } catch (error) {
        console.error('Failed to load revenue data:', error)
    }
})
</script>

<style scoped>
.chart-wrapper {
    background-color: var(--v-theme-background);

    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    margin: 1rem auto;
    max-width: 80%;
    width: 100%;
    transition: box-shadow 0.3s ease;
}

.chart-wrapper:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.chart-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1rem;
    text-align: center;
}

.chart-container {
    height: 360px;
    position: relative;
}
.chart-skeleton {
    height: 100%;
    width: 100%;
    border-radius: 0;
    background-color: var(--v-theme-surface);
}
</style>
