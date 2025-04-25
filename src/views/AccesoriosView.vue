<template>
    <div>
        <h2>Accesorios</h2>
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
h2 {
    font-family: 'Playfair Display', serif;
  font-weight: 500; 
} 
</style>