<template>
    <v-container>
        <v-card elevation="2" class="pa-4">
            <v-card-title>Store Settings</v-card-title>
            <v-card-text>
                <v-expansion-panels>
                    <!-- General Info -->
                    <v-expansion-panel>
                        <v-expansion-panel-title>General Info</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-text-field label="Store Name" v-model="settings.storeName" />
                            <v-text-field label="Description" v-model="settings.description" />
                            <v-text-field label="Currency" v-model="settings.currency" />
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Payment Methods -->
                    <v-expansion-panel>
                        <v-expansion-panel-title>Payment Methods</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-checkbox label="Cash" v-model="settings.currency.cash" />
                            <v-checkbox
                                label="Credit Card"
                                v-model="settings.currency.creditCard"
                            />
                            <v-checkbox label="PayPal" v-model="settings.currency.paypal" />
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Shipping Methods -->
                    <v-expansion-panel>
                        <v-expansion-panel-title>Shipping Methods</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-checkbox
                                label="Local Delivery"
                                v-model="settings.shippingMethods.localDelivery"
                            />
                            <v-checkbox label="Pickup" v-model="settings.shippingMethods.pickup" />
                            <v-checkbox
                                label="International Shipping"
                                v-model="settings.shippingMethods.international"
                            />
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Contact Info -->
                    <v-expansion-panel>
                        <v-expansion-panel-title>Contact Info</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-text-field label="Phone" v-model="settings.phone" />
                            <v-text-field label="Email" v-model="settings.email" />
                            <v-text-field label="Address" v-model="settings.address" />
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Social Media Links -->
                    <!-- <v-expansion-panel>
                        <v-expansion-panel-title>Social Media</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-text-field label="Facebook" v-model="settings.social.facebook" />
                            <v-text-field label="Instagram" v-model="settings.social.instagram" />
                            <v-text-field label="Twitter" v-model="settings.social.twitter" />
                        </v-expansion-panel-text>
                    </v-expansion-panel> -->
                </v-expansion-panels>
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn :loading="loading" color="primary" @click="saveSettings">
                    Save Changes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '@/stores/storeSettings'
import { storeToRefs } from 'pinia'

const store = useSettingsStore()

const { settings, loading } = storeToRefs(store)

const { fetchSettings, updateSettings } = store

onMounted(() => {
    fetchSettings()
})

const saveSettings = async () => {
    await updateSettings(settings)
}
</script>
