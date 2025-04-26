<template>
    <div>
        <h2 class="title">Accesorios</h2>
        <ProductList :products="ListProduct" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import axios from 'axios'; 
import ProductList from '@/components/ProductList.vue';
import { getHeaderRequest } from '@/authService';
import '@fontsource/bodoni-moda'; // Importa estilos normales
import '@fontsource/bodoni-moda/700.css'; // Importa estilos negrita (opcional)


const ListProduct = ref([]); // almacen para los productos
const token = localStorage.getItem('token');
const header = getHeaderRequest();
const baseUrl = import.meta.env.VITE_BASE_URL + 'product/category/';
//obtener productos de una categgoria especifica
const fetchProductsByCategory = async (category) => {
    try {
        console.log(baseUrl);
        const response = await axios.get(baseUrl + category, header); 
        return response.data;
    } catch (error) {
        console.error(`erro al cargar los ${category}:`, error);
        return []; 
    }
}

const fetchAllProducts = async () => {
    const categories = ['accesorios']; 
    const allProducts = []; 

    for (const category of categories) { 
        const products = await fetchProductsByCategory(category)
        allProducts.push(...products);
    }

    ListProduct.value = allProducts; 
    console.log(ListProduct.value); 
}

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

/* Media Query para dispositivos móviles (menos de 600px de ancho) */
@media (max-width: 600px) {
    .title {
        font-size: 1.5rem; /* Tamaño de fuente más pequeño en pantallas pequeñas */
    }
    
    /* Aquí puedes cambiar cómo se muestran los productos en pantallas móviles */
    .product-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Dos columnas en pantallas pequeñas */
        gap: 15px;
    }
}

/* Media Query para pantallas más grandes */
@media (min-width: 601px) and (max-width: 1024px) {
    .title {
        font-size: 2rem; /* Tamaño de fuente un poco más grande en pantallas medianas */
    }

    .product-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Tres columnas en pantallas medianas */
        gap: 20px;
    }
}

/* Media Query para pantallas grandes (más de 1024px de ancho) */
@media (min-width: 1025px) {
    .title {
        font-size: 2.5rem; /* Tamaño de fuente aún mayor en pantallas grandes */
    }

    .product-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* Cuatro columnas en pantallas grandes */
        gap: 30px;
    }
}
</style>
