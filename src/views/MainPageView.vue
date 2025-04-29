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
        <!-- Imagen actual -->
        <div class="carousel-image">
          <img
            :src="images[currentIndex]"
            alt="Carrusel"
            class="carousel-img"
            @click="goToCategory('uso-diario')"
          />
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
.carousel-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}
.carousel-img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Usa 'cover' si prefieres recorte sin deformar */
  display: block;
}
.carousel-image::after {
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

.carousel-image:hover::after {
  background-color: rgba(255, 255, 255, 0.2);
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0);
  border: none;
  font-size: 1.5rem;
  padding: 10px;
  cursor: pointer;
  color: black;
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
  border-radius: 50%;
}

/* Galería */
.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.gallery-image {
  position: relative;
  flex: 1 1 45%;
  min-width: 250px;
  max-width: 400px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.gallery-image img {
  width: 100%;
  height: auto;
  display: block;
}

.gallery-image:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.category-text {
  position: absolute;
  font-family: 'Bodoni Moda', serif;
  color: black;
  left: 10%;
  top: 5%;
}

.category-text p {
  font-size: 24px;
  margin-bottom: 5px;
}

.category-text button {
  border-radius: 15px;
  background-color: transparent;
  font-size: 16px;
  padding: 6px 12px;
  border: 1px solid black;
  cursor: pointer;
}

.category-text button:hover {
  background-color: silver;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-image {
    width: 100%;
    height: auto;
  }
  .carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .prev-button,
  .next-button {
   font-size: 2rem;
    padding: 9px;
  }

  .category-text p {
    font-size: 18px;
  }

  .category-text button {
    font-size: 14px;
    padding: 5px 10px;
  }
}

@media (max-width: 480px) {
  .carousel-image {
    position: relative;
    width: 100%;
    height: auto;
  }
  .carousel-img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain; 
    display: block;
  }

  .gallery-row {
    flex-direction: column;
    gap: 15px;
  }

  .gallery-image {
    flex: 1 1 100%;
    min-width: unset;
    max-width: 100%;
  }

  .category-text {
    left: 5%;
    top: 5%;
  }

  .category-text p {
    font-size: 16px;
  }

  .category-text button {
    font-size: 12px;
    padding: 4px 8px;
  }

  .prev-button,
  .next-button {
    font-size: 1rem;
    padding: 6px;
    top: 40%;
  }
}
</style>
