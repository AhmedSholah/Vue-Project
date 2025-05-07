import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue'

export const useFormStore = defineStore('formStore', () => {
    const state = reactive({
        mode: 'add',
        id: null,
    })

    const initialValues = ref(null)

    function setAddMode(values = null) {
        state.mode = 'add'
        state.id = null
        initialValues.value = values
    }

    function setEditMode(editId, values) {
        state.mode = 'edit'
        state.id = editId
        initialValues.value = values
    }

    function setInitialValues(values) {
        console.log('values sent to initial', values)
        initialValues.value = values
    }

    function setMode(mode) {
        state.mode = mode
    }

    function reset() {
        state.mode = 'add'
        state.id = null
        initialValues.value = null
    }

    return {
        ...toRefs(state),
        initialValues,
        setAddMode,
        setEditMode,
        reset,
        setInitialValues,
        setMode,
    }
})
