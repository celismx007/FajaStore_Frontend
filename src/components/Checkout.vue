<script setup>
import { getHeaderRequest, getUserIdOfLocalStorage } from '@/authService';
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';


const baseUrl = import.meta.env.VITE_BASE_URL;
const userId = getUserIdOfLocalStorage() || null;
const phoneInput = ref(null);
const orderDetails = ref({
  userId: userId,
  name: '',
  address: '',
  phone: '',
  paymentMethod: 'credit_card',
  bankReference: '' 
}); 

const store = useStore();
const cartItems = computed(() => store.getters.cartItems);
const showConfirmationMessage = ref(false);
const header = getHeaderRequest();
const iti = ref('');

const total = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
})

const processOrder = async () => {
  try {
    const phoneNumber = iti.value.getNumber();
    const selectedCountryData = iti.value.getSelectedCountryData();
    orderDetails.value.phone = selectedCountryData.dialCode + orderDetails.value.phone;
    console.log(orderDetails.value.phone);
    const response = await axios.post(baseUrl + "clientBuyer", orderDetails.value, header)
    console.log(response.data);
    const clientBuyerId = response.data.id;
    if(clientBuyerId) { 
      for (var item of cartItems.value) { 
        const data = { 
          clientBuyersId: clientBuyerId,
          productId : item.id,
          size: item.size, 
          color: item.color, 
          status: 'pending', 
        }
        await axios.post(baseUrl + "requestedProduct", data, header)
      } 
    const sendMessage = { 
      number: response.data.phone,
      message: 'Tu pedido fue recibido en un momento te atiendo porfavor!'
    }
    await axios.post(baseUrl + "whatsapp/send", sendMessage, header);
    } else { 
      console.error('error al crear el cliente comprador')
      await axios.delete(baseUrl +"clientBuyer/"+clientBuyerId, header)
      return;
    }
    await store.dispatch('clearCart');
    showConfirmationMessage.value = true; 
  } catch(e) { 
    console.error('error al procesar el pedido:', e)
  }
}


onMounted(() => {
  if (typeof intlTelInput === 'undefined') {
    console.error("intlTelInput no está disponible.");
    return;
  }

  iti.value = intlTelInput(phoneInput.value, {
    initialCountry: 'auto', // Selección automática basada en IP
    geoIpLookup: (callback) => {
      fetch('https://ipinfo.io/json')
        .then((res) => res.json())
        .then((data) => callback(data.country))
        .catch(() => callback('us'));
    },
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
  });

  phoneInput.value.addEventListener('countrychange', () => {
    orderDetails.value.phone = iti.value.getNumber();
    const selectedCountryData = iti.value.getSelectedCountryData();
  });
});

</script>

<template>
    <div class="checkout-container">
      <h1 class="title">Verificar</h1>
      <br>
      <div class="row justify-content-center">
        <div class="col-lg-3 shadow border rounded">
              <div v-if="cartItems.length > 0">
                  <section class="shipping-details">
                    <h2>Detalles de Envío</h2>
                    <form @submit.prevent="processOrder">
                      <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input type="text" id="name" v-model="orderDetails.name" required />
                      </div>
                      <div class="form-group">
                        <label for="address">Dirección:</label>
                        <input type="text" id="address" v-model="orderDetails.address" required />
                      </div>
                      <div class="form-group">
                        <label for="phone">Teléfono:</label>
                        <input
                          type="tel"
                          id="phone"
                          v-model="orderDetails.phone"
                          ref="phoneInput"
                          required
                        />
                      </div>
                      <div v-if="orderDetails.paymentMethod === 'bank_transfer'" class="form-group">
                        <label for="bank_reference">Número de Referencia de Transferencia:</label>
                        <input type="text" id="bank_reference" v-model="orderDetails.bankReference" />
                        <p>Por favor, realiza una transferencia a la siguiente cuenta bancaria:</p>
                        <p>Banco: Banco union</p>
                        <p>Cuenta: 1234567890</p>
                        <p>IBAN: ABCDEFGH</p>
                      </div>
                      <button type="submit" class="confirm-button">Confirmar Pedido</button>
                    </form>
                  </section>
                </div>
                <div v-else class="empty-cart">
                <p>Tu carrito está vacío.</p>
                </div>
        </div>
        <div class="col-lg-4 shadow border rounded">
          <div v-if="cartItems.length > 0" class="checkout-content">
            <section class="order-summary">
              <div>
                <h3><strong>Resumen de la compra</strong></h3>
                  <hr>
                  <p>productos: Bs. {{ total }}</p>
                  <p>Envio: Bs. 0.0</p>
                  <p>Descuentos: Bs. 0.0</p>
                  <p>subtotal: Bs. {{ total }}</p>
                  <hr>
                  <div class="cart-total">
                      <p><strong>Total a pagar:</strong> {{ total }} bs.</p>
                  </div>
              </div>
              <br>
              <div>
                <p><strong>{{ cartItems.length }} productos ..... Bs. {{ total }}</strong></p>
                <ul class="item-list">
                    <li v-for="item in cartItems" :key="item.id" class="item">
                      <img width="15%" height="15%" :src="item.images[0].image" :alt="item.name" loading="lazy"/>
                      <span class="item-title">{{ item.name }} <strong>{{ item.color }} {{ item.size }}</strong></span>
                      <span class="item-details">{{ item.quantity }} x {{ item.price }} bs.</span>
                    </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div v-if="showConfirmationMessage" class="confirmation-message">
        <h2>Pedido Confirmado!</h2>
        <p>Tu pedido ha sido recibido y procesado. Te contactaras con duenia de la tienda en breve!.</p>
      </div>
    </div>
