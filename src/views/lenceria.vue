<template>
  <div class="postparto-container">
    <h2 class="postparto-title">Fajas Postparto</h2>
    <ProductList :products="filteredProducts" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import { getHeaderRequest } from '@/authService';
import '@fontsource/bodoni-moda';
import '@fontsource/bodoni-moda/700.css';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});
const baseUrl = import.meta.env.VITE_BASE_URL;
const ListProduct = ref([]);
const header = getHeaderRequest();

// Obtener productos por categoría
const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(baseUrl + "product/category/"+category, header);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al cargar los productos de la categoría ${category}:`, error);
    return [];
  }
};

// Obtener todos los productos de las categorías
const fetchAllProducts = async () => {
  const categories = ['postparto'];
  const allProducts = [];

  for (const category of categories) {
    const products = await fetchProductsByCategory(category);
    allProducts.push(...products);
  }

  ListProduct.value = allProducts;
  console.log(ListProduct.value);
};

// Filtro según el término de búsqueda
const filteredProducts = computed(() => {
  return ListProduct.value.filter(product =>
    product.name.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

onMounted(() => {
  fetchAllProducts();
});
</script>

<style scoped>
/* Contenedor general */
.postparto-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilo del título de la página */
.postparto-title {
  font-family: 'Bodoni Moda', serif;
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* Tamaño de fuente adaptable */
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

/* Media query para pantallas más pequeñas */
@media (max-width: 768px) {
  .postparto-container {
    padding: 10px; /* Ajusta el padding para pantallas pequeñas */
  }

  .postparto-title {
    font-size: 1.8rem; /* Reduce el tamaño del título en pantallas móviles */
    margin-bottom: 15px; /* Ajusta el espacio debajo del título */
  }
}
</style>