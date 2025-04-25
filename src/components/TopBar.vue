<script setup>
import { computed, ref } from 'vue'; 
import { useStore } from 'vuex';
import LoginModal from './LoginModal.vue';

// Define the emit function for emitting events
const emit = defineEmits(['search']);

const store = useStore();
const searchQuery = ref(''); 
const showLoginModal = ref(false);

const notificationCount = computed(() => store.getters.cartItemCount);

const onSearch = () => {
  //emitir el termino de busqueda al componente pader
  emit('search', searchQuery.value);
  searchQuery.value = ''; // Resetear el campo de búsqueda
};
</script>

<template>
  <div class="top-bar d-flex align-items-center justify-content-between p-4">
    <!-- Buscador -->
    <div class="search-bar align-items-center">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="onSearch"
        class="form-control rounded-pill shadow"
        placeholder="Buscar... 🔍"
        aria-label="Buscar "
      />
    </div>

    <!-- Logo de la tienda -->
    <div class="logo align-items-center">
      <router-link to="/">
        <img src="../assets/LogoTiendaDelia.png" width="60%" height="60%" alt="logo de la tienda" class="logo-img">
      </router-link>
    </div>

    <!-- Enlaces de Sign In y Carrito -->
    <div class="icon-container d-flex align-items-center">
      <a @click="showLoginModal = true">
        <img class="outline icon-img" src="../assets/iconLogin.png" alt="">
        <div>
          
        </div>
      </a>
      <router-link to="/cart">
        <img class="outline icon-img" src="../assets/iconCarrito.png" alt="">
        <div v-if="notificationCount > 0" class="notification-badge">
          {{ notificationCount }}
        </div>
      </router-link>
    </div>

    <LoginModal :isVisible="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<style scoped>
.search-icon {
  font-size: 24px; /* Tamaño del ícono */
  color: #eb1818;     /* Color del ícono */
}
.outline {
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}
.outline:hover {
  filter: brightness(1.5); 
}
.search-bar input {
  font-size: 16px;
  height: 25px;
  width: 150px;
  transition: width 0.4s ease-in-out;
}

.search-bar input:focus {
  width: 180px;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}
.logo {
  width: auto; /* Ajusta el ancho según el tamaño del logo */
  margin: 0 auto; /* Centra el logo */
}
.logo-img {
  height: auto;
  max-width: 100%;
  display: block; /* Centra la imagen dentro del contenedor */
  margin: 0 auto; /* Asegura que la imagen esté centrada */
}
.icon-container {
  display: flex; /* Asegura que los iconos estén alineados en línea */
  align-items: center; /* Centra los iconos verticalmente */
  gap: 20px; /* Espacio entre los iconos */
  max-width: 100px; /* Establece un ancho máximo para evitar que los contenedores se expandan */
}
.notification-badge {
  position: absolute;
  top: 90px; /* Ajusta la posición según sea necesario */
  right: 2px; /* Ajusta la posición según sea necesario */
  background-color: rgb(235, 51, 19); /* O cualquier color que prefieras */
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none; /* Elimina subrayados */
}
.icon-img {
  width: 37px; /* Ajusta el ancho de las imágenes de los iconos */
  height: auto; /* Mantiene la relación de aspecto */
  transition: filter 0.3s ease;
  cursor: pointer;
}
</style>