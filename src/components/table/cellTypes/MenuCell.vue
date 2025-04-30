<script setup>
/**
 * Options:
 * - actions: [{title: 'Edit', action: editProduct}, {title: 'Delete', action: deleteProduct}]
 *   Array of action objects, each object will have a title and callback function to call when it is clicked
 *
 * When items call the passed function, the only parameter they will pass is the identifier of the row
 * So for example when editProduct is called it will be given the id of the current row, editProduct(item.id)
 * this is done implicitly and should be consistent across any method given to table generators
 */
const props = defineProps({
    value: { type: [String, Number], required: false },
    options: { type: Object, required: true },
    item: { type: Object, required: true },
    colName: { type: String, required: true },
    rowIdentifier: { type: [String, Number], required: true },
})
</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
        </template>

        <v-list>
            <v-list-item
                v-for="(menuItem, i) in options.actions"
                :key="i"
                @click="menuItem.action(item[rowIdentifier])"
            >
                <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
