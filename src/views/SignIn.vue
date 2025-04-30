<template>
    <v-card
        class="mx-auto mt-6 px-12 py-8"
        elevation="8"
        max-width="448"
        rounded="lg"
        :loading="authStore.loading"
    >
        <v-form @submit.prevent="submit">
            <h1 class="text-h4 font-weight-bold">Hi, Welcome Back</h1>
            <h2 class="text-h6 font-weight-bold">Log in to your account</h2>

            <v-alert
                v-if="authStore.error"
                class="my-5"
                :text="authStore.error"
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
                >Sign In</v-btn
            >
        </v-form>
    </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/authStore'

const shouldAutofocusEmail = !localStorage.getItem('email')

const authStore = useAuthStore()

const { values, handleSubmit } = useForm({
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
        email: localStorage.getItem('email') || '',
        rememberMe: !!localStorage.email,
    },
})

const email = useField('email')
const password = useField('password')
const rememberMe = useField('rememberMe')
const showPassword = ref(false)

const submit = handleSubmit(async (values) => {
    await authStore.login(values)

    if (!authStore.error) {
        if (values.rememberMe) {
            localStorage.setItem('email', values.email)
        } else {
            localStorage.removeItem('email')
        }
    }
})
</script>
