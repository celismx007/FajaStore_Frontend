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
  <div>
    <br>
    <h3>Todos los productos</h3>
    <ProductList :products="ListProduct" />
  </div>
</template>

<style scoped>
</style>
