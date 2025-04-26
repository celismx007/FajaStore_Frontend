<template>
    <div class="product-grid">
        <ProductCard v-for="product in products" 
        :key="product.id" 
        :product="product" />
    </div>
</template>


<script setup>
import ProductCard from './ProductCard.vue';

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});
</script>


<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, mi  nmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>