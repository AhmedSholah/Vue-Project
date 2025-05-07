<template>
    <GenericForm
        title="Order"
        :id="orderId"
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
                :key="index"
                class="mb-4 pa-3 rounded d-flex flex-column gap-2"
                style="
                    background-color: var(--v-theme-surface-variant);
                    color: var(--v-theme-on-surface-variant);
                "
            >
                <BaseInputField
                    :name="`orderItems[${index}].product`"
                    label="Product ID"
                    :error-messages="
                        errors?.orderItems?.[index]?.product
                            ? [errors.orderItems[index].product]
                            : []
                    "
                />
                <BaseInputField
                    :name="`orderItems[${index}].quantity`"
                    label="Quantity"
                    type="number"
                    :error-messages="
                        errors?.orderItems?.[index]?.quantity
                            ? [errors.orderItems[index].quantity]
                            : []
                    "
                />
                <BaseInputField
                    :name="`orderItems[${index}].price`"
                    label="Price"
                    type="number"
                    :error-messages="
                        errors?.orderItems?.[index]?.price ? [errors.orderItems[index].price] : []
                    "
                />
                <div class="d-flex justify-end">
                    <v-btn
                        icon
                        color="error"
                        variant="text"
                        @click="removeItem(index)"
                        v-if="initialFormValues?.orderItems.length > 1"
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
import { useRoute } from 'vue-router'

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
    orderItems: [{ product: '', quantity: 1, price: 0 }],
}
const route = useRoute()

const orderId = computed(() => route.params.id)
const isEditMode = computed(() => !!orderId.value)
const mode = computed(() => formStore.mode)
const id = computed(() => formStore.id)
const initialFormValues = computed(() => {
    const formValues = formStore.initialValues

    if (!formStore.initialValues) return initialValues

    const copied = JSON.parse(JSON.stringify(formStore.initialValues))

    copied.orderItems = copied.orderItems.map((item) => ({
        ...item,
        product: typeof item.product === 'object' ? item.product._id : item.product,
    }))
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
    { type: 'input', props: { name: 'user', label: 'User ID' } },
    { type: 'textarea', props: { name: 'shippingAddress', label: 'Shipping Address', rows: 3 } },
    {
        type: 'select',
        props: { name: 'orderStatus', label: 'Order Status', items: orderStatuses },
    },
    {
        type: 'select',
        props: { name: 'paymentMethod', label: 'Payment Method', items: paymentMethods },
    },
    {
        type: 'select',
        props: { name: 'paymentStatus', label: 'Payment Status', items: paymentStatuses },
    },
    { type: 'input', props: { name: 'orderNumber', label: 'Order Number', type: 'number' } },
    { type: 'input', props: { name: 'totalPrice', label: 'Total price', type: 'number' } },
])
const { fields: orderItems, push, remove } = useFieldArray('orderItems')

const addItem = () => {
    push({ product: '', quantity: 1, price: 0 })
}

const removeItem = (index) => {
    if (orderItems.value.length > 1) remove(index)
}
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
async function createOrder(values) {
    console.log(values)
    const {
        user,
        shippingAddress,
        paymentMethod,
        paymentStatus,
        orderStatus,
        orderNumber,
        totalPrice,
        orderItems,
    } = values

    const formData = {
        user,
        shippingAddress,
        paymentMethod,
        paymentStatus,
        orderStatus,
        orderNumber,
        totalPrice,
        orderItems,
    }
    console.log(formData)
    await orderStore.createOrder(formData)
}

async function updateOrder(orderId, values) {
    await orderStore.updateOrder(orderId, values)
}

function onFormSubmitted(payload) {}

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
