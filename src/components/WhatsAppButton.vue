<script setup>
</script>

<template>
  <div class="whatsapp-container">
    <a
      href="https://wa.me/59168836532?text=Hola%2C%20estoy%20interesado%20en%20tu%20producto"
      class="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="../assets/iconWatsApp.png" alt="WhatsApp" />
      <span class="tooltip-text">¿Necesitas ayuda? ¡Escríbenos!</span>
    </a>
  </div>
</template>

<style scoped>
.whatsapp-container {
  position: fixed;
  bottom: 25px;
  right: 30px;
  z-index: 1000;
}

.whatsapp-float {
  position: relative;
  display: inline-block;
  background-color: #136631;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.whatsapp-float:hover {
  transform: scale(1.1);
}

.whatsapp-float img {
  width: 32px;
  height: 32px;
}

.tooltip-text {
  visibility: hidden;
  width: 140px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 10px;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.whatsapp-float:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

/* Adaptación para móviles */
@media (max-width: 760px) {
  .whatsapp-container {
    bottom: 15px;
    right: 15px;
  }

  .whatsapp-float {
    padding: 8px;
  }

  .whatsapp-float img {
    width: 28px;
    height: 28px;
  }

  .tooltip-text {
    display: none; /* Opcional: ocultar tooltip en móvil */
  }
}
</style>