</template>

<style scoped>
.title {
  text-align: center;
  color: #333;
  font-size: 24px; /* Reducir tamaño en móviles */
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

.order-summary {
  margin-bottom: 30px;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap; /* Para mejor disposición en dispositivos móviles */
}

.item-title {
  font-size: 16px;
  color: #555;
}

.item-details {
  font-size: 14px;
  color: #888;
}

.total {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  color: #333;
}

.shipping-details {
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.confirm-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ee9611;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #ddc22c;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
  color: #888;
}

.confirmation-message {
  padding: 20px;
  background-color: #e0f7fa;
  border: 1px solid #b2ebf2;
  border-radius: 5px;
  text-align: center;
}

/* Media Queries para adaptación a dispositivos móviles */
@media (max-width: 768px) {
  .title {
    font-size: 22px; /* Ajustar tamaño de fuente en móviles */
  }

  .checkout-container {
    padding: 10px;
  }

  .row {
    display: block; /* En pantallas pequeñas, cambiar el layout */
    padding: 0;
  }

  .col-lg-3, .col-lg-4 {
    width: 100%; /* Colapsar las columnas en móviles */
    margin-bottom: 20px;
  }

  .item {
    justify-content: flex-start;
    padding: 10px;
    width: 100%;
  }

  .item img {
    width: 25%; /* Ajustar el tamaño de las imágenes en móviles */
    height: auto;
  }

  .item-title {
    font-size: 14px; /* Reducir tamaño de texto en móviles */
  }

  .item-details {
    font-size: 12px; /* Reducir tamaño de texto en móviles */
  }

  .order-summary {
    margin-bottom: 20px;
  }

  .cart-total p {
    font-size: 16px; /* Ajustar tamaño de texto en el total */
  }

  .form-group input {
    font-size: 14px; /* Ajustar tamaño de texto en campos de entrada */
  }

  .confirm-button {
    font-size: 14px; /* Reducir el tamaño del botón */
    padding: 12px;
  }

  .empty-cart p {
    font-size: 16px; /* Ajustar tamaño de texto en carrito vacío */
  }

  .confirmation-message p {
    font-size: 14px; /* Ajustar texto de confirmación */
  }
}

/* Media Query para pantallas muy pequeñas */
@media (max-width: 480px) {
  .title {
    font-size: 20px; /* Ajuste adicional para pantallas pequeñas */
  }

  .confirm-button {
    font-size: 14px;
    padding: 15px;
  }

  .order-summary h3 {
    font-size: 16px; /* Ajustar tamaño del título */
  }

  .cart-total p {
    font-size: 14px; /* Ajustar tamaño de total */
  }

  .form-group input {
    padding: 8px; /* Reducir el padding en inputs */
  }

  .item img {
    width: 30%; /* Ajustar imagen para pantallas más pequeñas */
  }

  .item-title {
    font-size: 13px; /* Ajustar texto de los items */
  }

  .item-details {
    font-size: 11px; /* Ajustar detalles de los items */
  }
}

</style>