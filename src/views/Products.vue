<script setup>
import TableGenerator from '@/components/table/TableGenerator.vue'
import { ref, toRef, watch } from 'vue'
import { useProductStore } from './../stores/productStore'
import FilterGenerator from '@/components/filter/FilterGenerator.vue'

const store = useProductStore()

const productsLimit = ref(5)

function loadProducts({ page, itemsPerPage, sortBy }) {
    let query = `page=${page}&limit=${itemsPerPage}`

    if (sortBy[0]) {
        query += `&sort=${sortBy[0].order === 'asc' ? '' : '-'}${sortBy[0].key}`
    }

    store.fetchProducts(query)
}

function editProduct(id) {
    console.log('Edited product with id', id)
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
        header: { title: 'Sold By', align: 'start', sortable: true, key: 'soldBy' },
        type: 'object',
        options: { key: 'name' },
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

// Filtering
const filterOptions = [
    {
        label: 'Category',
        name: 'category',
        type: 'select',
        options: {
            items: ['Electronic', 'Aeroplane', 'Jelly', 'aaaaaaaaaaa'],
        },
    },
    {
        label: 'Category',
        name: 'name',
        type: 'select',
        options: {
            items: ['Electronic', 'Aeroplane', 'Jelly'],
        },
    },
    {
        label: 'Category',
        name: 'price',
        type: 'select',
        options: {
            items: ['Electronic', 'Aeroplane', 'Jelly'],
        },
    },
    {
        label: 'Category',
        name: 'hamada',
        type: 'select',
        options: {
            items: ['Electronic', 'Aeroplane', 'Jelly'],
        },
    },
]
</script>
<template>
    <FilterGenerator :filter-options="filterOptions" />
    <TableGenerator
        :data="store.products"
        :table-config="tableConfig"
        row-identifier="_id"
        :items-per-page="productsLimit"
        :loading="store.loading"
        :total-items="store.totalProducts"
        :update-handler="loadProducts"
    ></TableGenerator>
</template>
