<template>
    <div class="modal" v-if="isVisible" @click="closeModal">
        <div class="modal-content"> 
            <span class="close" @click="closeModal">&timesd;</span>
            <img src="../assets/imageTallas.png" alt="guia de tallas"
            class="modal-image">
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['close']);

const props = defineProps({
    imageSrc: { 
        type: String, 
        required: true,
    }, 
    isVisible: {
        type: Boolean,
        default: false,
    }
});

const closeModal = () => { 
    emit('close');//emite un evento para cerra el modal
};
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-content { 
    position: relative;
}
.close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 28px;
    cursor: pointer;
    color: white;
}
.modal-image { 
    max-width: 90%;
    max-height: 90%;
}
</style>