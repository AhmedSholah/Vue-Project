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
        <v-row>
            <v-col lg="8">
                <OrderSummar></OrderSummar>
            </v-col>

            <v-col lg="4">
                <CustomerInformation></CustomerInformation>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-table class="border radius">
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
                        <tr v-for="item in orderStore.selectedOrder.orderItems" :key="item._id">
                            <td>{{ item.product.name }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.product.shippingInfo.estimatedDelivery }}</td>
                            <td>{{ item.product.shippingInfo.shippingCost }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <OrderTimeline></OrderTimeline>
            </v-col>
        </v-row>
    </v-container>
</template>
