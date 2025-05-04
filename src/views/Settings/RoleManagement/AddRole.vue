<template>
    <v-card class="px-5 py-5 mb-5 mr-10" style="border-radius: 16px" elevation="3">
        <div class="mb-5" style="font-size: 34px">Role Information</div>
        <v-form @submit.prevent="submit">
            <v-text-field
                variant="outlined"
                label="Role Name"
                :loading="loading"
                :disabled="loading"
                v-model="roleName.value.value"
                :error-messages="roleName.errorMessage.value"
                prepend-inner-icon="mdi mdi-alphabetical"
                required
            ></v-text-field>

            <v-select
                variant="outlined"
                label="Role Permissions"
                :loading="loading"
                :disabled="loading"
                v-model="permissionsDropDown"
                :items="permissionsStore.permissions"
                item-title="name"
                item-value="_id"
                chips
                multiple
            ></v-select>

            <v-btn
                class="mt-5"
                style="float: right; height: 56px"
                variant="elevated"
                color="primary"
                type="submit"
                :loading="loading"
            >
                Save
            </v-btn>
        </v-form>
    </v-card>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/stores/roleStore'
import { useField, useForm } from 'vee-validate'
import { usePermissionStore } from '@/stores/permissionStore'

const route = useRoute()
const roleId = route.params.id
const roleStore = useRoleStore()
const permissionsStore = usePermissionStore()

const loading = ref(false)
const permissionsDropDown = ref([])

watch(
    [() => permissionsStore.loading, () => roleStore.loading],
    ([permissionsLoading, rolesLoading]) => {
        loading.value = permissionsLoading || rolesLoading
    },
)

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
    if (permissionsStore.permissions.length === 0) {
        await permissionsStore.fetchPermissions()
    }
})

const submit = handleSubmit(async (values) => {
    loading.value = true
    const newRole = {
        name: values.roleName,
        permissions: permissionsDropDown.value,
    }
    await roleStore.updateRole(roleId, newRole)
    console.log('submitted')
})
</script>
