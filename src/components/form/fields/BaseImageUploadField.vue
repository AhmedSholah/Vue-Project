<template>
    <div
        class="image-upload-wrapper pa-4"
        style="background-color: var(--v-theme-surface); border-radius: 12px"
    >
        <h3 class="text-h6 font-weight-bold mb-4" style="color: var(--v-theme-headingColor)">
            Images
        </h3>

        <v-btn
            @click="triggerFileInput"
            prepend-icon="mdi-upload"
            color="primary"
            class="mb-4"
            variant="flat"
        >
            Upload
        </v-btn>

        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="hidden-input"
            @change="onFileChange"
        />

        <v-row dense class="image-list">
            <v-col
                v-for="(image, index) in fieldValue"
                :key="index"
                cols="6"
                sm="4"
                md="3"
                class="d-flex flex-column align-center mb-4"
            >
                <v-img
                    :src="image.preview"
                    height="150"
                    class="preview-image mb-2"
                    style="border-radius: 8px; border: 1px solid var(--v-theme-cardBorder)"
                />
                <v-btn icon variant="text" @click="removeImage(index)">
                    <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
    name: { type: String, required: true },
})

const { value } = useField(props.name)

if (!Array.isArray(value.value)) {
    value.value = []
}

const fieldValue = computed({
    get: () => value.value,
    set: (val) => (value.value = val),
})

const fileInput = ref(null)

const triggerFileInput = () => {
    fileInput.value?.click()
}

const onFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
    }))
    fieldValue.value = [...fieldValue.value, ...newImages]
    e.target.value = ''
}

const removeImage = (index) => {
    fieldValue.value.splice(index, 1)
}
</script>

<style scoped>
.hidden-input {
    display: none;
}

.image-upload-wrapper {
    padding: 1rem;
    border-radius: 16px;
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
}

.image-container {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
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
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>
