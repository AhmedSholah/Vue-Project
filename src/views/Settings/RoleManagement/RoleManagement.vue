<template>
    <v-skeleton-loader
        v-if="roleStore?.state?.loading"
        class="mx-auto border"
        type="card,chip"
    ></v-skeleton-loader>
    <v-card class="px-5 py-5 mb-5 mr-10" style="border-radius: 16px" elevation="3">
        <div v-for="(role, index) in roleStore.roles">
            <div class="d-flex justify-space-between">
                <div class="text-h5 font-weight-bold">
                    {{ role.name }}
                </div>

                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            :value="i"
                            @click="
                                item.title === 'Edit' ? editRole(role._id) : deleteRole(role._id)
                            "
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <div v-if="roleStore.roles[index].permissions.length === 0">No Permissions Found</div>
            <v-chip
                v-for="permission in roleStore.roles[index].permissions"
                :key="permission.id"
                color="primary"
            >
                {{ permission.name }}
            </v-chip>
            <v-chip v-if="roleStore.roles.permissions?.length > 0" color="primary">
                +{{ roleStore.roles[index].permissions?.length - 8 }} More
            </v-chip>

            <v-divider class="my-5"></v-divider>
        </div>
        <v-btn
            class="mt-5"
            variant="elevated"
            color="primary"
            type="submit"
            :loading="roleStore.loading"
            :disabled="roleStore.loading"
            style="height: 56px"
        >
            Create New Role
        </v-btn>
    </v-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoleStore } from '@/stores/roleStore'

const router = useRouter()

const items = [
    { title: 'Edit' },
    // , { title: 'Delete' }
]

const roleStore = useRoleStore()

function editRole(id) {
    console.log('edit', id)
    router.push('/settings/roles/edit/' + id)
}
function deleteRole(id) {
    console.log('delete')
}

onMounted(async () => {
    await roleStore.fetchRoles()
})
</script>
