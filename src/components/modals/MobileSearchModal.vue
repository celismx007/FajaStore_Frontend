<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isVisible: Boolean,
});
const emit = defineEmits(['close', 'search']);

const searchQuery = ref('');

const close = () => {
  emit('close');
};

const submitSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
    searchQuery.value = '';
    close();
  }
};

// Si el modal se muestra, enfocar el input
watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      const input = document.getElementById('mobile-search-input');
      if (input) input.focus();
    }, 100);
  }
});
</script>

<template>
  <div v-if="isVisible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Buscar</h2>
      <input
        id="mobile-search-input"
        type="text"
        v-model="searchQuery"
        @keyup.enter="submitSearch"
        placeholder="Buscar... 🔍"
      />
      <button class="search-button" @click="submitSearch">Buscar</button>
      <button class="close-button" @click="close">Cancelar</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-button, .close-button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.search-button {
  background-color: black;
  color: gold;
}

.close-button {
  background-color: #ccc;
  color: #333;
}
</style>
