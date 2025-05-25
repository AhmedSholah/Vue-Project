<template>
    <v-container style="height: 100vh" class="d-flex justify-center align-center">
        <v-card class="mx-auto px-12 py-8" elevation="8" rounded="lg" :loading="authStore.loading">
            <v-form @submit.prevent="submit">
                <h1 class="text-h4 font-weight-bold">Hi, Welcome Back</h1>
                <h2 class="text-body-1 font-weight-bold mb-5">Log in to your account</h2>

                <v-alert
                    v-if="authStore.error"
                    class="mb-5"
                    :text="errorMessage"
                    type="error"
                ></v-alert>

                <v-text-field
                    class="mt-3"
                    variant="outlined"
                    v-model="email.value.value"
                    label="Email"
                    :readonly="authStore.loading"
                    :disabled="authStore.loading"
                    :error-messages="email.errorMessage.value"
                    required
                    prepend-inner-icon="mdi-email-outline"
                    :autofocus="shouldAutofocusEmail"
                />

                <v-text-field
                    class="mt-3"
                    variant="outlined"
                    v-model="password.value.value"
                    label="Password"
                    :readonly="authStore.loading"
                    :disabled="authStore.loading"
                    :error-messages="password.errorMessage.value"
                    required
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                    prepend-inner-icon="mdi-lock-outline"
                />

                <v-checkbox-btn
                    class="mt-2"
                    label="Remember me?"
                    color="primary"
                    density="compact"
                    v-model="rememberMe.value.value"
                    :error-messages="rememberMe.errorMessage.value"
                ></v-checkbox-btn>

                <v-btn
                    class="mt-5"
                    variant="elevated"
                    color="primary"
                    type="submit"
                    :loading="authStore.loading"
                    block
                    style="height: 56px"
                    >Sign In</v-btn
                >
            </v-form>
        </v-card>
    </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const shouldAutofocusEmail = !localStorage.getItem('email')

const authStore = useAuthStore()

onMounted(() => {
    if (localStorage.getItem('token')) {
        router.push('/')
    }
})

const { handleSubmit } = useForm({
    validationSchema: {
        email(value) {
            if (!value) return 'Email is required'
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Must be a valid e-mail.'
            return true
        },
        password(value) {
            if (!value) return 'Password is required'
            if (value.length < 2) return 'Password must be at least 2 characters'
            return true
        },
    },
    initialValues: {
        email: localStorage.getItem('email') || 'superAdmin123@gmail.com',
        password: "superAdmin123@gmail.com",
        rememberMe: !!localStorage.email,
    },
})

const email = useField('email')
const password = useField('password')
const rememberMe = useField('rememberMe')
const showPassword = ref(false)
const errorMessage = ref('')

const submit = handleSubmit(async (values) => {
    await authStore.login(values)
    if (authStore.error === 'Invalid Credentials') {
        errorMessage.value = 'Invalid Credentials'
    } else {
        errorMessage.value = 'Something went wrong. Please try again later.'
    }

    if (!authStore.error) {
        if (values.rememberMe) {
            localStorage.setItem('email', values.email)
        } else {
            localStorage.removeItem('email')
        }
    }
})
</script>
