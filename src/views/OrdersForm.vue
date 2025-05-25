<template>
    <GenericForm
        title="Order"
        :id="orderId"
        :loading="orderStore.loading"
        :mode="mode"
        :initialValues="initialFormValues"
        :schema="orderSchema"
        :fields="orderFields"
        :createHandler="createOrder"
        :updateHandler="updateOrder"
        @submitted="onFormSubmitted"
    >
        <template #orderItems>
            <h4
                class="text-subtitle-1 font-weight-bold mb-2"
                style="color: var(--v-theme-headingColor)"
            >
                Order Items
            </h4>

            <div
                v-for="(item, index) in orderItems"
                :key="item.key"
                class="mb-4 pa-3 rounded d-flex flex-column gap-2"
                style="
                    background-color: var(--v-theme-surface-variant);
                    color: var(--v-theme-on-surface-variant);
                "
            >
                <BaseInputField
                    :name="`orderItems[${item.key}].product`"
                    label="Product ID"
                    :error-messages="
                        errors?.orderItems?.[item.key]?.product
                            ? [errors.orderItems[item.key].product]
                            : []
                    "
                    :required="true"
                />
                <BaseInputField
                    :name="`orderItems[${item.key}].quantity`"
                    label="Quantity"
                    type="number"
                    :error-messages="
                        errors?.orderItems?.[item.key]?.quantity
                            ? [errors.orderItems[item.key].quantity]
                            : []
                    "
                    :required="true"
                />
                <BaseInputField
                    :name="`orderItems[${item.key}].price`"
                    label="Price"
                    type="number"
                    :error-messages="
                        errors?.orderItems?.[item.key]?.price
                            ? [errors.orderItems[index].price]
                            : []
                    "
                    :required="true"
                />
                <div class="d-flex justify-end">
                    <v-btn
                        icon
                        color="error"
                        variant="text"
                        @click="removeItem(item.key)"
                        v-if="orderItems.length > 1"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
            </div>

            <v-btn color="secondary" class="mb-4" variant="text" @click="addItem">
                <v-icon start>mdi-plus</v-icon>Add Item
            </v-btn>
        </template>
    </GenericForm>
</template>

<script setup>
import { useFieldArray, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { computed, onMounted, ref, watch } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { orderSchema } from '@/dtos/orderSchema'
import GenericForm from '@/components/form/GenericForm.vue'
import BaseInputField from '@/components/form/fields/BaseInputField.vue'
import { useFormStore } from '@/stores/formStore'
import { useRoute, useRouter } from 'vue-router'

const orderStore = useOrderStore()
const formStore = useFormStore()

const initialValues = {
    user: '',
    shippingAddress: '',
    paymentMethod: 'visa',
    paymentStatus: 'pending',
    orderStatus: 'processing',
    orderNumber: 0,
    totalPrice: 0,
    orderItems: [{ id: crypto.randomUUID(), product: '', quantity: 1, price: 0 }],
}

const route = useRoute()
const router = useRouter()
const orderId = computed(() => route.params.id)
const isEditMode = computed(() => !!orderId.value)
const mode = computed(() => formStore.mode)
const id = computed(() => formStore.id)
const initialFormValues = computed(() => {
    const formValues = formStore.initialValues

    if (!formStore.initialValues) return initialValues

    const copied = JSON.parse(JSON.stringify(formStore.initialValues))

    copied.orderItems = copied.orderItems.map((item) => ({
        id: crypto.randomUUID(),
        ...item,
        product: typeof item?.product === 'object' ? item?.product?._id : item?.product,
    }))
    copied.user = typeof copied.user === 'object' ? copied.user._id : copied.user

    console.log(copied)
    return copied
})

const { handleSubmit, errors, values } = useForm({
    validationSchema: toTypedSchema(orderSchema),
    initialValues: initialFormValues.value,
})
const paymentMethods = [
    { label: 'Visa', value: 'visa' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Cash', value: 'cash' },
    { label: 'Wallet', value: 'wallet' },
]
const paymentStatuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Paid', value: 'paid' },
    { label: 'Refunded', value: 'refunded' },
]

const orderStatuses = [
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
]

const orderFields = ref([
    { type: 'input', props: { name: 'user', label: 'User ID' }, required: true },
    {
        type: 'textarea',
        props: { name: 'shippingAddress', label: 'Shipping Address', rows: 3 },
        required: true,
    },
    {
        type: 'select',
        props: { name: 'orderStatus', label: 'Order Status', items: orderStatuses },
        required: true,
    },
    {
        type: 'select',
        props: { name: 'paymentMethod', label: 'Payment Method', items: paymentMethods },
        required: true,
    },
    {
        type: 'select',
        props: { name: 'paymentStatus', label: 'Payment Status', items: paymentStatuses },
        required: true,
    },
    // { type: 'input', props: { name: 'orderNumber', label: 'Order Number', type: 'number' } },
    { type: 'input', props: { name: 'totalPrice', label: 'Total price', type: 'number' } },
])
const { fields: orderItems, push, remove } = useFieldArray('orderItems')

const addItem = () => {
    const newItem = { id: crypto.randomUUID(), product: '', quantity: 1, price: 0 }
    console.log('Adding new item:', newItem)
    push(newItem)
    console.log('Order Items after adding:', orderItems.value)
}

const removeItem = (itemKey) => {
    const index = orderItems.value.findIndex((item) => item.key === itemKey)
    console.log('Item to remove:', itemKey, 'Index:', index, 'Order Items:', orderItems.value)
    if (index !== -1) {
        remove(index)
        console.log('Updated Order Items:', orderItems.value)
    }
}

watch(orderItems, (newItems) => {
    console.log('Updated Order Items:', newItems)
})

async function submitForm(values) {
    const {
        customerName,
        customerEmail,
        product,
        quantity,
        shippingAddress,
        shippingCost,
        totalAmount,
        status,
        orderDate,
        deliveryDate,
    } = values
    const formData = {
        customerName,
        customerEmail,
        product,
        quantity,
        shippingAddress,
        shippingCost,
        totalAmount,
        status,
        orderDate,
        deliveryDate,
    }

    console.log(formData)
    await orderStore.createOrder(formData)
}
const createOrder = async (orderData) => {
    orderStore.loading = true
    orderStore.error = null
    try {
        const createdOrder = await orderStore.createOrder(orderData)
        return createdOrder
    } catch (err) {
        const errorMsg =
            orderStore.error ||
            err.response?.data?.message ||
            err.message ||
            'Something went wrong.Please try again.'
        throw new Error(errorMsg)
    } finally {
        orderStore.loading = false
    }
}

const updateOrder = async (orderId, data) => {
    orderStore.loading = true
    orderStore.error = null
    try {
        const updatedOrder = await orderStore.updateOrder(orderId, data)
        return updatedOrder
    } catch (err) {
        const errorMsg =
            err.response?.data?.message || err.message || 'Something went wrong.Please try again.'
        orderStore.error = errorMsg
        throw new Error(errorMsg)
    } finally {
        orderStore.loading = false
    }
}

function onFormSubmitted(payload) {
    router.push('/orders')
}

onMounted(async () => {
    if (isEditMode.value) {
        const order = await orderStore.fetchOrder(orderId.value)
        console.log(orderStore.selectedOrder)
        if (orderStore.selectedOrder) {
            formStore.setInitialValues(orderStore.selectedOrder)
            formStore.setMode('edit')
        }
    } else {
        formStore.setInitialValues(initialValues)
        formStore.setMode('add')
    }
})
</script>
