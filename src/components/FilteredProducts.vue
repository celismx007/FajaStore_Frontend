<template>
    <div>
        <ProductList :products="filteredProducts" />
    </div>
</template>


<script setup>
import { computed } from 'vue';
import ProductList from '@/components/ProductList.vue';

const props = defineProps({
  allProducts: Array,
  searchQuery: String
});

const filteredProducts = computed(() => {
  return props.allProducts.filter(product => 
    product.title.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});
</script>
