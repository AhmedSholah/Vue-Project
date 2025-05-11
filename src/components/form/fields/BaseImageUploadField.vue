<template>
    <span v-if="required" class="required-asterisk">*</span>

    <div class="image-upload-wrapper">
        <h3 class="text-h6 font-weight-bold mb-4">Images</h3>

        <v-btn
            @click="triggerFileInput"
            prepend-icon="mdi-upload"
            class="upload-btn mb-4 bg-primary"
            height="42"
            :loading="props.loading"
        >
            Upload
        </v-btn>
        <!-- {{ props.loading }} -->

        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden-input"
            @change="onFileChange"
        />

        <div class="image-list">
            <div v-for="(image, index) in fieldValue" :key="index" class="image-container">
                <v-img :src="image.preview" height="150" class="preview-image" />

                <v-btn icon class="delete-btn" @click="removeImage(index)">
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useField } from 'vee-validate'
const emit = defineEmits(['onFileChange', 'onFileDelete', 'onFileUpload'])

const props = defineProps({
    name: { type: String, required: true },
    allowMultiple: { type: Boolean, default: false },
    initialImages: { type: [String, Array], default: '' },
    loading: { type: Boolean, default: false },
})

const { value } = useField(props.name)

if (!Array.isArray(value.value)) {
    value.value = []
}

const fieldValue = computed({
    get: () => value.value,
    set: (val) => {
        emit('onFileChange', val)
        value.value = val
    },
})

const fileInput = ref(null)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const onFileChange = async (e) => {
    const files = Array.from(e.target.files || [])

    if (props.allowMultiple) {
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }))

        fieldValue.value = [...fieldValue.value, ...newImages]
        emit('onFileUpload', newImages[0])
    } else {
        fieldValue.value = [
            {
                file: files[0],
                preview: URL.createObjectURL(files[0]),
            },
        ]
    }
    e.target.value = ''
}

const removeImage = (index) => {
    const newFiledValue = [...fieldValue.value]
    newFiledValue.splice(index, 1)
    fieldValue.value = newFiledValue
    emit('onFileDelete', index)
}

watch(
    () => props.initialImages,
    (newValue) => {
        if (typeof newValue === 'string') {
            fieldValue.value = [
                {
                    file: null,
                    preview: newValue,
                },
            ]
        } else if (Array.isArray(newValue)) {
            fieldValue.value = newValue.map((image) => ({
                file: null,
                preview: image,
            }))
        }
    },
)
</script>

<style scoped>
.hidden-input {
    display: none;
}

.image-upload-wrapper {
    padding: 1rem;
    border-radius: 16px;
    background-color: var(--v-theme-surface);
    color: var(--v-theme-on-surface);
    height: 100%;
    display: flex;
    flex-direction: column;
}

.image-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    overflow: auto;
}

.upload-btn {
    width: 100%;
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: none;
    border-radius: 10px;
    color: white;
    background-color: var(--v-theme-primary);
}
.upload-btn:hover {
    background-color: var(--v-theme-primary-darken-1) !important;
}

.image-container {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background-color: var(--v-theme-surface-variant);
}

.preview-image {
    border-radius: 16px;
    object-fit: cover;
    width: 100%;
}

.delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--v-theme-surface);
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.required-asterisk {
    color: red;
    margin-left: 98%;
}
</style>
