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

onMounted(() => { 
  const userRole = getUserRoleOfLocalStorage();
  console.log(userRole); 
  if(userRole === 'admin') { 
    menuItems.value.push({ name: 'Ajustes', link: "/admin", image: ajustes,})
  }
})
</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg shadow">
            <div class="container-fluid shadow navbar-links">
                <div class="menu-item" v-for="item in menuItems" :key="item.name">
                    <router-link :to="item.link" class="underline-dynamic">{{ item.name }}</router-link>
                    <div class="dropdown-content shadow">
                        <ul>
                            <li v-for="option in item.options" :key="option.name">
                            <router-link :to="option.link">{{ option.name }}</router-link>
                            </li>
                        </ul>
                        <img :src="item.image" :alt="item.name">
                    </div>
                </div>
            </div>
      </nav>
    </div>
</template>

<style scoped>
nav {
  padding: 15px;
  font-family: 'Playfair Display', serif; 
  font-size: 15px;
  background-color: #000000; /* Fondo negro para la barra de navegación */
}

nav a {
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  margin: 0 5px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.navbar-links {
  justify-content: center !important; 
}

nav a.router-link-exact-active {
  color: #e7723c; 
}

nav a:hover {
  color: #f39c12; /* Efecto dorado cuando se pasa el mouse */
}

nav a:active {
  color: #e7723c; /* Color rojo para el estado activo de los enlaces */
}

.underline-dynamic {
  display: inline-block;
  position: relative;
  padding-bottom: 2px;
  color: #f1c40f; /* Color dorado para el texto */
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
  top: 100%; /* Justo debajo del link */
  left: 0;
  background-color: white;
  padding: 20px;
  z-index: 10;
  border-radius: 15px;

}

.menu-item:hover .dropdown-content {
  display: block;
  display: flex; /* Usar flexbox para organizar en columnas */
  gap: 20px; /* Espaciado entre las columnas */
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
  color: #007bff; /* Cambia el color al pasar el mouse */
}
</style>    