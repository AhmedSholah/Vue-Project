<script setup>
import { reactive, ref } from 'vue'
import SelectFilter from './filterTypes/SelectFilter.vue'
import { useDisplay } from 'vuetify/lib/composables/display'

const { mobile } = useDisplay()

const props = defineProps({
    filterOptions: { type: Array, required: true },
})

const toggled = ref(null)
function toggleFilter() {
    toggled.value = !toggled.value
}

const componentMap = {
    select: SelectFilter,
}

const filterValues = reactive({})

function applyFilters() {
    console.log(filterValues)
}
</script>
<template>
    <v-btn @click.stop="toggleFilter" color="primary">Filter</v-btn>

    <v-navigation-drawer v-model="toggled" temporary location="right" class="" :width="320">
        <v-list>
            <v-list-item class="border-b mb-4">
                <div class="d-flex justify-space-between align-center">
                    <v-list-item-title class="text-h6">Filters</v-list-item-title>

                    <v-btn icon @click="toggleFilter" variant="text" color="grey-darken-1">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-list-item>
            <div v-for="filter in filterOptions" :key="filter.title" class="px-4">
                <component
                    :is="componentMap[filter.type]"
                    :label="filter.label"
                    :options="filter.options"
                    v-model="filterValues[filter.name]"
                />
            </div>
        </v-list>
        <v-list-item>
            <v-btn color="primary" @click="applyFilters" class="w-100">Apply</v-btn>
        </v-list-item>
    </v-navigation-drawer>
</template>
