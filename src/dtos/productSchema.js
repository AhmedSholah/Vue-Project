import { z } from 'zod'

export const productSchema = z.object({
    name: z.preprocess(
        (val) => (typeof val === 'string' ? val.trim() : val),
        z.string().min(1, 'Product name is required'),
    ),

    price: z.preprocess(
        (val) => (val === '' ? undefined : Number(val)),
        z
            .number({
                required_error: 'Price is required',
                invalid_type_error: 'Price must be a number',
            })
            .positive('Price must be a positive number')
            .refine((val) => val > 0, 'Price must be greater than 0'),
    ),

    quantity: z.preprocess(
        (val) => (val === '' ? undefined : Number(val)),
        z
            .number({
                required_error: 'Quantity is required',
                invalid_type_error: 'Quantity must be a number',
            })
            .min(1, 'Quantity must be at least 1'),
    ),

    description: z.string().min(10, 'Description must be at least 10 characters'),
    // images: z
    //     .array(
    //         z.object({
    //             file: z.any(),
    //             preview: z.string(),
    //         }),
    //     )
    //     .optional(),

    tags: z.array(z.string()).optional(),
    category: z.string().min(1, 'Category is required'),

    colors: z.array(z.string()).optional(),
    shippingInfo: z.object({
        shippingCost: z.preprocess(
            (val) => (val === '' ? undefined : Number(val)),
            z
                .number({ required_error: 'Shipping Cost is required' })
                .positive('Shipping Cost must be a positive number')
                .nullable(),
        ),
        estimatedDelivery: z.preprocess(
            (val) => (val === '' ? undefined : Number(val)),
            z
                .number({ required_error: 'Estimated Delivery is required' })
                .positive('Estimated Delivery time must be a number')
                .nullable(),
        ),
    }),
})
