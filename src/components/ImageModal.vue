<template>
    <div class="modal" v-if="isVisible" @click="closeModal">
        <div class="modal-content"> 
            <span class="close" @click="closeModal">&times;</span>
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
  padding: 15px;
}

.modal-content {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 28px;
  cursor: pointer;
  color: white;
  z-index: 10;
}

/* Responsive ajustes para móviles */
@media (max-width: 480px) {
  .modal-content {
    padding: 10px;
  }

  .modal-image {
    max-width: 100%;
    max-height: 100vh;
  }

  .close {
    font-size: 24px;
    top: 5px;
    right: 10px;
  }
}

</style>