export function formatErrorMessage(msg) {
    if (!msg) return 'Unexpected error. Please try again.'

    const lower = msg.toLowerCase()

    if (
        lower.includes('duplicate') ||
        lower.includes('already exists') ||
        lower.includes('e11000')
    ) {
        return 'User already exists.'
    }

    if (lower.includes('network') || lower.includes('timeout')) {
        return 'Network error. Please check your connection.'
    }

    if (lower.includes('cast to objectid') || lower.includes('invalid id')) {
        return 'Invalid ID.'
    }

    if (
        lower.includes('validation failed') ||
        lower.includes('missing') ||
        lower.includes('required')
    ) {
        return 'Please fill in all required fields correctly.'
    }

    if (
        lower.includes('unauthorized') ||
        lower.includes('invalid token') ||
        lower.includes('invalid credentials')
    ) {
        return 'Invalid credentials. Please log in again.'
    }

    if (lower.includes('forbidden') || lower.includes('not allowed')) {
        return 'You do not have permission to perform this action.'
    }

    if (lower.includes('not found') || lower.includes('exist')) {
        return msg
        // return 'The requested resource was not found.'
    }

    if (lower.includes('internal server error')) {
        return 'Server error. Please try again later.'
    }
    if (lower.includes('uploading image') || lower.includes('uploading avatar')) {
        return 'Error uploading image. Please try again later.'
    }
    if (lower.includes('deleting image') || lower.includes('deleting avatar')) {
        return 'Error deleting image. Please try again later.'
    }

    return 'Something went wrong. Please try again.'
}
