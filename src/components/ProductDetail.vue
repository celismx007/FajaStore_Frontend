<template>
    <div class="product-detail">
        <div v-if="product" class="product-container">
            <!--columna de miniaturas-->
            <div class="thumbnail-container">
                <img v-for="(image, index) in product.images"
                 :key="index"
                 :src="image.image" 
                  :alt="`Thumbnail-image ${index + 1}`"
                  class="thumbnail-image"
                  @click="setMainImage(image.image)" />
            </div>
            <!--imgen principal del producto con las flechas de navegacion-->

            <div class="product-image-container">
                <button class="arrow left-arrow" @click="previousImage">&#8249;</button>
                <img :src="mainImage" :alt="product.name" class="product-image"/>
                <button class="arrow right-arrow" @click="nextImage">&#8250;</button>
            </div>
            <!--informacion del producto-->
            <div class="product-info">
                <h1 class="product-name">{{ product.name }}</h1>
                <br>
                <h3>Bs {{ product.price }}.</h3>
                <br>
                <p class="product-price">Elegir color: <strong>{{ colorSeleccionado }}</strong></p>
                <div class="color-selector justify-content-center">
                    <!--itererar sobre los colores y mostrar un cuadro-->
                    <div v-for="(color, index) in colors" :key="index"
                    :class="['color-box', { selected: selectedColor == color }]"
                    :style="{ background: color }"
                    @click="selectColor(color)"></div>
                </div>
                <br>
                <p>Elegir Talla: <strong>{{ selectedSize }}</strong></p>
                <a href="#" @click.prevent="openSizeGuide"> <img src="../assets/tallasIcon.png" alt="">Asegurese de la medida, Guia de Tallas </a>
                <div class="size-selector justify-content-center">
                    <!--itererar sobre los colores y mostrar un cuadro-->
                    <div v-for="(size, index) in sizes" :key="index"
                    :class="['color-box', { selected: selectedSize == size }]"
                    :style="{ background: size }"
                    @click="selectSize(size)"><strong>{{ size }}</strong></div>
                </div>
                <br>
                    <button class="actions" @click="addToCart"><strong>Agregar al Carrito <img class="outline icon-img" width="9%" height="9%" src="../assets/iconCarrito.png" alt=""></strong></button>
                    <button class="actions" @click="buyNow"><strong>Comprar Ahora $ </strong></button>
                <br>
                <br>
                <h5><strong>Descripcion</strong></h5>
                <p class="product-description">{{ product.description }}</p>
            </div>
        </div>
        <ImageModal 
        v-if="showModal" 
        :imageSrc="sizeGuideImage"
        :isVisible="showModal"
        @close="showModal = false"
        />
        <div v-if="!product">
            <p class="loading-message">Cargando producto...</p>
        </div>
        <CartModal :isCartOpen="isCartOpen" @close-cart="toggleCart"/>
    </div>
</template>

<script setup>
import CartModal from './CartModal.vue';
import ImageModal from './ImageModal.vue';
import { useStore } from 'vuex';
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getHeaderRequest } from '@/authService';
import '@fontsource/bodoni-moda'; // Importa estilos normales
import '@fontsource/bodoni-moda/700.css'; // Importa estilos negrita (opcional)


const baseUrl = import.meta.env.VITE_BASE_URL;
const product = ref(null);
const mainImage = ref(''); //imagen a mostrar en la imagen principal
const currentImageIndex = ref(0);
const colors = ref(['black', 'pink', 'white']);
const sizes = ref(['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']);
const selectedSize = ref(null);
const selectedColor = ref(null); 
const colorSeleccionado = ref(null);
const showModal = ref(false);
const sizeGuideImage = ref('.../assets/imageTallas.png');
const route = useRoute(); 
const router = useRouter()
const store = useStore();
const header = getHeaderRequest();
const isCartOpen = ref(false);

 
const fetchProduct = async () => {
    const productId = route.params.id;
    try {
        const response = await axios.get(baseUrl+"product/"+productId, header);
        product.value = response.data;
        console.log(response.data);
        setMainImage(product.value.images[0].image);
    } catch (error) {
        console.error('Error al cargar el producto:', error);
    }
}

const openSizeGuide = () => {
    showModal.value = true; 
};

const nextImage = () => { 
    //cambiar a la siguiente imagen
    if (product.value.images.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % product.value.images.length; 
        mainImage.value = product.value.images[currentImageIndex.value].image;
    }
};

const previousImage = () => {
    //cambio al anteriro
    if (product.value.images.length > 0) { 
        currentImageIndex.value = (currentImageIndex.value - 1 + product.value.images.length) % product.value.images.length;
        mainImage.value = product.value.images[currentImageIndex.value].image;
    }
};

