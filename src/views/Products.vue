<script setup>
import TableGenerator from '@/components/table/TableGenerator.vue'
import { onBeforeMount, reactive, ref, toRef, watch } from 'vue'
import { useProductStore } from './../stores/productStore'
import FilterGenerator from '@/components/filter/FilterGenerator.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'vue-toastification'

const route = useRoute()
const pageNum = ref(1)
const pageSize = ref(10)
const sort = ref()
const search = ref('')
const toast = useToast()

const filters = reactive({
    ...route.query,
})

//#region  Table Config
const tableConfig = reactive([
    {
        header: { title: 'Name', align: 'start', sortable: true, key: 'name' },
        type: 'text',
    },
    {
        header: { title: 'Price', align: 'start', sortable: true, key: 'price' },
        type: 'text',
    },
    {
        header: { title: 'Quantity', align: 'start', sortable: true, key: 'quantity' },
        type: 'text',
    },
    {
        header: { title: 'Category', align: 'start', sortable: true, key: 'category' },
        type: 'object',
        options: { key: 'name' },
    },
    {
        header: { title: 'Created At', align: 'start', sortable: true, key: 'simulatedCreatedAt' },
        type: 'date',
    },
    {
        header: { title: 'Rating', align: 'start', sortable: true, key: 'rating' },
        type: 'rating',
    },
    {
        header: { title: 'Colors', align: 'start', sortable: false, key: 'colors' },
        type: 'stringArray',
    },
    {
        header: { title: 'Views', align: 'start', sortable: true, key: 'views' },
        type: 'text',
    },
])
//#endregion

// Filtering
const filterOptions = reactive([
    {
        label: 'Category',
        name: 'category',
        type: 'select',
        options: {
            initialValue: filters.category,
        },
    },
    {
        label: 'Color',
        name: 'colors',
        type: 'multiSelect',
        options: {
            initialValue: filters.colors,
            items: ['red', 'yellow', 'blue', 'green', 'pink'],
        },
    },
    {
        label: 'Stock',
        name: 'instock',
        type: 'radio',
        options: {
            items: [
                { label: 'In Stock', value: 'true' },
                { label: 'Out of Stock', value: 'false' },
            ],
            initialValue: filters.instock,
        },
    },
    {
        label: 'Rating',
        name: 'rating',
        type: 'range',
        options: {
            min: 0,
            max: 5,
            initialValue: [0, 5],
        },
    },
])

const userStore = useUserStore()
const productsStore = useProductStore()
const categoryStore = useCategoryStore()

onBeforeMount(async () => {
    loadPermissions()
    await categoryStore.fetchCategories()
    filterOptions[0].options.items = categoryStore.categories.map((cat) => cat.name)
})

async function loadPermissions() {
    if (!userStore.currentUser) {
        await userStore.fetchCurrentUser()
    }

    const actionsConfig = {
        header: { title: 'Actions', align: 'start', sortable: false, key: 'action' },
        type: 'menu',
        options: {
            actions: [],
        },
    }

    userStore.hasPermission('update_product')
        ? actionsConfig.options.actions.push({
              title: 'Edit',
              action: editProduct,
          })
        : null

    userStore.hasPermission('delete_product')
        ? actionsConfig.options.actions.push({
              title: 'Delete',
              action: deleteButtonHandle,
          })
        : null

    console.log(userStore.hasPermission('update-product'))

    if (actionsConfig.options.actions.length) tableConfig.push(actionsConfig)
}

function tableUpdateHandler({ page, itemsPerPage, sortBy }) {
    pageNum.value = page
    pageSize.value = itemsPerPage
    if (sortBy[0]) {
        sort.value = `${sortBy[0].order === 'asc' ? '' : '-'}${sortBy[0].key}`
    } else {
        sort.value = null
    }

    fetchProducts()
}

function searchFilter() {
    if (search.value.trim()) {
        filters.search = search.value
        fetchProducts()
    } else {
        delete filters.search
        fetchProducts()
    }
}

function clearSearch() {
    search.value = ''
    delete filters.search
    fetchProducts()
}

