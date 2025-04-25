<template>
    <div>
        <ProductList :products="filteredProducts" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'; 
import { useRoute } from 'vue-router'; 
import axios from 'axios'; 
import ProductList from '@/components/ProductList.vue';
import { getHeaderRequest } from '@/authService';


const baseUrl = import.meta.env.VITE_BASE_URL;
const route = useRoute(); 
const allProducts = ref([]); 
const searchQuery = ref(route.query.q || ''); 
const header = getHeaderRequest();

const fetchAllProducts = async () => { 
    try { 
        const response = await axios.get(baseUrl+"product", header);
        allProducts.value = response.data;
        console.log(response.data);
    } catch (error) {
        console.log('error buscando productos:', error)
    }
}; 

onMounted (() => {
    fetchAllProducts();
}); 

watch(
    () => route.query.q,
    (newQuery) => {
        searchQuery.value = newQuery || '';
    }
);

const filteredProducts = computed(() => {
    return allProducts.value.filter(product =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>