<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const images = ref([
  'https://fajasmariae.com/cdn/shop/files/banner_navidad_Mesa_de_trabajo_1_7f5164ae-7022-4c3a-9625-02157eead5fb.png?v=1733229425', 
  'https://fajasmariae.com/cdn/shop/files/banner_1_5a2c7d04-35ca-4266-b2a4-7e4968ffa595.png?v=1733410523&width=2000',
]);

const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
};

const goToCategory = (category) => {
  router.push('/cinturillas');
}
</script>


<template>
    <div>
        <div class="carousel-container mt-3 shadow">
            <!-- Imagen actual -->
            <div
                class="carousel-image"
                :style="{ backgroundImage: `url(${images[currentIndex]})` }"
                @click="goToCategory('uso-diario')"
            ></div>
        
            <!-- Botones para navegación -->
            <button class="prev-button" @click="prevImage">❮</button>
            <button class="next-button" @click="nextImage">❯</button>
        </div>

            <!-- Galería de imágenes -->
        <div class="gallery mt-3">
            <!-- Fila 1 -->
            <div class="gallery-row m-2">
                <div class="gallery-image m-2 shadow" @click="goToCategory('uso-diario')">
                    <div class="category-text">
                      <p>DIARIO</p>
                      <button>Ver Categoria</button>
                    </div>
                    <img
                    src="https://fajasmariae.com/cdn/shop/files/uso-diario_5d098f8e-202f-45db-9c8d-b6f944396b49.jpg?v=1715691496&width=800"
                    alt="Imagen 1"
                    class=""
                     />
                </div>
                <div class="gallery-image m-2 shadow" @click="goToCategory('uso-diario')">
                     <div class="category-text">
                      <p>POSTQUIRURGICO</p>
                      <button>Ver Categoria</button>
                    </div>
                    <img
                    src="https://fajasmariae.com/cdn/shop/files/postquirurgica_970758a0-0126-4a8d-b6a4-2f038c6917ed.jpg?v=1715691496&width=800"
                    alt="Imagen 2"
                    class=""
                    />
                </div>
            </div>
            <!-- Fila 2 -->
            <div class="gallery-row m-2">
                <div class="gallery-image m-2 shadow" @click="goToCategory('uso-diario')">
                    <div class="category-text">
                      <p>DEPORTIVO</p>
                      <button>Ver Categoria</button>
                    </div>
                    <img
                        src="https://fajasmariae.com/cdn/shop/files/deportivas_8fb7ad4b-bfc4-4fcd-a8ac-2c99d37f5f65.jpg?v=1715691496&width=800"
                        alt="Imagen 3"
                        class=""
                        />
                </div>
                <div class="gallery-image m-2 shadow" @click="goToCategory('uso-diario')">
                    <div class="category-text">
                      <p>POSTPARTO</p>
                      <button>Ver Categoria</button>
                    </div>
                    <img
                        src="https://fajasmariae.com/cdn/shop/files/postparto_5379c328-28f1-4ff5-bbc1-a78653077654.jpg?v=1715691496&width=800"
                        alt="Imagen 4"
                        class=""
                        />
                </div>
            </div>
        </div>
    </div>
</template>
  

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 600px; 
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
}
.carousel-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0); /* Fondo blanco transparente inicialmente */
  transition: background-color 0.3s ease-in-out; /* Transición suave */
  pointer-events: none; /* Evita interferir con la interacción del mouse */
}

.carousel-image:hover::after {
  background-color: rgba(255, 255, 255, 0.2); /* Fondo blanco tenue */
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 0.9rem;
  padding: 10px 20px;
  cursor: pointer;
  z-index: 10;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.prev-button:hover,
.next-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50px;
}

/* Estilos para gallery-image */
.gallery-image {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.gallery-image:hover {
  transform: scale(1.02); /* Efecto de zoom suave */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra adicional */
}

.gallery-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.3s ease-in-out;
  pointer-events: none;
}

.gallery-image:hover::after {
  background-color: rgba(241, 234, 234, 0.2); /* Capa blanca tenue */
}

.category-text { 
  position: absolute;
  font-family: 'Bodoni Moda', serif;
  color: black;
  left: 10%;
  top: 5%;
}
.category-text p { 
  font-size: 25px;
}

.category-text button { 
  border-radius: 15px;
  background-color: transparent;
  font-size: 18px;
  border: 1px solid black;
}

.category-text button:hover{ 
  background-color: silver;
}
</style>