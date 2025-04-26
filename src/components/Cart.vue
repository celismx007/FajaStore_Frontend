<template>
  <div>
    <h2>Mi Carrito de Compras</h2>  
    <br>
    <div v-if="cartItems.length > 0" >
      <div>  
          <div class="row p-4">
            <div class="col-sm-12 col-lg-8"> 
              <table class="table table-striped shadow">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Unidad (Bs.)</th>
                    <th>Cantidad</th>
                    <th>Total (Bs.)</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartItems" :key="item.id">
                    <td>
                        <img width="15%" height="15%" :src="item.images[0].image" :alt="item.name" loading="lazy"/>
                        {{ item.name }} <strong>{{ item.color }} {{ item.size }}</strong>
                    </td>
                    <td>{{ item.price }}</td>
                    <td>
                      <div class="quantity-control">
                              <button @click="reduceQuantity(item.id)" class="quantity-button"><strong>-</strong></button>
                              <button class="quantity-button"><strong>{{ item.quantity }}</strong></button>
                              <button @click="increaseQuantity(item.id)" class="quantity-button"><strong>+</strong></button>
                      </div>
                    </td>
                    <td>{{ item.quantity * item.price }}</td>
                    <td>
                      <button @click="removeFromCart(item.id)" class="remove-button">&#10006;</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-sm-5 col-md-3 totals shadow m-2">
              <h3><strong>Resumen del pedido</strong></h3>
              <hr>
              <br>
              <p>productos: Bs. {{ total }}</p>
              <br>
              <p>algun otro importe: Bs. 0.0</p>
              <br>
              <p>subtotal: Bs. {{ total }}</p>
              <br><br><br>
              <hr>
              <div class="cart-total">
                  <p><strong>Total a pagar:</strong> {{ total }} bs.</p>
              </div>
              <hr>
              <button @click="checkout" class="checkout-button">Pagar</button>
            </div>
          </div>
      </div>
    </div>
    <div v-if="cartItems.length <= 0">
      <h5>tu carrito esta vacio.</h5>
      <br>
      <router-link to="/" class="router-link"><strong>&#x21A9; Continuar comprando</strong></router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// Acceso a los getters
const cartItems = computed(() => store.getters.cartItems);

// Total calculado
const total = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

// Acciones
const removeFromCart = (payload) => store.dispatch('removeFromCart', payload);
const updateQuantity = (payload) => store.dispatch('updateQuantity', payload);

// Redirigir al checkout
const checkout = () => {
  router.push('/checkout');
};

// Aumentar la cantidad
const increaseQuantity = (productId) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (item) {
    updateQuantity({ id: productId, quantity: item.quantity + 1 });
  }
};

// Disminuir la cantidad
const reduceQuantity = (productId) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (item && item.quantity > 1) {
    updateQuantity({ id: productId, quantity: item.quantity - 1 });
  }
};
</script>


<style scoped>
.quantity-control {
    display: block;
    padding: 5px;
    align-items: center;
    gap: 10px;
    justify-content: space-around; /* Centra y distribuye los botones */
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

.container { 
    padding: 20px;
}

.cart-items {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #dee2e6;
}

.item-info {
    display: flex;
    flex-direction: row;
}

.item-title {
    font-size: 18px;
    color: #495057;
}

.item-quantity {
    font-size: 14px;
    color: #6c757d;
}

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

.remove-button:hover {
    background-color: #c82333;
}

.cart-total {
    text-align: center;
    margin: 20px 0;
    font-size: 18px;
    color: #343a40;
}

.checkout-button {
    display: block;
    width: 100%;
    padding: 10px 0;
    background-color: #ee9611;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background-color 0.3s ease;
}

.checkout-button:hover {
    background-color: #ddc22c;
}

/* Estilo de la tabla */
.table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
}

.table th,
.table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.table thead th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #343a40;
    border-bottom: 2px solid #ddd;
}

.table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.table tbody tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
}

/* Estilos generales */
h2 {
    margin-bottom: 20px;
    color: black;
    font-family: 'Bodoni Moda', serif;
    font-weight: 500;
}

a.router-link {
    color: #6c757d;
    text-decoration: none;
    font-weight: bold;
}

a.router-link:hover {
    color: #495057;
}

/* Media Queries para adaptar el diseño a pantallas pequeñas */
@media (max-width: 768px) {
    .cart-items {
        padding: 0;
    }

    .cart-item {
        flex-direction: column; /* Apilar los ítems */
        text-align: center;
        gap: 10px;
    }

    .cart-total {
        font-size: 16px;
    }

    .checkout-button {
        font-size: 14px;
    }

    /* Tabla en pantallas más pequeñas */
    .table {
        width: 100%;
    }

    .table th,
    .table td {
        padding: 8px;
        font-size: 14px;
    }

    .table thead th {
        background-color: #f8f9fa;
        font-weight: bold;
    }

    .remove-button {
        font-size: 12px;
        padding: 4px 8px;
    }

    .quantity-button {
        font-size: 14px;
        padding: 5px 8px;
    }
}

@media (max-width: 480px) {
    .table {
        display: block;
        overflow-x: auto;
    }

    .table th,
    .table td {
        font-size: 12px;
        padding: 6px;
    }

    .cart-item {
        padding: 8px 0;
    }

    .cart-item img {
        width: 30%;
        height: auto;
    }

    .cart-item-info {
        text-align: center;
    }

    .quantity-control {
        justify-content: center;
        gap: 5px;
    }

    .checkout-button {
        font-size: 12px;
        padding: 10px;
    }

    .cart-total {
        font-size: 14px;
    }

    .remove-button {
        font-size: 10px;
        padding: 4px 6px;
    }
}

</style>