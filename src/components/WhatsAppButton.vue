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
      <span class="tooltip-text">¿Necesitas ayuda? Escribenos!</span> <!-- Texto del tooltip -->
    </a>
  </div>
</template>

<style scoped>
.whatsapp-container {
  position: fixed; /* Fijo en la pantalla */
  bottom: 25px; /* A 20px del fondo */
  right: 30px; /* A 20px de la derecha */
  z-index: 1000; /* Superposición alta */
}
.whatsapp-float {
  position: relative; /* Necesario para el tooltip */
  display: inline-block; /* Para posicionar correctamente */
  background-color: #136631; /* Color de fondo WhatsApp */
  border-radius: 50%; /* Forma circular */
  padding: 10px; /* Espacio interno */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
  transition: transform 0.2s; /* Suavizado en hover */
}

.whatsapp-float:hover {
  transform: scale(1.1); /* Agranda el icono al pasar el mouse */
}

.whatsapp-float img {
  width: 32px; /* Tamaño del ícono */
  height: 32px;
}

/* Estilo para el tooltip */
.tooltip-text {
  visibility: hidden; /* Oculto por defecto */
  width: 140px; /* Ancho del tooltip */
  background-color: #333; /* Color de fondo */
  color: #fff; /* Color de texto */
  text-align: center; /* Alineación del texto */
  border-radius: 5px; /* Bordes redondeados */
  padding: 5px 10px; /* Espacio interno */
  position: absolute; /* Posición absoluta respecto al contenedor */
  bottom: 60px; /* Espacio desde el botón */
  left: 50%; /* Centramos horizontalmente */
  transform: translateX(-50%); /* Ajuste de centrado */
  opacity: 0; /* Hacemos invisible para animación */
  transition: opacity 0.3s; /* Suavizado de aparición */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
}

.whatsapp-float:hover .tooltip-text {
  visibility: visible; /* Mostrar tooltip */
  opacity: 1; /* Hacerlo visible */
}
</style>