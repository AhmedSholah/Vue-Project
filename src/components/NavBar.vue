<script setup>
import { computed, onMounted, ref, watch } from 'vue' // Added watch
import { useTheme } from 'vuetify'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const userStore = useUserStore()
const authStore = useAuthStore()

const emit = defineEmits(['toggle-drawer'])

const theme = useTheme()
const route = useRoute()

const isDarkMode = ref(false)

onMounted(async () => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
        isDarkMode.value = true
        theme.global.name.value = 'myCustomDarkTheme'
    } else {
        isDarkMode.value = false
        theme.global.name.value = 'myCustomLightTheme'
        if (!storedTheme) {
            localStorage.setItem('theme', 'light')
        }
    }
})

watch(isDarkMode, (newValue) => {
    if (newValue) {
        theme.global.name.value = 'myCustomDarkTheme'
        localStorage.setItem('theme', 'dark')
    } else {
        theme.global.name.value = 'myCustomLightTheme'
        localStorage.setItem('theme', 'light')
    }
})

const pageTitle = computed(() => {
    const path = route.path
    if (path === '/') return 'Dashboard'
    if (path.includes('products')) return 'Products'
    if (path.includes('orders')) return 'Orders'
    if (path.includes('users')) return 'Users'
    if (path.includes('settings')) return 'Settings'
    return 'Application'
})

function signOut() {
    authStore.logout()
}

function editProfile() {
    router.push('/form/users/' + userStore.currentUser?.currentUser._id)
}

const userMenu = [
    { title: 'Edit Profile', action: editProfile },
    { title: 'Sign Out', action: signOut },
]
</script>

<template>
    <v-app-bar elevation="0" class="border-b">
        <v-app-bar-nav-icon color="primary" @click="emit('toggle-drawer')" />

        <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>

        <v-spacer />

        <!-- <v-btn class="mr-" icon to="" router>
            <v-icon>theme-light-dark</v-icon>
        </v-btn> -->

        <v-btn
            @click="isDarkMode = !isDarkMode"
            :icon="isDarkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
            variant="tonal"
            :color="isDarkMode ? 'primary' : 'orange'"
            class="mx-3"
        ></v-btn>
        <!-- <v-switch v-model="isDarkMode" class="mt-5 mr-1" /> -->

        <div class="mr-4">
            <v-btn
                rounded="xl"
                size="large"
                class="pr-2 pl-4"
                variant="tonal"
                color="primary"
                block
                id="menu-activator"
            >
                <template #prepend>
                    <v-icon>mdi-cog-outline</v-icon>
                </template>

                <template #append>
                    <v-avatar size="28" class="mr-2">
                        <v-img
                            :src="
                                userStore.currentUser?.currentUser.avatarUrl ||
                                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                            "
                        />
                    </v-avatar>
                </template>
            </v-btn>
            <v-menu activator="#menu-activator">
                <v-list>
                    <v-list-item
                        @click="item.action"
                        v-for="(item, index) in userMenu"
                        :key="index"
                        :value="index"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>
</template>
