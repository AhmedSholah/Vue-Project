<script setup>
import TextCell from './cellTypes/TextCell.vue'
import MenuCell from './cellTypes/MenuCell.vue'
import StatusCell from './cellTypes/StatusCell.vue'
import SelectCell from './cellTypes/SelectCell.vue'
import StatusSelectCell from './cellTypes/StatusSelectCell.vue'
import RatingCell from './cellTypes/RatingCell.vue'
import ObjectCell from './cellTypes/ObjectCell.vue'
import DateCell from './cellTypes/DateCell.vue'
import StringArrayCell from './cellTypes/StringArrayCell.vue'
import ImageCell from './cellTypes/ImageCell.vue'

// rowIdentifier is simply the name of the primary key of  the table
// i.e. in mongo it is usually the _id column
const props = defineProps({
    data: { type: Array, required: true },
    tableConfig: { type: Array, required: true },
    rowIdentifier: { type: String, required: true },
    itemsPerPage: { type: [Number], required: true },
    loading: { type: Boolean, required: true },
    updateHandler: { type: Function, required: true },
    totalItems: { type: [Number, null], required: true },
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
    rating: RatingCell,
    object: ObjectCell,
    date: DateCell,
    stringArray: StringArrayCell,
    image: ImageCell,
    // More components can be added here later
}

const headers = props.tableConfig.map((col) => col.header)
</script>

<template>
    <v-data-table-server
        style="border-radius: 16px; border: 1px solid #d1d1d1"
        :v-model:items-per-page="itemsPerPage"
        :items-length="totalItems || 0"
        :loading="loading"
        :updateHandler="updateHandler"
        :headers="headers"
        :items="data"
        :item-value="rowIdentifier"
        :item-key="rowIdentifier"
        @update:options="updateHandler"
    >
        <template v-slot:item="{ item }">
            <tr>
                <td v-for="col in tableConfig" :key="col.header.key + item[rowIdentifier]">
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
    </v-data-table-server>
</template>
