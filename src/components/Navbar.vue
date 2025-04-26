<script setup>
import { getUserRoleOfLocalStorage } from '@/authService';
import { onMounted, ref } from 'vue';
import marcaFajas from '@/assets/marcasFajas.png'; 
import ropaInterior from '@/assets/ropaInterior.png'; 
import trajeBanio from '@/assets/trajeBanio.png'; 
import lenceria from '@/assets/lenceria.png'; 
import pijamas from '@/assets/pijamas.png'; 
import ajustes from '@/assets/ajustes.png'; 


const menuItems = ref([
  {
    name: "Fajas",
    link: "/postParto",
    image: "https://fajasmariae.com/cdn/shop/files/dirio.jpg?v=1714497465&width=400",
    options: [
      { name: "Postparto", link: "/postParto" },
      { name: "Cinturillas", link: "/cinturillas" },
      { name: "Modeladoras", link: "/modeladoras" },
    ],
  },
  {
    name: "Complementos",
    link: "/accesorios",
    image: "https://fajasmariae.com/cdn/shop/files/acceso.jpg?v=1714497465&width=400",
    options: [
      { name: "Tablas", link: "/accesorios" },
      { name: "Mentoneras", link: "/accesorios" },
    ],
  },
  {
    name: "Pijamas",
    link: "/pijamas",
    image: pijamas,
    options: [
      { name: "Opción 1", link: "/pijamas" },
      { name: "Opción 2", link: "/pijamas" },
    ],
  },
  {
    name: "Pareo",
    link: "/pareo",
    image: pijamas,
    options: [
      { name: "Opción 1", link: "/pijamas" },
      { name: "Opción 2", link: "/pijamas" },
    ],
  },
  {
    name: "Lenceria",
    link: "/lenceria",
    image: lenceria,
    options: [
      { name: "Opción 1", link: "/lenceria" },
      { name: "Opción 2", link: "/lenceria" },
    ],
  },
  {
    name: "Traje de Banio",
    link: "/trajeBanio",
    image: trajeBanio,
    options: [
      { name: "Opción 1", link: "/trajeBanio" },
      { name: "Opción 2", link: "/trajeBanio" },
    ],
  },
  {
    name: "Ropa Interior",
    link: "/ropaInterior",
    image: ropaInterior,
    options: [
      { name: "Opción 1", link: "/ropaInterior" },
      { name: "Opción 2", link: "/ropaInterior" },
    ],
  },
  {
    name: "Marca",
    link: "/mariaE",
    image: marcaFajas,
    options: [
      { name: "Maria E", link: "/mariaE" },
      { name: "Ancherry", link: "/ancherry" },
      { name: "Salome", link: "/salome" },
    ],
  },
]);
const activeDropdown = ref(null);
const toggleDropdown = (name) => {
  activeDropdown.value = activeDropdown.value === name ? null : name;
};
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => { 
  const userRole = getUserRoleOfLocalStorage();
  console.log(userRole); 
  if(userRole === 'admin') { 
    menuItems.value.push({ name: 'Ajustes', link: "/admin", image: ajustes,})
  }
})
</script>

<template>
  <nav class="navbar navbar-expand-lg shadow">
    <div class="container-fluid shadow">
      <!-- BOTÓN DENTRO DEL CONTAINER -->
      <button class="menu-toggle" @click="toggleMenu">☰</button>

      <!-- MENÚ QUE SE MUESTRA U OCULTA -->
      <div class="navbar-links" :class="{ open: isMenuOpen }">
        <div class="menu-item" v-for="item in menuItems" :key="item.name">
          <router-link 
            :to="item.link" 
            class="underline-dynamic" 
            @click.prevent="toggleDropdown(item.name)"
          >
            {{ item.name }}
          </router-link>
          <div 
            class="dropdown-content shadow" 
            v-show="activeDropdown === item.name"
          >
            <ul>
              <li v-for="option in item.options" :key="option.name">
                <router-link :to="option.link" @click="isMenuOpen = false">{{ option.name }}</router-link>
              </li>
            </ul>
            <img :src="item.image" :alt="item.name">
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding: 15px;
  font-family: 'Playfair Display', serif; 
  font-size: 15px;
  background-color: #000000; 
}

nav a {
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  margin: 0 5px;
  transition: color 0.3s ease, transform 0.3s ease;
}
.navbar-links {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

nav a.router-link-exact-active {
  color: #e7723c; 
}

nav a:hover {
  color: #f39c12;
}
nav a:active {
  color: #e7723c; 
}
.underline-dynamic {
  display: inline-block;
  position: relative;
  padding-bottom: 2px;
  color: #f1c40f; 
  text-decoration: none;
  transition: color 0.3s ease;
}
.underline-dynamic::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #e7723c;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s, background-color 0.3s ease;
}
.underline-dynamic:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.underline-dynamic.router-link-exact-active::after {
  transform: scaleX(1);
}
.menu-item {
  position: relative;
  display: inline-block;
}
.menu-item .dropdown-content {
  display: none;
  position: absolute;
  top: 100%; 
  left: 0;
  background-color: white;
  padding: 20px;
  z-index: 10;
  border-radius: 15px;

}
.menu-item:hover .dropdown-content {
  display: block;
  display: flex; 
  gap: 20px; 
}
.dropdown-content img {
  margin-bottom: 10px;
}
.dropdown-content ul {
  list-style: none;
  padding: 0;
}
.dropdown-content ul li {
  margin: 20px 0;
}
.dropdown-content ul li a {
  text-decoration: none;
  color: #333;
}
.dropdown-content ul li a:hover {
  color: #007bff;
}
.menu-toggle {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 20px;
}
@media (max-width: 768px) {
  nav {
    padding: 1px;
  }

  .menu-toggle {
    display: block;
    font-size: 26px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  .navbar-links {
    display: none;
    flex-direction: column;
    width: 100%;
    text-align: center;
    background-color: #000;
    padding: 10px 0;
  }

  .navbar-links.open {
    display: flex;
  }

  .menu-item {
    width: 100%;
    margin: 10px 0;
    position: relative;
  }

  .menu-item .dropdown-content {
    display: none;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    margin-top: 8px;
  }

  .dropdown-content img {
    width: 100px;
    height: auto;
    margin-top: 10px;
  }

  .dropdown-content ul li {
    margin: 10px 0;
  }

  .dropdown-content ul li a {
    color: #000;
    font-size: 14px;
  }

  .underline-dynamic {
    color: #f1c40f;
    font-size: 16px;
  }
}

</style>    