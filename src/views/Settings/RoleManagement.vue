<template>
    <!-- <v-skeleton-loader
        :v-if="roleStore?.state?.loading"
        class="mx-auto border"
        type="card,chip"
    ></v-skeleton-loader> -->
    <v-card
        v-for="(role, index) in roleStore.roles"
        class="mb-5"
        :title="roleStore.roles[index].name"
        variant="tonal"
        color="primary"
        elevation="3"
    >
        <v-chip-group>
            <v-chip v-for="permission in roleStore.roles[index].permissions">Chip 1</v-chip>
        </v-chip-group>
    </v-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'

const roleStore = useRoleStore()

onMounted(async () => {
    await roleStore.fetchRoles()
    console.log(roleStore.roles)
})
</script>
