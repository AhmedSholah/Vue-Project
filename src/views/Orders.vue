<script setup>
import FilterGenerator from '@/components/filter/FilterGenerator.vue'
import TableGenerator from '@/components/table/TableGenerator.vue'
import router from '@/router'
import { useOrderStore } from '@/stores/orderStore'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageNum = ref(0)
const pageSize = ref(10)
const sort = ref()
const search = ref('')
const filters = reactive({
    ...route.query,
})

const tableConfig = reactive([
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
])

onMounted(() => {
    loadPermissions()
})

async function loadPermissions() {
    if (!userStore.currentUser) {
        await userStore.fetchCurrentUser()
    }
    const actionsConfig = {
        header: { title: 'Actions', align: 'start', sortable: false, key: 'action' },
        type: 'menu',
        options: {
            actions: [
                {
                    title: 'Details',
                    action: goToOrderDetails,
                },
            ],
        },
    }

    userStore.hasPermission('update_order')
        ? actionsConfig.options.actions.push({
              title: 'Edit',
              action: editOrder,
          })
        : null

    userStore.hasPermission('delete_order')
        ? actionsConfig.options.actions.push({
              title: 'Delete',
              action: deleteOrder,
          })
        : null

    if (actionsConfig.options.actions.length) tableConfig.push(actionsConfig)
}

const filterOptions = []

const ordersStore = useOrderStore()
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

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

//#region Delete order
const confirmModal = ref(false)
const activeDeleteId = ref(null)

function closeModal() {
    confirmModal.value = false
    activeDeleteId.value = null
}

function deleteButtonHandle(id) {
    console.log(id)
    confirmModal.value = true
    activeDeleteId.value = id
}

async function deleteOrder() {
    await ordersStore.deleteOrder(activeDeleteId.value)

    if (userStore.error) {
        toast.error(userStore.error)
    } else {
        toast.success('Deleted user successfully')
    }
    confirmModal.value = false
    activeDeleteId.value = null
}
//#endregion

function extractQueryString(queryObj) {
    let query = `page=${pageNum.value}&limit=${pageSize.value}&`

    sort && (query += `sort=${sort.value}&`)

    return query
}

function editOrder(id) {
    router.push({ path: `/form/orders/${id}` })
}

function addClickHandler() {
    router.push({ path: '/form/orders' })
}

function goToOrderDetails(id) {
    router.push({ path: `/orders/${id}` })
}
</script>
<template>
    <div class="px-8 m-0 mb-8">
        <div class="d-flex flex-column flex-md-row justify-space-between align-center ga-4 mb-8">
            <!-- <v-text-field
                v-model="search"
                :loading="ordersStore.loading"
                label="Search"
                clearable
                @click:clear="clearSearch"
                variant="solo-filled"
                hide-details
                single-line
                style="min-width: 250px; max-width: 400px"
            >
                <template #append-inner>
                    <v-icon class="cursor-pointer" @click="searchFilter()">mdi-magnify</v-icon>
                </template>
            </v-text-field> -->
            <div class="d-flex ga-4 align-center">
                <v-btn
                    v-if="userStore.hasPermission('create_order')"
                    @click="addClickHandler"
                    prepend-icon="$plus"
                    size="large"
                    color="primary"
                >
                    Add New Order
                </v-btn>
                <!-- <FilterGenerator
                    :filter-options="filterOptions"
                    :filter-handler="filterUpdateHandler" -->
            </div>
        </div>
        <TableGenerator
            :data="ordersStore.allOrders"
            :table-config="tableConfig"
            row-identifier="_id"
            :items-per-page="pageSize"
            :loading="ordersStore.loading"
            :total-items="ordersStore.totalOrders"
            :update-handler="tableUpdateHandler"
        />

        <v-dialog v-model="confirmModal" width="auto">
            <v-card
                max-width="400"
                prepend-icon="mdi-update"
                text="Are you sure you want to delete this product"
                title="Confirm delete product"
            >
                <template v-slot:actions>
                    <div class="d-flex ga-2">
                        <v-btn
                            class="ms-auto"
                            text="Cancel"
                            color="primary"
                            variant="elevated"
                            @click="closeModal"
                        ></v-btn>
                        <v-btn class="ms-auto" text="Confirm" @click="deleteOrder"></v-btn>
                    </div>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>
