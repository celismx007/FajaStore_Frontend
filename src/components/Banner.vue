<script setup>
import { ref, onMounted } from 'vue';

const ads = [
  'Descubre nuestros increíbles descuentos',
  'Compra 2 y llévate 1 gratis en todas las fajas',
  '¡Envío gratis en pedidos superiores a 350 bs!',
  'Nuevas colecciones disponibles ahora'
];

const currentAd = ref('');

const pickRandomAd = () => {
  const randomIndex = Math.floor(Math.random() * ads.length);
  currentAd.value = ads[randomIndex];
}

// Cambiar el anuncio cada 6 segundos
const changeAdPeriodically = () => {
  pickRandomAd();
  setInterval(pickRandomAd, 6000); 
}

onMounted(() => {
  changeAdPeriodically();
});
</script>

<template>
  <div class="alert alert-custom shadow" role="alert">
    <div class="banner-container">
      <div class="banner-text">{{ currentAd }}</div>
    </div>
  </div>
</template>
  
<style scoped>
.alert {
  position: relative;
  background:  #17223B;
  color: #ffffff;
  padding: 10px;
  text-align: center;
}

.banner-container {
  position: relative;
  overflow: hidden;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-text {
  position: absolute;
  white-space: nowrap;
  font-weight: bold;

  animation: slideIn 6s linear infinite;
  min-width: 100%;
  font-size: 16px;
}

@keyframes slideIn {
  0% {
    transform: translateX(40%);
    opacity: 0;
  }
  10% {
    transform: translateX(0);
    opacity: 1;
  }
  90% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-40%);
    opacity: 0;
  }
}
</style>
