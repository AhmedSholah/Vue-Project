<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormStore } from '@/stores/formStore'
import { useUserStore } from '@/stores/userStore'
import { useRoleStore } from '@/stores/roleStore'
import { usePermissionStore } from '@/stores/permissionStore'
import { getUserSchema } from '@/dtos/userSchema'
import BaseImageUploadField from '@/components/form/fields/BaseImageUploadField.vue'
import GenericForm from '@/components/form/GenericForm.vue'

const formStore = useFormStore()
const userStore = useUserStore()
const roleStore = useRoleStore()
const permissionStore = usePermissionStore()
const router = useRouter()
const route = useRoute()
const userId = computed(() => route.params.id)
const isEditMode = computed(() => !!userId.value)
const mode = computed(() => (isEditMode.value ? 'edit' : 'add'))
const id = computed(() => userId.value)

const defaultValues = {
    name: '',
    provider: 'local',
    phoneNumber: '',
    address: '',
    tags: 'regular',
    email: '',
    password: '',
    avatar: '',
    gender: 'male',
    role: roleStore.roles.find((r) => r.name === 'customer')?._id || '',
    permissions: [],
    segments: [],
    wallet: 0,
}

const initialValues = computed(() => {
    const formValues = formStore.initialValues
    console.log('from computed', formValues)
    if (!formValues) return defaultValues

    const copied = JSON.parse(JSON.stringify(formValues))

    if (typeof copied.role === 'object') {
        copied.role = copied.role._id
    }

    if (Array.isArray(copied.permissions)) {
        copied.permissions = copied.permissions.map((p) => (typeof p === 'object' ? p._id : p))
    }

    return { ...defaultValues, ...copied }
})

const userFields = computed(() => [
    { type: 'input', props: { name: 'name', label: 'Name' }, required: true },
    { type: 'input', props: { name: 'email', label: 'Email', type: 'email' }, required: true },
    {
        type: 'input',
        props: { name: 'password', label: 'Password', type: 'password' },
        required: true,
    },
    { type: 'input', props: { name: 'phoneNumber', label: 'Phone Number' } },
    {
        type: 'radio',
        props: {
            name: 'gender',
            label: 'Gender',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
        },
        required: true,
    },
    {
        type: 'select',
        props: {
            name: 'role',
            label: 'Role',
            items: roleStore.roles.map((r) => ({ label: r.name, value: r._id })),
        },
        required: true,
    },
    {
        type: 'multiselect',
        props: {
            name: 'permissions',
            label: 'User Permissions',
            placeholder: 'Select Permissions',
            items: permissionStore.permissions.map((p) => ({
                label: p.name,
                value: p._id,
            })),
            chipClass: 'custom-chip',
        },
    },
    {
        type: 'select',
        props: {
            name: 'tags',
            label: 'User Type',
            items: [
                { label: 'Regular', value: 'regular' },
                { label: 'Premium', value: 'premium' },
            ],
        },
    },
    {
        type: 'multiselect',
        props: {
            name: 'segments',
            label: 'User Segments',
            placeholder: 'Insert Segment',
            items: [
                'new_customer',
                'premium_user',
                'high_spender',
                'frequent_buyer',
                'inactive',
                'vip',
            ],
            chipClass: 'custom-chip',
        },
    },
    { type: 'textarea', props: { name: 'address', label: 'Address', rows: 5 } },
])

const userAvatar = ref([])

let userSchema = getUserSchema(mode.value)

watch(mode, (newMode) => {
    userSchema = getUserSchema(newMode)
})

async function createUser(values) {
    userStore.loading = true
    userStore.error = false
    try {
        const createdUser = await userStore.createUser(values)
        console.log(createdUser)

        console.log('✅ Submitted (create):', values)
        userAvatar?.value.map(async (file) => {
            if (file.file) {
                await userStore.updateUserAvatar(createdUser.newUser.id, file.file)
            }
        })

        return createdUser
    } catch (err) {
        const errorMsg =
            userStore.error ||
            err.response?.data?.message ||
            err.message ||
            'Something went wrong.Please try again.'
        throw new Error(errorMsg)
    } finally {
        userStore.loading = false
    }
}

async function updateUser(id, values) {
    userStore.loading = true
    userStore.error = false
    try {
        const updatedUser = await userStore.updateUser(id, values)
        return updatedUser
    } catch (err) {
        const errorMsg =
            userStore.error ||
            err.response?.data?.message ||
            err.message ||
            'Something went wrong.Please try again.'
        throw new Error(errorMsg)
    } finally {
        userStore.loading = false
    }
}

function handleFormSubmit() {
    router.push('/users')
}

async function handleFileChange(files) {
    console.log('✅ File Changed:', files)
    if (mode.value === 'edit' && files[0].file) {
        await userStore.updateUserAvatar(userId.value, files[0].file)
    } else {
        userAvatar.value = files
    }
}

async function handleFileDelete() {
    await userStore.deleteUserAvatar(userId.value)
}

onMounted(async () => {
    await roleStore.fetchRoles()
    await permissionStore.fetchPermissions()

    const customerRoleId = roleStore.roles.find((r) => r.name === 'customer')?._id || ''

    if (isEditMode.value) {
        const user = await userStore.fetchUser(userId.value)
        if (userStore.selectedUser) {
            formStore.setInitialValues({
                ...defaultValues,
                ...userStore.selectedUser,
                role:
                    typeof userStore.selectedUser.role === 'object'
                        ? userStore.selectedUser.role._id
                        : userStore.selectedUser.role,
            })
            formStore.setMode('edit')
            userSchema = getUserSchema(formStore.mode)
        }
    } else {
        formStore.setInitialValues({
            ...defaultValues,
            role: customerRoleId,
        })
        formStore.setMode('add')
    }
    console.log('initial values =>', formStore.initialValues)
})
</script>

<template>
    <GenericForm
        title="User"
        :id="userId"
        :mode="mode"
        :loading="userStore.loading"
        :schema="userSchema"
        :initialValues="initialValues"
        :fields="userFields"
        :createHandler="createUser"
        :updateHandler="updateUser"
        @submitted="handleFormSubmit"
    >
        <template #sidebar>
            <BaseImageUploadField
                name="avatar"
                :allowMultiple="false"
                :initialImages="initialValues.avatarUrl"
                @onFileDelete="handleFileDelete"
                @onFileChange="handleFileChange"
            />
        </template>
    </GenericForm>
</template>
