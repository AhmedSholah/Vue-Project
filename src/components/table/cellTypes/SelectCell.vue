<script setup>
import { ref } from 'vue'

const props = defineProps({
    value: { type: [String, Number], required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})

const data = ref(props.options.label)
</script>
<template>
    <v-select
        :items="options.items"
        :density="options.density"
        :label="options.label"
        :variant="options.variant"
        @update:model-value="options.handler(item[rowIdentifier], data)"
        v-model="data"
    >
    </v-select>
</template>
