<script setup>
import { reactive, ref } from 'vue'
import SelectFilter from './filterTypes/SelectFilter.vue'
import CheckFilter from './filterTypes/CheckFilter.vue'
import RadioGroup from './filterTypes/RadioGroupFilter.vue'
import RangeFilter from './filterTypes/RangeFilter.vue'
import MultiSelectFilter from './filterTypes/MultiSelectFilter.vue'
import DateFilter from './filterTypes/DateFilter.vue'

const resetKey = ref(0)

const props = defineProps({
    filterOptions: { type: Array, required: true },
    filterHandler: { type: Function, required: true },
})

const toggled = ref(null)
function toggleFilter() {
    toggled.value = !toggled.value
}

const componentMap = {
    select: SelectFilter,
    check: CheckFilter,
    radio: RadioGroup,
    range: RangeFilter,
    multiSelect: MultiSelectFilter,
    date: DateFilter,
}

const filterValues = reactive({})

function applyFilters() {
    props.filterHandler(filterValues)
}

function resetFilters() {
    Object.keys(filterValues).map((item) => delete filterValues[item])
    props.filterHandler({})

    resetKey.value++
}
</script>
<template>
    <v-btn @click.stop="toggleFilter" color="primary" size="large">Filter</v-btn>

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
                    :key="filter.label + resetKey"
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
        <v-list-item>
            <v-btn @click="resetFilters" class="w-100">Reset</v-btn>
        </v-list-item>
    </v-navigation-drawer>
</template>
