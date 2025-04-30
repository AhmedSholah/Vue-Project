<template>
    <v-card
        class="pa-3"
        rounded="xlg"
        :color="color"
        style="background-color: #ffffff; border: 1px solid #d1d1d1; box-shadow: none"
        elevation="0"
    >
        <v-row align="center" justify="space-between" class="no-wrap-row">
            <v-col cols="auto" class="d-flex align-center" style="white-space: nowrap">
                <div
                    class="font-weight-medium"
                    style="
                        color: #3e5677;
                        font-size: 1rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    "
                >
                    {{ title }}
                </div>
            </v-col>
            <v-col cols="auto" class="d-flex align-center" style="white-space: nowrap">
                <v-icon size="32" color="#95C2FF">{{ icon }}</v-icon>
            </v-col>
        </v-row>

        <div
            class="mt-2 text-h6 font-weight-bold"
            style="
                color: #0e2c55;
                font-size: 0.6rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            "
        >
            {{ value }}
        </div>
    </v-card>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    icon: { type: String, default: 'mdi-chart-bar' },
    color: { type: String, default: 'primary' },
})
</script>

<style scoped>
.v-card {
    border-radius: 12px;
    background-color: #f9f9f9;
}

.text-h6 {
    font-weight: bold;
}

.text-h4 {
    font-size: 0.6rem;
    font-weight: 600;
}
</style>
