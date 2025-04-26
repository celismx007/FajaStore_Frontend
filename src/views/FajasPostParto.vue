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

const baseUrl = import.meta.env.VITE_BASE_URL + 'product/category/';
const ListProduct = ref([]);
const header = getHeaderRequest();

const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(baseUrl + category, header);
    return response.data;
  } catch (error) {
    console.error(`Error al cargar los productos de la categoría ${category}:`, error);
    return [];
  }
};

const fetchAllProducts = async () => {
  const categories = ['postparto'];
  const allProducts = [];

  for (const category of categories) {
    const products = await fetchProductsByCategory(category);
    allProducts.push(...products);
  }

  ListProduct.value = allProducts;
};

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
/* Contenedor general con espacio en pantallas grandes y ajuste en pantallas móviles */
.postparto-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilo del título con tipografía adaptativa */
.postparto-title {
  font-family: 'Bodoni Moda', serif;
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* Tamaño adaptable para diferentes resoluciones */
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

/* Estilo para pantallas más pequeñas */
@media (max-width: 768px) {
  .postparto-container {
    padding: 10px; /* Ajuste de relleno para pantallas pequeñas */
  }

  .postparto-title {
    margin-bottom: 15px;
    font-size: 1.8rem; /* Reducir el tamaño del título en pantallas móviles */
  }

  /* Ajustes de espaciado para listas de productos, si es necesario */
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}
</style>