const setMainImage = (image) => {
    mainImage.value = image; //cabiar la imagen principal con click en un miniatura 
};

const addToCart = () => {
    product.value.size = selectedSize.value;
    product.value.color = selectedColor.value;
    console.log(product.value);
    if( selectedColor.value != null && selectedSize.value != null) {
        store.dispatch('addToCart', product.value);
        toggleCart();
    } else { 
        alert('Debes Elegir un color y una talla!.')
    }
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const buyNow = () => { 
    addToCart(); 
    //logica para comprar el producto 
    if( selectedColor.value != null && selectedSize.value != null) {
        router.push('/checkout'); // Navega a la página de checkout
    } 
};

const selectColor = (color) => {
    selectedColor.value = color;
    if(color == 'black'){
        colorSeleccionado.value = 'Negro';
    } else if(color == "pink") { 
        colorSeleccionado.value = 'Beige';
    } else { 
        colorSeleccionado.value = 'Blanco';
    }
};

const selectSize = (size) => {
    selectedSize.value = size;
};

onMounted(() => {
    fetchProduct();
})
</script>


<style scoped>
.product-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.product-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    width: 100%;
}
.thumbnail-container { 
    flex: 0 0 80px;
    display: flex; 
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    max-height: 100%;
    width: 100%;
}
.thumbnail-image { 
    width: 100%;
    height: auto;
    max-width: auto;
    max-height: auto;
    object-fit: cover;
    margin-bottom: 10px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    background-color: #e6e2e2;
}
.thumbnail-image:hover { 
    border-color: #f1c40f;
}
.product-image-container { 
    flex: 1;
    display: flex;  
    justify-content: center;
    align-items: center;
    padding: 10px;
    position: relative;
}
.product-image {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: contain;
}
.arrow {
  top: 50%;
  transform: translateY(-50%);
  background-color:     rgba(255, 253, 253, 0.5);
  color: rgb(73, 64, 64);
  border: none;
  font-size: 3rem;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.left-arrow { 
    left: 10px;
}
.right-arrow { 
    right: 10px;
}
.arrow:hover { 
    background-color: rgba(240, 227, 227, 0.8);
}
.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
}
.product-name { 
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
}
.product-description { 
    margin-bottom: 20px;
    color: #666;
    line-height: 1.6;
}
.product-price { 
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #333;
}
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  display: flex;
  gap: 30px;    
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #e9810a;
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.actions:hover {
  background-color: #e0c212;
}
.loading-message { 
    text-align: center;
    font-size: 1.2rem;
    color: #888;
    padding: 40px 0;
}
.color-selector {
    display: flex;
    gap: 10px;
}
.size-selector {
    display: flex;
    gap: 3px;
}
.color-box { 
    width: 40px;
    height: 40px;
    border-radius: 15px;
    cursor: pointer;
    border: 0.1px solid rgb(180, 163, 163);
    transition: border-color 0.3s;
    display: flex; /* Activa Flexbox */
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    border: 1px solid #ccc; /* Para visualizar el contenedor */
}
.color-box.selected {
  border: 3px solid rgb(247, 145, 12);
  background-color: #eb890a;
}

h1 {
  font-family: 'Bodoni Moda', serif;
  font-weight: 500; 
}
h3 {
  color: black;
  font-weight: 500; 
}
@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
    align-items: center;
  }

  .thumbnail-container {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    max-height: none;
    margin-bottom: 10px;
  }

  .thumbnail-image {
    width: 60px;
    height: 60px;
    margin: 5px;
    object-fit: cover;
  }

  .product-image-container {
    padding: 10px;
    width: 100%;
  }

  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .arrow {
    font-size: 2rem;
    padding: 6px;
  }

  .product-info {
    padding: 10px;
    max-width: 100%;
  }

  .product-name {
    font-size: 1.6rem;
    text-align: center;
  }

  .product-price,
  .product-description {
    text-align: center;
  }

  .color-selector,
  .size-selector {
    justify-content: center;
    flex-wrap: wrap;
  }

  .color-box {
    width: 35px;
    height: 35px;
  }

  .actions {
    font-size: 0.9rem;
    padding: 10px 16px;
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }

  .actions img.icon-img {
    width: 20px;
    height: 20px;
  }

  a {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 10px 0;
  }

  a img {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .product-name {
    font-size: 1.4rem;
  }

  .thumbnail-image {
    width: 50px;
    height: 50px;
  }

  .color-box {
    width: 30px;
    height: 30px;
  }

  .actions {
    font-size: 0.8rem;
  }
}

</style>