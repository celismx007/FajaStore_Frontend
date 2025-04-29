<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    isCartOpen: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close-cart']);


const store = useStore();
const cartItems = computed(() => store.getters.cartItems);

const total = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
});

const increaseQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) { 
        store.dispatch('updateQuantity', { id: productId, quantity: item.quantity + 1 });
    }
};

const reduceQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId);
    if (item && item.quantity > 1) { 
        store.dispatch('updateQuantity', { id: productId, quantity: item.quantity - 1 });
    }
};

const removeFromCart = (productId) => { 
    store.dispatch('removeFromCart', productId);
};

const closeCart = () => {
  emit('close-cart');
};

</script>

<template>
    <div>
        <!--overlay oscuro-->
        <div v-if="isCartOpen"
            class="modal-overlay"
            @click="closeCart">
        </div>
        <!--este es el modal deslizante del carro-->
        <div class="cart-modal" :class="{ 'cart-open': isCartOpen }">
            <h2>Mi Carrito 🛒</h2>
            <hr>
            <button class="close-button" @click="closeCart">✖</button>
            <div v-if="cartItems.length == 0">
                <p>Tu carrito esta vacio.</p>
            </div>
            <ul class="cart-list">
                <li  v-for="(item, index) in cartItems" :key="index" class="cart-item">
                    <img width="30%" height="30%" :src=item.images[0].image alt="">
                    <div class="cart-item-info">
                        <span>{{ item.name }}</span>
                        <br>
                        <span>Bs. <strong>{{ item.price }}</strong></span>
                        <div class="quantity-control">
                            <button @click="reduceQuantity(item.id)" class="quantity-button"><strong>-</strong></button>
                            <button class="quantity-button"><strong>{{ item.quantity }}</strong></button>
                            <button @click="increaseQuantity(item.id)" class="quantity-button"><strong>+</strong></button>
                        </div>
                        <button @click="removeFromCart(item.id)" class="remove-button">&#10006;</button>
                    </div>
                </li>
            </ul>
            <hr>
            <p v-if="cartItems.length > 0" >Total:  Bs. <strong>{{ total }}</strong></p>
            <router-link to="/checkout">
                <button class="actions"><strong>Comprar  &#128181;</strong></button>
            </router-link>
            <router-link to="/cart">
                <button class="actions"><strong>Editar carrito  &#9998;</strong></button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.quantity-control {
    display: block;
    padding: 5px;
    align-items: center;
    gap: 10px;
}
.quantity-button {
    background-color: #e2d5b2;
    border: none;
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}
.quantity-button:hover {
    background-color: #daa364;
}
/*estilo para el overlay oscuro */
.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Oscurecido */
  z-index: 1190;
}
.cart-button { 
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f0c040;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
.cart-modal {
    position: fixed;
    top: 0;
    right: -350px; /* en el incio oculto */
    width: 350px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    padding: 20px;
    transition: right 0.3s ease;
    z-index: 1200;
    overflow: auto;
    max-width: 100%;
    
}
.cart-modal a {
    text-decoration: none; /* Elimina el subrayado */
}
.cart-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-width: 100%;
    box-sizing: border-box;
}
.cart-item { 
    display: flex;
    flex-direction: row;
    box-sizing: none;
    list-style-type: none;
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    max-width: 100%;
}
.cart-item-info { 
    display: block;
    overflow: hidden; /* Oculta el contenido que sobresale */
    text-overflow: ellipsis; 
}
.cart-open { 
    right: 0;/* Muestra el carrito deslizante */
}
.close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer; 
    position: absolute;
    top: 10px; 
    right: 10px;
}
.total { 
    font-weight: bold;
    margin-top: 20px;
}
.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 30px;    
  padding: 12px 24px;
  font-size: 1rem;
  background-color:     #e9810a;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.actions:hover {
  background-color: #e0c212;
}
@media (max-width: 768px) {
  .cart-modal {
    width: 100%;
    right: -100%;
    padding: 15px;
  }

  .cart-open {
    right: 0;
  }

  .cart-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cart-item img {
    width: 100%;
    height: auto;
    max-width: 200px;
    margin-bottom: 10px;
  }

  .cart-item-info {
    width: 100%;
  }

  .quantity-control {
    justify-content: center;
    display: flex;
    gap: 10px;
  }

  .actions {
    width: 100%;
    margin-top: 15px;
    font-size: 0.9rem;
    padding: 10px;
  }

  .close-button {
    top: 8px;
    right: 8px;
    font-size: 18px;
  }
}

</style>