function filterUpdateHandler({ category, instock, price, colors, rating }) {
    category ? (filters.category = category) : delete filters.category
    instock ? (filters.instock = instock) : delete filters.instock
    price ? (filters.minPrice = price[0]) : delete filters.minPrice
    price ? (filters.maxPrice = price[1]) : delete filters.maxPrice
    colors ? (filters.colors = colors.join(',')) : delete filters.colors
    rating ? (filters.minRating = rating[0]) : delete filters.minRating
    rating ? (filters.maxRating = rating[1]) : delete filters.maxRating

    fetchProducts()
}

async function fetchProducts() {
    const queryString = extractQueryString(filters)

    await productsStore.fetchProducts(queryString)

    addPriceFilter()
    router.push({ path: 'products', query: filters })
}

function extractQueryString(queryObj) {
    let query = `?page=${pageNum.value}&limit=${pageSize.value}&`
    queryObj.category && (query += `category=${queryObj.category}&`)
    queryObj.instock && (query += `instock=${queryObj.instock}&`)
    queryObj.minPrice && (query += `price[gte]=${queryObj.minPrice}&`)
    queryObj.maxPrice && (query += `price[lte]=${queryObj.maxPrice}&`)
    queryObj.colors && (query += `colors=${queryObj.colors}&`)
    queryObj.minRating && (query += `rating[gte]=${queryObj.minRating}&`)
    queryObj.maxRating && (query += `rating[lte]=${queryObj.maxRating}&`)
    queryObj.search && (query += `name=${queryObj.search}&`)

    sort && (query += `sort=${sort.value}&`)

    return query
}

function editProduct(id) {
    router.push({ path: `/form/products/${id}` })
}

//#region Delete Product
const confirmModal = ref(false)
const activeDeleteId = ref(null)

function closeModal() {
    confirmModal.value = false
    activeDeleteId.value = null
}

function deleteButtonHandle(id) {
    confirmModal.value = true
    activeDeleteId.value = id
}

async function deleteProduct() {
    await productsStore.deleteProduct(activeDeleteId.value)

    if (productsStore.error) {
        toast.error(productsStore.error)
    } else {
        toast.success('Deleted product successfully')
    }
    confirmModal.value = false
    activeDeleteId.value = null
}
//#endregion

function addClickHandler() {
    router.push({ path: '/form/products' })
}

let priceFilterExist = false
function addPriceFilter() {
    if (!priceFilterExist) {
        filterOptions.push({
            label: 'Price',
            name: 'price',
            type: 'range',
            options: {
                min: productsStore.minPrice,
                max: productsStore.maxPrice,
                initialValue: [productsStore.minPrice, productsStore.maxPrice],
            },
        })

        priceFilterExist = true
    }
}
</script>
<template>
    <div class="px-8 mb-8">
        <div class="d-flex flex-column flex-md-row justify-space-between align-center ga-4 mb-8">
            <v-text-field
                v-model="search"
                :loading="productsStore.loading"
                label="Search"
                clearable
                @click:clear="clearSearch"
                variant="solo-filled"
                hide-details
                single-line
                class="flex-grow-1"
                style="min-width: 250px; max-width: 400px"
            >
                <template #append-inner>
                    <v-icon class="cursor-pointer" @click="searchFilter()">mdi-magnify</v-icon>
                </template>
            </v-text-field>

            <div class="d-flex ga-4 align-center">
                <FilterGenerator
                    :filter-options="filterOptions"
                    :filter-handler="filterUpdateHandler"
                />
                <v-btn
                    v-if="userStore.hasPermission('create_product')"
                    @click="addClickHandler"
                    prepend-icon="$plus"
                    size="large"
                    color="primary"
                >
                    Add New Product
                </v-btn>
            </div>
        </div>
        <TableGenerator
            :data="productsStore.products"
            :table-config="tableConfig"
            row-identifier="_id"
            :items-per-page="pageSize"
            :loading="productsStore.loading"
            :total-items="productsStore.totalProducts"
            :update-handler="tableUpdateHandler"
        ></TableGenerator>
    </div>

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
                    <v-btn class="ms-auto" text="Confirm" @click="deleteProduct"></v-btn>
                </div>
            </template>
        </v-card>
    </v-dialog>
</template>
