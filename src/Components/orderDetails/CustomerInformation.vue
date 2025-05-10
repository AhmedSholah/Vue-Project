<template>
    <v-card class="pa-4" elevation="1">
        <v-card-title class="text-h6 font-weight-bold">Customer Information</v-card-title>
        <v-card-text>
            <v-row align="center" no-gutters>
                <v-col cols="auto">
                    <v-avatar color="grey-lighten-3">
                        <v-icon color="primary">mdi-account</v-icon>
                    </v-avatar>
                </v-col>
                <v-col>
                    <div class="text-subtitle-1 font-weight-medium">ghada</div>
                    <div class="text-caption text-grey-darken-1">ghadah@gmail.com</div>
                </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <div class="mb-2">
                <strong>Gender</strong>
                <div>Female</div>
            </div>

            <div class="mb-4">
                <strong>Customer Tag</strong>
                <v-chip color="grey-lighten-3" label small class="mt-1">Regular</v-chip>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup></script>

<style scoped>
.v-avatar {
    margin-right: 10px;
}
</style>
