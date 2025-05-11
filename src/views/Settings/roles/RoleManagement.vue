<template>
    <v-card class="px-5 py-5 mb-5 border" style="border-radius: 16px">
        <v-skeleton-loader
            v-if="roleStore?.loading"
            v-for="i in 3"
            class="mx-auto border h-5"
            type="paragraph,chip"
        ></v-skeleton-loader>
        <div v-else v-for="(role, index) in roleStore.roles">
            <div class="d-flex justify-space-between">
                <div class="text-h5 font-weight-bold">
                    {{ role.name }}
                </div>

                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="editRole(role._id)">
                            <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>
                        <v-dialog max-width="500">
                            <template v-slot:activator="{ props: activatorProps }">
                                <v-list-item v-bind="activatorProps">
                                    <v-list-item-title>Delete</v-list-item-title>
                                </v-list-item>
                            </template>

                            <template v-slot:default="{ isActive }">
                                <v-card title="Confirm Deletion">
                                    <v-card-text>
                                        Are you sure you want to delete this role? This action
                                        cannot be undone.
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="grey"
                                            text="Cancel"
                                            @click="isActive.value = false"
                                        ></v-btn>
                                        <v-btn
                                            color="red"
                                            text="Delete"
                                            @click="
                                                () => {
                                                    confirmDelete(role._id)
                                                    isActive.value = false
                                                }
                                            "
                                        ></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                    </v-list>
                </v-menu>
            </div>

            <div v-if="roleStore.roles[index].permissions.length === 0">No Permissions Found</div>
            <div>
                <v-chip
                    v-for="permission in roleStore.roles[index].permissions.slice(0, 6)"
                    class="mr-2 my-1"
                    :key="permission.id"
                    color="primary"
                >
                    {{ permission.name }}
                </v-chip>
                <v-chip v-if="roleStore.roles[index].permissions?.length > 6" color="primary">
                    +{{ roleStore.roles[index].permissions?.length - 6 }} More
                </v-chip>
            </div>

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
            @click="router.push('/settings/roles/create')"
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

const roleStore = useRoleStore()

function editRole(id) {
    router.push('/settings/roles/edit/' + id)
}
async function confirmDelete(id) {
    await roleStore.deleteRole(id)
    if (roleStore.error) {
        console.log(roleStore.error)
    }
}

onMounted(async () => {
    await roleStore.fetchRoles()
})
</script>
