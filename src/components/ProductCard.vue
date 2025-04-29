<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const product = ref('')
const currentImage = ref();
const router = useRouter();

onMounted(() => {
  product.value = props.product;
  console.log(product.value.images);
  currentImage.value = product.value.images[0].image;
})



const goToDetail = () => { 
  router.push({ name: 'ProductDetail', params: { id: product.value.id } });
}

const changeImage = (index) => { 
  currentImage.value = product.value.images[index].image;
}


</script>

<template>
    <div class="product-card shadow " @click="goToDetail">
      <div class="image-container">
        <img :src="currentImage" :alt="product.name" loading="lazy"
        @mouseover="changeImage(1)" 
        @mouseleave="changeImage(0)" />
        <div class="hover-text">Ver Detalles</div>
      </div>
      <div class="product-info">
        <h6 class="text-name text-center">{{ product.name }}</h6>
        <h5 class="text-price text-center"><strong>Bs. {{ product.price }}</strong></h5>
      </div>
    </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #f8f6f3;
  border: 1px solid #e4c35f; /* Dorado elegante */
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(191, 161, 69, 0.9);
  transition: background-color 0.3s ease, transform 0.3s ease;
  height: 100%;
}
.product-card:hover {
  background-color: #f0ede8; 
  transform: scale(1.03); 
}
.image-container {
  width: 100%; /* Ancho fijo para todas las imágenes */
  height: auto; /* Alto fijo para todas las imágenes */
  overflow: hidden; /* Oculta el desbordamiento de la imagen */
  border-radius: 10px;
  margin-bottom: 10px; /* Espacio debajo de la imagen */
  display: flex; /* Centrar la imagen */
  justify-content: center; /* Centrar la imagen */
  align-items: center; /* Centrar la imagen */
}

.image-container img {
  max-width: 100%; /* Asegura que la imagen no exceda el ancho del contenedor */
  max-height: 100%; /* Asegura que la imagen no exceda la altura del contenedor */
  object-fit: contain; /* Ajusta la imagen para que quepa en el contenedor sin recortar */
  transition: transform 0.3s ease; /* Animación suave al cambiar la imagen */
}

.hover-text {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 10px); /* Inicialmente está desplazado */
  background-color: rgba(191, 161, 69, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 13px;
  opacity: 0; /* Invisible por defecto */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Efecto suave */
  pointer-events: none; /* Evita que el texto interfiera con el hover */
}

.image-container:hover .hover-text {
  opacity: 1; /* Aparece al hacer hover */
  transform: translate(-50%, -1000%); /* Se posiciona correctamente */
}

.product-info { 
  margin-top: auto;
  text-align: center;
}

.product-card p {
  font-size: 16px;
  color: #333;
}
.text-price {
  font-size: 1.7rem; 
  font-family: 'Playfair Display', serif;
  color: #bfa145;
}
.text-name {
  font-size: 1.5rem; 
  font-family: 'Playfair Display', serif;
  color: #bfa145;
}

@media (max-width: 768px) {
  .text-name {
    font-size: 0.8em;
  }

  .text-price {
    font-size: 0.9em;
  }
}
</style>