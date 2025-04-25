<script setup>
import { ref, onMounted } from 'vue'; 
import axios from 'axios'; 
import ProductList from '@/components/ProductList.vue';
import { getHeaderRequest } from '@/authService';


const ListProduct = ref([]); // almacen para los productos
const header = getHeaderRequest();
const baseUrl = import.meta.env.VITE_BASE_URL + 'product/category/';
//obtener productos de una categgoria especifica
const fetchProductsByCategory = async (category) => {
    try {
        const response = await axios.get(baseUrl + category, header); 
        return response.data;
    } catch (error) {
        console.error(`erro al cargar los ${category}:`, error);
        return []; 
    }
}

const fetchAllProducts = async () => {
    const categories = ['cinturillas']; 
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

<template>
    <div>
        <h2>Cinturillas</h2>
        <ProductList :products="ListProduct" />
    </div>
</template>

<style scoped> 
h2 {
    font-family: 'Playfair Display', serif;
    /* font-weight: bold;
    font-size: 28px;
    text-align: center;
    margin-bottom: 30px; */
}
</style>