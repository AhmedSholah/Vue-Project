<script setup>
import GenericForm from '@/components/form/GenericForm.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { productSchema } from '@/dtos/productSchema'
import BaseImageUploadField from '@/components/form/fields/BaseImageUploadField.vue'

import { useFormStore } from '@/stores/formStore'
const formStore = useFormStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()

const mode = computed(() => formStore.mode)
const id = computed(() => formStore.id)

const router = useRouter()
const route = useRoute()
const productId = computed(() => route.params.id)
const isEditMode = computed(() => !!productId.value || !!id.value)
const productImages = ref([])
const isImageUploading = ref(true)

const defaultValues = {
    name: '',
    price: '',
    quantity: '',
    description: '',
    images: [],
    tags: [],
    colors: [],
    category: '',
    shippingInfo: {
        shippingCost: '',
        estimatedDelivery: '',
    },
}

const initialValues = computed(() => {
    const formValues = formStore.initialValues

    if (!formValues) return defaultValues

    const copied = JSON.parse(JSON.stringify(formValues))

    if (typeof copied.category === 'object' && copied.category !== null) {
        copied.category = copied.category._id
    }

    const shippingCost = copied.shippingInfo?.shippingCost || ''
    const estimatedDelivery = copied.shippingInfo?.estimatedDelivery || ''

    return {
        ...defaultValues,
        ...copied,
        shippingInfo: {
            shippingCost,
            estimatedDelivery,
        },
    }
})

const productFields = computed(() => [
    { type: 'input', props: { name: 'name', label: 'Name' }, required: true },
    {
        type: 'textarea',
        props: { name: 'description', label: 'Description', rows: 5 },
        required: true,
    },
    { type: 'input', props: { name: 'price', label: 'Price', type: 'number' }, required: true },
    {
        type: 'input',
        props: { name: 'quantity', label: 'Quantity', type: 'number' },
        required: true,
    },
    {
        type: 'select',
        props: {
            name: 'category',
            label: 'Category',
            items: categoryStore.categories.map((c) => ({
                label: c.name,
                value: c._id,
            })),
        },
        required: true,
    },
    {
        type: 'input',
        props: { name: 'shippingInfo.shippingCost', label: 'Shipping Cost', type: 'number' },
        required: true,
    },
    {
        type: 'input',
        props: {
            name: 'shippingInfo.estimatedDelivery',
            label: 'Estimated Delivery In',
            type: 'number',
        },
        required: true,
    },
    {
        type: 'multiselect',
        props: {
            name: 'tags',
            label: 'Product Tags',
            placeholder: 'Insert Tag',
            items: [
                'new_arrival',
                'sale',
                'eco_friendly',
                'limited_edition',
                'handmade',
                'bestseller',
            ],
            chipClass: 'custom-chip',
        },
    },
    {
        type: 'multiselect',
        props: {
            name: 'colors',
            label: 'Product Colors',
            placeholder: 'Insert Color',
            items: [
                'Black',
                'White',
                'Gray',
                'Red',
                'Green',
                'Blue',
                'Yellow',
                'Orange',
                'Purple',
                'Pink',
                'Brown',
                'Cyan',
                'Magenta',
                'Navy',
                'Olive',
                'Teal',
                'Maroon',
                'Lime',
                'Indigo',
                'Turquoise',
            ],
            chipClass: 'custom-chip',
        },
    },
])

//<<<<<<< feature/forms
async function updateProduct(id, values) {
    productStore.loading = true
    productStore.error = false
    try {
        const updatedProduct = await productStore.updateProduct(id, values)
        return updatedProduct
    } catch (err) {
        const errorMsg =
            productStore.error ||
            err.response?.data?.message ||
            err.message ||
            'Something went wrong.Please try again.'
        throw new Error(errorMsg)
    } finally {
        productStore.loading = false
    }}
//=======
//async function createProduct(values) {
 //   const res = await productStore.createProduct(values)
 //   isImageUploading.value = true
//    productImages.value?.map(async (file) => {
//        await productStore.uploadProductImage(res.data.id, file.file)
 //   })
 //   isImageUploading.value = false
//>>>>>>> develop


async function createProduct(values) {
    productStore.loading = true
    productStore.error = false
    try {
        const createdProduct = await productStore.createProduct(values)
         const res = await productStore.createProduct(values)
    productImages.value?.map(async (file) => {
        await productStore.uploadProductImage(res.data.id, file.file)
    })
        return createdProduct
    } catch (err) {
        const errorMsg =
            productStore.error ||
            err.response?.data?.message ||
            err.message ||
            'Something went wrong.Please try again.'
        throw new Error(errorMsg)
    } finally {
        productStore.loading = false
    }
}

function handleFormSubmit() {
    router.push('/products')
}

async function handleFileChange(files) {
    console.log('✅ File Changed:', files)
    // if (isEditMode.value && files[files.length - 1].file) {
    // } else {
    productImages.value = files
    // }
}

async function handleFileUpload(file) {
    console.log('✅ File Uploaded:', file.file)
    isImageUploading.value = true
    await productStore.uploadProductImage(productId.value, file.file)
    isImageUploading.value = false
}

async function handleFileDelete(index) {
    if (isEditMode.value) {
        await productStore.deleteProductImage(productId.value, index)
    }
}


onMounted(async () => {
    await categoryStore.fetchCategories()
    console.log(productId.value)
    if (isEditMode.value) {
        const product = await productStore.fetchProduct(productId.value)
        console.log(productStore.product)
        if (productStore.product) {
            formStore.setInitialValues(productStore.product)
            console.log(formStore.initialValues, 8888888)
            formStore.setMode('edit')
        }
    } else {
        formStore.setInitialValues(defaultValues)
        formStore.setMode('add')
    }
})
</script>

<template>
    <GenericForm
        title="Product"
        :mode="mode"
        :id="productId"
        :schema="productSchema"
        :initialValues="initialValues"
        :fields="productFields"
        :createHandler="createProduct"
        :updateHandler="updateProduct"
        @submitted="handleFormSubmit"
        :loading="productStore.loading"
    >
        <template #sidebar>
            <BaseImageUploadField
                name="images"
                :allowMultiple="true"
                :initialImages="initialValues.images"
                @onFileChange="handleFileChange"
                @onFileDelete="handleFileDelete"
                @onFileUpload="handleFileUpload"
                :loading="isImageUploading.value"
            />
        </template>
    </GenericForm>
</template>
