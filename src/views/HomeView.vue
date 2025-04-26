<script setup>
import { ref, onMounted } from 'vue'; 
import axios from 'axios'; 
import ProductList from '@/components/ProductList.vue';
import { getHeaderRequest } from '@/authService';


const baseUrl = import.meta.env.VITE_BASE_URL;
const ListProduct = ref([]); // almacen para los productos
const header = getHeaderRequest();

const fetchProductsByCategory = async () => {
    try {
        const response = await axios.get(baseUrl + "product", header); 
        ListProduct.value = response.data;
    } catch (error) {
        console.error('erro al cargar los productos:', error);
        return []; 
    }
}

onMounted(() => {
    fetchProductsByCategory();
});
</script>

<template>
  <div class="product-container">
    <h3 class="product-title">Todos los productos</h3>
    <ProductList :products="ListProduct" />
  </div>
</template>


<style scoped>
/* Estilo general para el contenedor de productos */
.product-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilo del título de la página */
.product-title {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* Tamaño de fuente adaptable */
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Media query para pantallas más pequeñas */
@media (max-width: 768px) {
  .product-container {
    padding: 10px; /* Ajusta el padding para pantallas pequeñas */
  }

  .product-title {
    font-size: 1.8rem; /* Reduce el tamaño del título en pantallas móviles */
    margin-bottom: 15px; /* Ajusta el espacio debajo del título */
  }
}
</style>