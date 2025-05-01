<script setup>
import TableGenerator from '@/components/table/TableGenerator.vue'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const usersLimit = ref(10)
const userStore = useUserStore()

function loadUsers({ page, itemsPerPage, sortBy }) {
    let query = `page=${page}&limit=${itemsPerPage}`

    if (sortBy[0]) {
        query += `&sort=${sortBy[0].order === 'asc' ? '' : '-'}${sortBy[0].key}`
    }

    userStore.fetchUsers(query)
}

function editUser(id) {
    console.log('Edited user with id', id)
}

function deleteUser(id) {
    console.log('Deleted user with id', id)
}

const tableConfig = [
    {
        header: { title: '', align: 'start', sortable: true, key: 'avatar' },
        type: 'image',
    },
    {
        header: { title: 'Name', align: 'start', sortable: true, key: 'name' },
        type: 'text',
    },
    {
        header: { title: 'Email', align: 'start', sortable: true, key: 'email' },
        type: 'text',
    },
    {
        header: { title: 'Role', align: 'start', sortable: true, key: 'role' },
        type: 'text',
    },
    {
        header: { title: 'Create At', align: 'start', sortable: true, key: 'simulatedCreatedAt' },
        type: 'date',
    },
    {
        header: { title: 'Tag', align: 'start', sortable: true, key: 'tags' },
        type: 'status',
        options: {
            variant: {
                'premium ': 'primary',
            },
        },
    },
    {
        header: { title: 'Actions', align: 'start', sortable: false, key: 'action' },
        type: 'menu',
        options: {
            actions: [
                {
                    title: 'Edit',
                    action: editUser,
                },
                {
                    title: 'Delete',
                    action: deleteUser,
                },
            ],
        },
    },
]
</script>

<template>
    <TableGenerator
        :data="userStore.users"
        :table-config="tableConfig"
        row-identifier="_id"
        :items-per-page="usersLimit"
        :loading="userStore.loading"
        :total-items="userStore.totalUsers"
        :update-handler="loadUsers"
    />
</template>
