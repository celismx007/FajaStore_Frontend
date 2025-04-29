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

const isSearchVisible = ref(false);

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

const onSearch = () => {
  //emitir el termino de busqueda al componente pader
  emit('search', searchQuery.value);
  searchQuery.value = ''; // Resetear el campo de búsqueda
};
</script>

<template>
  <div class="top-bar d-flex align-items-center justify-content-between p-3 fixed-topbar">
    <!-- Buscador visible solo en pantallas grandes -->
    <div class="search-bar align-items-center d-none d-md-flex">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="onSearch"
        class="form-control rounded-pill shadow"
        placeholder="Buscar... 🔍"
        aria-label="Buscar"
      />
    </div>

    <!-- Ícono de búsqueda visible solo en móviles -->
    <div class="icon-container d-flex d-md-none" @click="toggleSearch">
      <img src="../assets/searchIcon.png" alt="Buscar" class="icon-img" />
    </div>

    <!-- Logo de la tienda -->
    <div class="logo align-items-center">
      <router-link to="/">
        <img src="../assets/LogoTiendaDelia.png" width="60%" height="60%" alt="logo de la tienda" class="logo-img">
      </router-link>
    </div>

    <!-- Enlaces de Sign In y Carrito -->
    <div class="icon-container d-flex align-items-center">
      <a @click="showLoginModal = true" title="Iniciar sesión">
        <img class="outline icon-img" src="../assets/iconLogin.png" alt="Iniciar sesión">
      </a>
      <router-link to="/cart" title="Ver carrito">
        <img class="outline icon-img" src="../assets/iconCarrito.png" alt="Carrito de compras">
        <div v-if="notificationCount > 0" class="notification-badge">
          {{ notificationCount }}
        </div>
      </router-link>
    </div>

    <LoginModal :isVisible="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<style scoped>
.top-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: #ffffff; /* Azul muy oscuro, casi negro */
  color: #f5f5f5; /* Blanco suave */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2); 
}

.search-bar input {
  font-size: 16px;
  height: 30px;
  width: 180px;
  padding: 0.3rem 0.8rem;
  transition: width 0.4s ease-in-out;
}

.search-bar input:focus {
  width: 200px;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.25);
}

.logo {
  max-width: 120px;
  margin: 0 auto;
}

.logo-img {
  width: 100%;
  height: auto;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.icon-img {
  width: 32px;
  height: auto;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e23d1e;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* RESPONSIVE: Teléfonos */
@media (max-width: 768px) {
  .fixed-topbar {
    position: fixed;
    top: 22px;
    left: 0;
    right: 0;
    z-index: 1040;
  }
  .top-bar {
    flex-direction: row; /* asegura fila */
    flex-wrap: nowrap;   /* evita que los elementos se vayan a otra línea */
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .search-bar input {
    font-size: 14px;
    height: 28px;
    width: 100%;
    max-width: 120px; 
    border: 1px solid #ccc;
  }

  .logo {
    max-width: 125px;
    margin: 0px;
  }

  .icon-container {
    gap: 14px;
    justify-content: center;
    cursor: pointer;
  }

  .icon-img {
    width: 27px;
  }

  .notification-badge {
    top: -5px;
    right: -5px;
    width: 18px;
    height: 18px;
    font-size: 11px;
  }
}
</style>