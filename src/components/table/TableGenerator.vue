<script setup>
import TextCell from './cellTypes/TextCell.vue'
import MenuCell from './cellTypes/MenuCell.vue'
import StatusCell from './cellTypes/StatusCell.vue'
import SelectCell from './cellTypes/SelectCell.vue'
import StatusSelectCell from './cellTypes/StatusSelectCell.vue'

// rowIdentifier is simply the name of the primary key of  the table
// i.e. in mongo it is usually the _id column
const props = defineProps({
    data: { type: Array, required: true },
    columnsConfig: { type: Array, required: true },
    rowIdentifier: { type: String, required: true },
})

/**
 * Any component here will be given 5 props
 * 1. value: the current value of the cell
 * 2. item: the current row
 * 3. colName: the name of the current column/key in the row
 * 4. rowIdentifier: the name of the identifier of the table, for example _id in mongo
 * 5. options: an object with data that helps add utility and customization to the cell
 * options objects vary depending on what type of cell you are generating
 * you can find more specific docs about options in each cell type in their component file
 */
const componentMap = {
    text: TextCell,
    menu: MenuCell,
    status: StatusCell,
    statusSelect: StatusSelectCell,
    select: SelectCell,
    // More components can be added here later
}

const headers = props.columnsConfig.map((col) => col.header)
</script>

<template>
    <v-data-table :headers="headers" :items="data" item-key="rowIdentifier">
        <template v-slot:item="{ item }">
            <tr>
                <td v-for="col in columnsConfig" :key="col.header.key + item[rowIdentifier]">
                    <component
                        :is="componentMap[col.type]"
                        :value="item[col.header.key]"
                        :item="item"
                        :colName="col.header.key"
                        :options="col.options || {}"
                        :rowIdentifier="rowIdentifier"
                    />
                </td>
            </tr>
        </template>
    </v-data-table>
</template>
