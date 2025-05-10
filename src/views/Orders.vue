<script setup>
import FilterGenerator from '@/components/filter/FilterGenerator.vue'
import TableGenerator from '@/components/table/TableGenerator.vue'
import { useOrderStore } from '@/stores/orderStore'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()

const pageNum = ref(0)
const pageSize = ref(10)
const sort = ref()
const search = ref('')
const filters = reactive({
    ...route.query,
})

const filterOptions = []

const ordersStore = useOrderStore()

function searchFilter() {
    if (search.value.trim()) {
        filters.search = search.value
        fetchOrders()
    } else {
        delete filters.search
        fetchOrders()
    }
}

function clearSearch() {
    search.value = ''
    delete filters.search
    fetchOrders()
}

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
    const queryString = extractQueryString(filters)

    ordersStore.fetchAdminOrders(queryString)
}

function filterUpdateHandler({}) {
    fetchOrders()
}

function extractQueryString(queryObj) {
    let query = `page=${pageNum.value}&limit=${pageSize.value}&`

    // queryObj.search && (query += `name=${queryObj.search}&`)
    // sort && (query += `sort=${sort.value}&`)

    return query
}

function editOrder(id) {
    console.log('Edited order with id', id)
    router.push('/form/orders/' + id)
}

function deleteOrder(id) {
    console.log('Deleted order with id', id)
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
    <v-sheet class="d-flex justify-space-between align-center ga-4 my-8">
        <v-text-field
            v-model="search"
            :loading="ordersStore.loading"
            label="Search"
            clearable
            @click:clear="clearSearch"
            variant="outlined"
            hide-details
            single-line
        >
            <template #append-inner>
                <v-icon class="cursor-pointer" @click="searchFilter()">mdi-magnify</v-icon>
            </template>
        </v-text-field>

        <FilterGenerator :filter-options="filterOptions" :filter-handler="filterUpdateHandler" />
    </v-sheet>
    <TableGenerator
        :data="ordersStore.allOrders"
        :table-config="tableConfig"
        row-identifier="_id"
        :items-per-page="pageSize"
        :loading="ordersStore.loading"
        :total-items="ordersStore.totalOrders"
        :update-handler="tableUpdateHandler"
    />
</template>
