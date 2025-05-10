<template>
    <v-card class="pa-4 h-100 rounded-lg border" elevation="0">
        <v-card-title class="text-h6 font-weight-bold">Customer Information</v-card-title>
        <v-card-text>
            <v-row align="center" no-gutters>
                <v-col cols="auto">
                    <v-avatar
                        v-if="orderStore.selectedOrder.user.avatar"
                        :image="orderStore.selectedOrder.user.avatar"
                    ></v-avatar>

                    <v-avatar v-else color="grey-lighten-3">
                        <v-icon color="primary">mdi-account</v-icon>
                    </v-avatar>
                </v-col>
                <v-col>
                    <div class="text-subtitle-1 font-weight-medium">
                        {{ orderStore.selectedOrder.user.name }}
                    </div>
                    <div class="text-caption text-grey-darken-1">
                        {{ orderStore.selectedOrder.user.email }}
                    </div>
                </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <div class="mb-2">
                <strong>Gender</strong>
                <div>{{ orderStore.selectedOrder.user.gender }}</div>
            </div>

            <div class="mb-4">
                <strong>Customer Tag </strong>
                <div>
                    <v-chip color="primary">
                        {{ orderStore.selectedOrder.user.segments[0] }}
                    </v-chip>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
</script>

<style scoped>
.v-avatar {
    margin-right: 10px;
}
</style>
