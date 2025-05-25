<script setup>
const props = defineProps({
    value: { type: [String, Number], required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})

function selectHandler(obj) {
    props.options.handler(props.item[props.rowIdentifier], obj.id)
}
</script>
<template>
    <v-menu @update:model-value="">
        <template v-slot:activator="{ props }">
            <v-chip :color="options.variant[value]" v-bind="props"
                ><v-icon icon="mdi-circle-medium" start></v-icon>{{ value }}</v-chip
            >
        </template>

        <v-list @click:select="selectHandler">
            <v-list-item
                v-for="item in options.items"
                :key="rowIdentifier + item.value"
                :value="item.value"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
