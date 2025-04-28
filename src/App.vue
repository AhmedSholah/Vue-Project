<script setup>
import { ref } from 'vue'
import TableGenerator from './components/table/TableGenerator.vue'

const data = ref([
    {
        id: 1,
        title: 'Hello',
        test: 'Rejected',
    },
    {
        id: 2,
        title: 'Hi',
        test: 'Accepted',
    },
    {
        id: 3,
        title: 'Hey',
        test: 'Pending',
    },
    {
        id: 4,
        title: 'Goodbye',
        test: 'Rejected',
    },
])

function editProduct(id) {
    console.log(`Product ${id} was edited`)
}

function deleteProduct(id) {
    console.log(`Product ${id} was deleted`)
}

// function statusChange(id, status) {
//     console.log(`ID: ${id}, Status: ${status}`)
// }

function statusChange(id, status) {
    const index = data.value.findIndex((item) => item.id === Number(id))

    data.value[index].test = status
}

const columnsConfig = [
    {
        header: { title: 'title', align: 'start', sortable: false, key: 'title' },
        type: 'text',
    },
    // {
    //     header: { title: 'TEST', align: 'start', sortable: false, key: 'test' },
    //     type: 'status',
    //     options: {
    //         variant: { Accepted: 'green', Rejected: 'red', Pending: 'primary' },
    //     },
    // },
    {
        header: { title: 'select', align: 'start', sortable: false, key: 'test' },
        type: 'statusSelect',
        options: {
            items: [
                { title: 'Accepted', value: 'Accepted' },
                { title: 'Rejected', value: 'Rejected' },
                { title: 'Pending', value: 'Pending' },
            ],
            variant: { Accepted: 'green', Rejected: 'red', Pending: 'primary' },
            handler: statusChange,
        },
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
<script setup></script>

<template>
    <router-view />
</template>
