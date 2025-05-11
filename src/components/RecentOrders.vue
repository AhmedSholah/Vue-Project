<script setup>
import FilterGenerator from '@/components/filter/FilterGenerator.vue'
import TableGenerator from '@/components/table/TableGenerator.vue'
import router from '@/router'
import { useOrderStore } from '@/stores/orderStore'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageNum = ref(0)
const pageSize = ref(10)
const sort = ref()

const ordersStore = useOrderStore()

function tableUpdateHandler({ page, itemsPerPage, sortBy }) {
    pageNum.value = page
    pageSize.value = itemsPerPage
    if (sortBy[0]) {
        sort.value = `${sortBy[0].order === 'asc' ? '' : '-'}${sortBy[0].key}`
    } else {
        sort.value = null
    }

    fetchOrders()
}

function fetchOrders() {
    const queryString = extractQueryString()

    ordersStore.fetchAdminOrders(queryString)
}

function extractQueryString() {
    let query = `page=${pageNum.value}&limit=${pageSize.value}&`

    // queryObj.search && (query += `name=${queryObj.search}&`)
    sort && (query += `sort=${sort.value}&`)

    return query
}

const tableConfig = [
    {
        header: { title: 'Order Number', align: 'start', sortable: true, key: 'orderNumber' },
        type: 'text',
    },
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
        header: { title: 'Create At', align: 'start', sortable: true, key: 'simulatedCreatedAt' },
        type: 'date',
    },
]
</script>
<template>
    <div class="">
        <TableGenerator
            :data="ordersStore.allOrders"
            :table-config="tableConfig"
            row-identifier="_id"
            :items-per-page="pageSize"
            :loading="ordersStore.loading"
            :total-items="ordersStore.totalOrders"
            :update-handler="tableUpdateHandler"
        />
    </div>
</template>
