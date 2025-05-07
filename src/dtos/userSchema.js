import { z } from 'zod'

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

const passwordSchema = z
    .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    })
    .min(8, 'Password must be at least 8 characters long')
    .max(256, 'Password must be at most 256 characters long')
    .refine(
        (val) =>
            /[A-Z]/.test(val) &&
            /[a-z]/.test(val) &&
            /[0-9]/.test(val) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(val) &&
            !/\s/.test(val),
        {
            message:
                'Password must include uppercase, lowercase, number, special character, and no spaces',
        },
    )

export const getUserSchema = (mode) =>
    z.object({
        name: z.preprocess(
            (val) => (typeof val === 'string' ? val.trim() : val),
            z
                .string({
                    required_error: 'Username is required',
                    invalid_type_error: 'Username must be a string',
                })
                .min(3, 'Username must be at least 3 characters long.')
                .max(16, 'Username must be at most 16 characters long'),
        ),

        provider: z.enum(['local', 'google']).default('local'),
        phoneNumber: z
            .union([
                z.string().length(11, 'Phone number must be 11 characters long'),
                z.literal('').transform(() => undefined),
                z.null().transform(() => undefined),
                z.undefined(),
            ])
            .optional(),

        address: z
            .union([
                z.string(),
                z.literal('').transform(() => undefined),
                z.null().transform(() => undefined),
                z.undefined(),
            ])
            .optional(),

        email: z.preprocess(
            (val) => (val === '' || val === null ? undefined : val),
            z
                .string({
                    required_error: 'Email is required',
                    invalid_type_error: 'Email must be a string',
                })
                .regex(emailRegex, 'Invalid email format'),
        ),

        tags: z.preprocess(
            (val) => (val === '' || val === null ? undefined : val),
            z
                .string({
                    required_error: 'Tag is required',
                    invalid_type_error: 'Tag must be a string',
                })
                .refine((val) => val === 'regular' || val === 'premium', {
                    message: 'Invalid tag value',
                }),
        ),

        password: z.preprocess(
            (val) => (val === '' || val === null ? undefined : val),
            mode === 'add' ? passwordSchema : passwordSchema.optional(),
        ),

        gender: z
            .preprocess(
                (val) => (val === '' || val === null ? undefined : val),
                z.enum(['male', 'female'], {
                    required_error: 'Gender is required',
                    invalid_type_error: 'Gender must be male or female',
                }),
            )
            .optional(),

        role: z
            .preprocess(
                (val) => (val === '' || val === null ? undefined : val),
                z.string({
                    required_error: 'Role is required',
                    invalid_type_error: 'Role must be a string',
                }),
            )
            .optional(),

        permissions: z
            .preprocess(
                (val) => (val === '' || val === null ? undefined : val),
                z.array(z.string()),
            )
            .optional(),

        wallet: z
            .preprocess(
                (val) => (val === '' || val === null ? undefined : val),
                z.coerce.number().min(0, 'Wallet balance must be 0 or more'),
            )
            .optional(),

        segments: z
            .preprocess(
                (val) => (val === '' || val === null ? undefined : val),
                z.array(
                    z.enum(
                        [
                            'new_customer',
                            'premium_user',
                            'high_spender',
                            'frequent_buyer',
                            'inactive',
                            'vip',
                        ],
                        {
                            required_error: 'Segment is required',
                            invalid_type_error: 'Segment must be a valid option',
                        },
                    ),
                ),
            )
            .optional(),
    })
