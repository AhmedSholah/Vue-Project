<template>
    <v-card class="pa-4 h-full rounded-lg border" elevation="0">
        <v-card-title class="text-h6 font-weight-bold">Order Summary</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <div><strong>Order Number</strong></div>
                    <div>#{{ orderStore.selectedOrder.orderNumber }}</div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Created At</strong></div>
                    <div>
                        {{
                            new Date(orderStore.selectedOrder.simulatedCreatedAt).toLocaleString(
                                'en-GB',
                                {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                },
                            )
                        }}
                    </div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Order Status</strong></div>
                    <div>
                        <v-icon x-small color="primary">mdi-circle</v-icon>
                        {{
                            orderStore.selectedOrder.orderStatus[0].toUpperCase() +
                            orderStore.selectedOrder.orderStatus.slice(1)
                        }}
                    </div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Payment Status</strong></div>
                    <div>
                        <v-icon x-small color="primary">mdi-circle</v-icon>
                        {{
                            orderStore.selectedOrder.paymentStatus[0].toUpperCase() +
                            orderStore.selectedOrder.paymentStatus.slice(1)
                        }}
                    </div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Payment Method</strong></div>
                    <div>
                        <v-icon class="me-1">mdi-credit-card</v-icon
                        >{{ orderStore.selectedOrder.paymentMethod }}
                    </div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Total Price</strong></div>
                    <div>${{ orderStore.selectedOrder.totalPrice }}</div>
                </v-col>
                <v-col cols="12">
                    <div><strong>Shipping Address</strong></div>
                    <div>{{ orderStore.selectedOrder.shippingAddress }}</div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
</script>

<style scoped>
.v-icon {
    vertical-align: middle;
}
</style>
