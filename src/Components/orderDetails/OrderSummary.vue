<template>
    <v-card class="pa-4 h-full" elevation="1">
        <v-card-title class="text-h6 font-weight-bold">Order Summary</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6">
                    <div><strong>Order Number</strong></div>
                    <div>#1700039</div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Created At</strong></div>
                    <div>May 10, 2025, 09:25 AM</div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Order Status</strong></div>
                    <div><v-icon x-small color="primary">mdi-circle</v-icon> Processing</div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Payment Status</strong></div>
                    <div><v-icon x-small color="primary">mdi-circle</v-icon> Paid</div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Payment Method</strong></div>
                    <div><v-icon class="me-1">mdi-credit-card</v-icon> Visa</div>
                </v-col>
                <v-col cols="12" sm="6">
                    <div><strong>Total Price</strong></div>
                    <div>$0.00</div>
                </v-col>
                <v-col cols="12">
                    <div><strong>Shipping Address</strong></div>
                    <div>nnnnnnnnnnn</div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup></script>

<style scoped>
.v-icon {
    vertical-align: middle;
}
</style>
