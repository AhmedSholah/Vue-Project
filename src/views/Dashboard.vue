<script setup lang="ts">
import DoughnutChart from '@/charts/DoughnutChart.vue'
import LineChart from '@/charts/LineChart.vue'
import DashboardOverView from '@/components/DashboardOverView.vue'
import RecentOrders from '@/components/RecentOrders.vue'
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <DashboardOverView />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <LineChart />
            </v-col>
        </v-row>
        <v-row>
            <v-col md="6" lg="4">
                <DoughnutChart />
            </v-col>
            <v-col md="6" lg="8">
                <RecentOrders></RecentOrders>
            </v-col>
        </v-row>
    </v-container>
</template>
