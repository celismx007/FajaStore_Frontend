<template>
  <div class="container">
      <h2 class="title">Fajas Postparto</h2>
      <ProductList :products="filteredProducts" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'; 
import axios from 'axios'; 
import ProductList from '@/components/ProductList.vue';
import { getHeaderRequest } from '@/authService';
import '@fontsource/bodoni-moda'; // Importa estilos normales
import '@fontsource/bodoni-moda/700.css'; // Importa estilos negrita (opcional)

const props = defineProps({
  searchQuery: {
    type: String, 
    default: ''
  }
});

const baseUrl = import.meta.env.VITE_BASE_URL + 'product/category/';
const ListProduct = ref([]); // Almacén para los productos
const header = getHeaderRequest();

// Obtener productos de una categoría específica
const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(baseUrl + category, header); 
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al cargar los ${category}:`, error);
    return []; 
  }
}

const fetchAllProducts = async () => {
  const categories = ['postparto']; 
  const allProducts = []; 

  for (const category of categories) { 
    const products = await fetchProductsByCategory(category);
    allProducts.push(...products);
  }

  ListProduct.value = allProducts;
  console.log(ListProduct.value);
}

// Computar productos filtrados en base a la consulta de búsqueda
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
/* Estilos para el título */
.title {
    font-family: 'Playfair Display', serif;
    font-weight: 500; 
    text-align: center; /* Centrado del título */
}

/* Contenedor general */
.container {
    padding: 20px;
    max-width: 1200px; /* Limita el ancho a 1200px */
    margin: 0 auto; /* Centrado del contenedor */
}

/* Estilo general para la lista de productos */
.product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Por defecto, 4 columnas */
    gap: 30px;
    margin-top: 20px;
}

/* Media Query para dispositivos móviles (menos de 600px de ancho) */
@media (max-width: 600px) {
    .title {
        font-size: 1.5rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
    }

    /* La lista de productos cambia a 2 columnas */
    .product-list {
        grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas móviles */
        gap: 15px;
    }
}

/* Media Query para pantallas medianas (601px - 1024px) */
@media (min-width: 601px) and (max-width: 1024px) {
    .title {
        font-size: 2rem; /* Tamaño de fuente un poco más grande en pantallas medianas */
    }

    .product-list {
        grid-template-columns: repeat(3, 1fr); /* 3 columnas en pantallas medianas */
        gap: 20px;
    }
}

/* Media Query para pantallas grandes (más de 1024px de ancho) */
@media (min-width: 1025px) {
    .title {
        font-size: 2.5rem; /* Tamaño de fuente aún mayor en pantallas grandes */
    }

    .product-list {
        grid-template-columns: repeat(4, 1fr); /* 4 columnas en pantallas grandes */
        gap: 30px;
    }
}
</style>
