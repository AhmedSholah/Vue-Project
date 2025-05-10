<script setup>
import CustomerInformation from '@/components/orderDetails/CustomerInformation.vue'
import OrderSummar from '@/components/orderDetails/OrderSummary.vue'
import OrderTimeline from '@/components/orderDetails/OrderTimeline.vue'
import TableGenerator from '@/components/table/TableGenerator.vue'
import { useOrderStore } from '@/stores/orderStore'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const orderStore = useOrderStore()
const route = useRoute()

onBeforeMount(() => {
    orderStore.fetchOrder(route.params.id)

    console.log(orderStore.selectedOrder)
})

//#region Table Configuration
//#endregion
</script>

<template>
    <v-container class="pa-8">
        <v-row v-if="orderStore.loading">
            <v-col lg="8">
                <v-card class="pa-4 h-100" elevation="1">
                    <v-card-title class="text-h6 font-weight-bold">Order Summary</v-card-title>
                    <v-card-text>
                        <v-skeleton-loader type="paragraph"></v-skeleton-loader>
                        <v-skeleton-loader type="paragraph"></v-skeleton-loader
                    ></v-card-text>
                </v-card>
            </v-col>

            <v-col lg="4">
                <v-card class="pa-4 h-100" elevation="1">
                    <v-card-title class="text-h6 font-weight-bold">Order Summary</v-card-title>
                    <v-card-text>
                        <v-skeleton-loader type="paragraph"></v-skeleton-loader>
                        <v-skeleton-loader type="text"></v-skeleton-loader>
                        <v-skeleton-loader type="text"></v-skeleton-loader
                    ></v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col lg="8">
                <OrderSummar></OrderSummar>
            </v-col>

            <v-col lg="4">
                <CustomerInformation></CustomerInformation>
            </v-col>
        </v-row>

        <v-row v-if="orderStore.loading">
            <v-col cols="12">
                <v-skeleton-loader type="table-tbody"></v-skeleton-loader>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col cols="12">
                <v-card class="pa-4 h-full rounded-lg border" elevation="0">
                    <v-card-title class="text-h6 font-weight-bold">Ordered Items</v-card-title>

                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-left">Price</th>
                                    <th class="text-left">Quantity</th>
                                    <th class="text-left">Est. Shipping</th>
                                    <th class="text-left">Shipping Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="item in orderStore.selectedOrder.orderItems"
                                    :key="item._id"
                                >
                                    <td>{{ item.product.name }}</td>
                                    <td>{{ item.price }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ item.product.shippingInfo.estimatedDelivery }}</td>
                                    <td>{{ item.product.shippingInfo.shippingCost }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-if="orderStore.loading">
            <v-col cols="12">
                <v-card class="pa-4" elevation="1">
                    <v-card-title class="text-h6 font-weight-bold">Order Timeline</v-card-title>

                    <v-card-text>
                        <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <OrderTimeline></OrderTimeline>
            </v-col>
        </v-row>
    </v-container>
</template>
