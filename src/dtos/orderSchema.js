import { z } from 'zod'

export const orderSchema = z.object({
    user: z.string().min(1, 'User ID is required'),
    shippingAddress: z.string().min(5),
    paymentMethod: z.preprocess(
        (val) => (val === null ? undefined : val),
        z.enum(['visa', 'paypal', 'cash', 'wallet'], {
            required_error: 'Payment method is required',
            invalid_type_error: 'Invalid payment method',
        }),
    ),
    paymentStatus: z.preprocess(
        (val) => (val === null ? undefined : val),
        z.enum(['pending', 'paid', 'refunded'], {
            required_error: 'Payment status is required',
            invalid_type_error: 'Invalid payment status',
        }),
    ),
    orderStatus: z.preprocess(
        (val) => (val === null ? undefined : val),
        z.enum(['processing', 'shipped', 'delivered', 'cancelled'], {
            required_error: 'Order status is required',
            invalid_type_error: 'Invalid order status',
        }),
    ),
    orderNumber: z.coerce.number(),
    totalPrice: z.coerce.number().nonnegative(),
    orderItems: z
        .array(
            z.object({
                product: z.preprocess(
                    (val) => (val === null || val === '' ? undefined : val),
                    z
                        .string({
                            required_error: 'Product ID is required',
                            invalid_type_error: 'Product ID must be a string',
                        })
                        .min(1, 'Product ID is required'),
                ),
                quantity: z.preprocess(
                    (val) => (val === null || val === '' ? undefined : val),
                    z.coerce
                        .number({
                            required_error: 'Quantity is required',
                            invalid_type_error: 'Quantity must be a positive number',
                        })
                        .min(1, 'Quantity must be at least 1'),
                ),
                price: z.preprocess(
                    (val) => (val === null || val === '' ? undefined : Number(val)),
                    z.coerce
                        .number({
                            required_error: 'Price is required',
                            invalid_type_error: 'Price must be a positive number',
                        })
                        .positive('Price must be a positive number')
                        .refine((val) => val > 0, 'Price must be greater than 0'),
                ),
            }),
        )
        .min(1, 'At least one order item is required'),
})
