<template>
  <div class="postparto-container">
    <h2 class="category-title">Fajas Postparto</h2>
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
.category-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; 
    color: #17223B;
}
@media (max-width: 768px) {
    .category-title {
      padding-top: 24px;
      font-size: 1.3em; 
    }
}
</style>