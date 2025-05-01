<script setup>
import TableGenerator from '@/components/table/TableGenerator.vue'
import { useOrderStore } from '@/stores/orderStore'
import { onMounted, ref } from 'vue'
const ordersStore = useOrderStore()

const ordersLimit = ref(10)

function loadOrders({ page, itemsPerPage, sortBy }) {
    let query = `page=${page}&limit=${itemsPerPage}`

    if (sortBy[0]) {
        query += `&sort=${sortBy[0].order === 'asc' ? '' : '-'}${sortBy[0].key}`
    }

    ordersStore.fetchAdminOrders(query)
}

function editOrder(id) {
    console.log('Edited order with id', id)
}

function deleteOrder(id) {
    console.log('Deleted order with id', id)
}

const tableConfig = [
    {
        header: { title: 'User', align: 'start', sortable: true, key: 'user' },
        type: 'object',
        options: {
            key: 'name',
        },
    },

    {
        header: { title: 'Total Price', align: 'start', sortable: true, key: 'totalPrice' },
        type: 'text',
    },

    {
        header: { title: 'Payment Method', align: 'start', sortable: true, key: 'paymentMethod' },
        type: 'text',
    },

    {
        header: { title: 'Payment Status', align: 'start', sortable: true, key: 'paymentStatus' },
        type: 'status',
        options: {
            variant: {
                pending: 'orange',
                paid: 'blue',
                failed: 'red',
                refunded: 'purple',
            },
        },
    },

    {
        header: { title: 'Order Status', align: 'start', sortable: true, key: 'orderStatus' },
        type: 'status',
        options: {
            variant: {
                processing: 'orange',
                shipped: 'blue',
                delivered: 'green',
                cancelled: 'red',
            },
        },
    },

    {
        header: { title: 'Order Number', align: 'start', sortable: true, key: 'orderNumber' },
        type: 'text',
    },

    {
        header: { title: 'Create At', align: 'start', sortable: true, key: 'simulatedCreatedAt' },
        type: 'date',
    },

    {
        header: { title: 'Delivered At', align: 'start', sortable: true, key: 'deliveredAt' },
        type: 'date',
    },

    {
        header: { title: 'Actions', align: 'start', sortable: false, key: 'action' },
        type: 'menu',
        options: {
            actions: [
                {
                    title: 'Edit',
                    action: editOrder,
                },
                {
                    title: 'Delete',
                    action: deleteOrder,
                },
            ],
        },
    },
]
</script>
<template>
    <TableGenerator
        :data="ordersStore.allOrders"
        :table-config="tableConfig"
        row-identifier="_id"
        :items-per-page="ordersLimit"
        :loading="ordersStore.loading"
        :total-items="ordersStore.totalOrders"
        :update-handler="loadOrders"
    />
</template>
