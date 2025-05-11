<script setup>
import FilterGenerator from '@/components/filter/FilterGenerator.vue'
import TableGenerator from '@/components/table/TableGenerator.vue'
import router from '@/router'
import { useRoleStore } from '@/stores/roleStore'
import { useUserStore } from '@/stores/userStore'
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const pageNum = ref(0)
const pageSize = ref(10)
const sort = ref()
const search = ref('')
const userStore = useUserStore()
const roleStore = useRoleStore()
const filters = reactive({
    ...route.query,
})

// Filtering
const filterOptions = reactive([
    {
        label: 'Tags',
        name: 'tags',
        type: 'select',
        options: {
            initialValue: filters.tags,
            items: ['regular', 'premium'],
        },
    },
    {
        label: 'Gender',
        name: 'gender',
        type: 'radio',
        options: {
            items: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
            initialValue: filters.gender,
        },
    },
    {
        label: 'Created Date From',
        name: 'createdFrom',
        type: 'date',
    },
    {
        label: 'Created Date To',
        name: 'createdTo',
        type: 'date',
    },
])

const tableConfig = [
    {
        header: { title: '', align: 'start', sortable: false, key: 'avatarUrl' },
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
        // type: 'text',
        type: 'object',
        options: {
            key: 'name',
        },
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
]

onMounted(async () => {
    loadPermissions()
    await roleStore.fetchRoles()

    console.log(roleStore.roles.map((r) => r.name))
    filterOptions.unshift({
        label: 'Role',
        name: 'role',
        type: 'select',
        options: {
            initialValue: filters.role,
            // Replace with dynamic roles from API or state
            items: roleStore.roles.map((r) => r.name),
        },
    })
})

function loadPermissions() {
    const actionsConfig = {
        header: { title: 'Actions', align: 'start', sortable: false, key: 'action' },
        type: 'menu',
        options: {
            actions: [
                {
                    title: 'Edit',
                    action: editUser,
                },
            ],
        },
    }

    userStore.hasPermission('delete_user')
        ? actionsConfig.options.actions.push({
              title: 'Delete',
              action: deleteButtonHandle,
          })
        : null

    if (actionsConfig.options.actions.length) tableConfig.push(actionsConfig)
}

watch(
    () => userStore.currentUser,
    (newVal) => {
        if (newVal) {
            loadPermissions()
        }
    },
    { immediate: false },
)

function searchFilter() {
    if (search.value.trim()) {
        filters.search = search.value
        fetchUsers()
    } else {
        delete filters.search
        fetchUsers()
    }
}

function clearSearch() {
    search.value = ''
    delete filters.search
    fetchUsers()
}

function tableUpdateHandler({ page, itemsPerPage, sortBy }) {
    pageNum.value = page
    pageSize.value = itemsPerPage
    if (sortBy[0]) {
        sort.value = `${sortBy[0].order === 'asc' ? '' : '-'}${sortBy[0].key}`
    } else {
        sort.value = null
    }

    fetchUsers()
}

function fetchUsers() {
    const queryString = extractQueryString(filters)

    userStore.fetchUsers(queryString)
}

function filterUpdateHandler({ role, tags, gender, createdFrom, createdTo }) {
    role ? (filters.role = role) : delete filters.role
    tags ? (filters.tags = tags) : delete filters.tags
    gender ? (filters.gender = gender) : delete filters.gender
    createdFrom ? (filters.createdFrom = createdFrom) : delete filters.createdFrom
    createdTo ? (filters.createdTo = createdTo) : delete filters.createdTo

    fetchUsers()
}

function extractQueryString(queryObj) {
    let query = `page=${pageNum.value}&limit=${pageSize.value}&`

    queryObj.role && (query += `role=${queryObj.role}&`)
    queryObj.tags && (query += `tags=${queryObj.tags}&`)
    queryObj.gender && (query += `gender=${queryObj.gender}&`)
    queryObj.createdFrom && (query += `simulatedCreatedAt[gte]=${queryObj.createdFrom}&`)
    queryObj.createdTo && (query += `simulatedCreatedAt[lte]=${queryObj.createdTo}&`)

    queryObj.search && (query += `name=${queryObj.search}&`)
    sort && (query += `sort=${sort.value}&`)

    return query
}

function editUser(id) {
    router.push({ path: `/form/users/${id}` })
}

//#region Delete Product
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

async function deleteUser() {
    await userStore.deleteUser(activeDeleteId.value)

    if (userStore.error) {
        toast.error(userStore.error)
    } else {
        toast.success('Deleted user successfully')
    }
    confirmModal.value = false
    activeDeleteId.value = null
}
//#endregion

function addClickHandler() {
    router.push({ path: '/form/users' })
}
</script>

<template>
    <div class="px-8 m-0 mb-8">
        <div class="d-flex flex-column flex-md-row justify-space-between align-center ga-4 mb-8">
            <v-text-field
                v-model="search"
                :loading="userStore.loading"
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
            </v-text-field>

            <div class="d-flex ga-4 align-center">
                <FilterGenerator
                    :filter-options="filterOptions"
                    :filter-handler="filterUpdateHandler"
                />
                <v-btn
                    v-if="userStore.hasPermission('create_user')"
                    @click="addClickHandler"
                    prepend-icon="$plus"
                    size="large"
                    color="primary"
                >
                    Add New User
                </v-btn>
            </div>
        </div>
        <TableGenerator
            :data="userStore.users"
            :table-config="tableConfig"
            row-identifier="_id"
            :items-per-page="pageSize"
            :loading="userStore.loading"
            :total-items="userStore.totalUsers"
            :update-handler="tableUpdateHandler"
        />
        <div class="mt-4 d-flex justify-sm-end"></div>

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
                        <v-btn class="ms-auto" text="Confirm" @click="deleteUser"></v-btn>
                    </div>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>
