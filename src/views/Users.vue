<script setup>
import TableGenerator from '@/components/table/TableGenerator.vue'
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const usersLimit = ref(0)
const userStore = useUserStore()

function loadUsers({ page, itemsPerPage, sortBy }) {
    let query = `page=${page}&limit=${itemsPerPage}`

    if (sortBy[0]) {
        query += `&sort=${sortBy[0].order === 'asc' ? '' : '-'}${sortBy[0].key}`
    }

    userStore.fetchUsers(query)
}

const tableConfig = []
</script>

<template>
    <TableGenerator
        :data="userStore.users"
        :table-config="tableConfig"
        row-identifier="_id"
        :items-per-page="usersLimit"
        :loading="userStore.loading"
        :total-items="6000"
        :update-handler="loadUsers"
    />
</template>
