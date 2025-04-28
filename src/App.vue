<script setup>
import TableGenerator from './components/table/TableGenerator.vue'

const data = [
    {
        id: 1,
        title: 'Hello',
    },
    {
        id: 2,
        title: 'Hi',
    },
    {
        id: 3,
        title: 'Hey',
    },
    {
        id: 4,
        title: 'Goodbye',
    },
]

function editProduct(id) {
    console.log(`Product ${id} was edited`)
}

function deleteProduct(id) {
    console.log(`Product ${id} was deleted`)
}

const columnsConfig = [
    {
        header: { title: 'ID ID ID', align: 'start', sortable: false, key: 'id' },
        type: 'text',
    },
    {
        header: { title: 'title', align: 'start', sortable: false, key: 'title' },
        type: 'text',
    },
    {
        header: { title: 'actions', align: 'start', sortable: false, key: 'actions' },
        type: 'menu',
        options: {
            actions: [
                { title: 'Edit', action: editProduct },
                { title: 'Delete', action: deleteProduct },
            ],
        },
    },
]
</script>
<template>
    <TableGenerator :data="data" :columns-config="columnsConfig" :row-identifier="'id'" />
</template>
