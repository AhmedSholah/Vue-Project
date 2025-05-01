<template>
    <v-card class="px-5 py-5 mb-5 mr-10" style="border-radius: 16px" elevation="3">
        <div class="mb-5" style="font-size: 34px">Role Information</div>
        <v-form @submit.prevent="submit">
            <v-text-field
                variant="outlined"
                label="Role Name"
                :loading="roleStore.loading"
                :disabled="roleStore.loading"
                v-model="roleName.value.value"
                :error-messages="roleName.errorMessage.value"
                prepend-inner-icon="mdi mdi-alphabetical"
                required
            ></v-text-field>

            <!-- <v-select
                variant="outlined"
                label="Role Permissions"
                :loading="roleStore.loading"
                :disabled="roleStore.loading"
                :v-model="rolePermissions?.value?.value?.map((p) => p.name)"
                :items="rolePermissions?.value?.value?.map((p) => p.name)"
                chips
                multiple
            ></v-select> -->

            <v-btn
                class="mt-5"
                style="float: right"
                variant="elevated"
                color="primary"
                type="submit"
                :loading="roleStore.loading"
            >
                Save
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/stores/roleStore'
import { useField, useForm } from 'vee-validate'
import { usePermissionStore } from '@/stores/permissionStore'

const route = useRoute()
const roleId = route.params.id
const roleStore = useRoleStore()
const permissionsStore = usePermissionStore()

const { handleSubmit } = useForm({
    validationSchema: {
        roleName(value) {
            if (!value) return 'Role Name is required'
            if (!/^[a-zA-Z]+$/.test(value)) return 'Role name must contain only letters'
            return true
        },
        rolePermissions(value) {
            if (!value) return 'Role Permissions is required'
            return true
        },
    },
})

const roleName = useField('roleName')
const rolePermissions = useField('rolePermissions')

onMounted(async () => {
    if (roleStore.roles.length === 0) {
        await roleStore.fetchRoles()
    }
    // if (permissionsStore.permissions.length === 0) {
    await permissionsStore.fetchPermissions()
    console.log(permissionsStore.permissions)
    // }
    const role = roleStore.roles.find((r) => r._id == roleId)
    roleName.value.value = role.name
    rolePermissions.value.value = role.permissions
})

const submit = handleSubmit(async (values) => {
    console.log(values)
})
</script>
