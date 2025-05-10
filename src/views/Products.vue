<script setup>
import TableGenerator from '@/components/table/TableGenerator.vue'
import { onBeforeMount, reactive, ref, toRef, watch } from 'vue'
import { useProductStore } from './../stores/productStore'
import FilterGenerator from '@/components/filter/FilterGenerator.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageNum = ref(0)
const pageSize = ref(10)
const sort = ref()
const search = ref('')
const filters = reactive({
    ...route.query,
})

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
        label: 'Price',
        name: 'price',
        type: 'range',
        options: {
            min: 0,
            max: 1000,
            initialValue: [filters.minPrice, filters.maxPrice],
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

const productsStore = useProductStore()
const categoryStore = useCategoryStore()

onBeforeMount(async () => {
    await categoryStore.fetchCategories()
    filterOptions[0].options.items = categoryStore.categories.map((cat) => cat.name)
})

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

function fetchProducts() {
    const queryString = extractQueryString(filters)

    productsStore.fetchProducts(queryString)
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
    console.log('Edited product with id', id)
    router.push('/form/products/' + id)
}

function deleteProduct(id) {
    console.log('Deleted product with id', id)
}

const tableConfig = [
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
    {
        header: { title: 'Actions', align: 'start', sortable: false, key: 'action' },
        type: 'menu',
        options: {
            actions: [
                {
                    title: 'Edit',
                    action: editProduct,
                },
                {
                    title: 'Delete',
                    action: deleteProduct,
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
            :loading="productsStore.loading"
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
        :data="productsStore.products"
        :table-config="tableConfig"
        row-identifier="_id"
        :items-per-page="pageSize"
        :loading="productsStore.loading"
        :total-items="productsStore.totalProducts"
        :update-handler="tableUpdateHandler"
    ></TableGenerator>
</template>
