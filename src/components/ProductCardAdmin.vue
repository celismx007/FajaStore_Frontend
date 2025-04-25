<template>
    <div class="product-card" @click="goToDetail">
        <img :src="product.images[0].image" :alt="product.title" loading="lazy" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }} bs.</p>
        <button @click="editProduct" class="btn btn-primary">editar</button>
        <button @click="deleteProduct" class="btn btn-primary">Eliminar</button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit-product', 'product-deleted']);

const editProduct = () => {
  console.log('vamos bien');
  emit('edit-product', props.product);
};

const deleteProduct = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log(props.product.id);
    await axios.delete( baseUrl+ "products/"+props.product.id, config);
    emit('product-deleted');
  } catch (error) {
    console.error('Error al eliminar el producto:', error.message);
  }
};
</script>