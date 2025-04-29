<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { getHeaderRequest } from '@/authService';


const baseUrl = import.meta.env.VITE_BASE_URL;
const props = defineProps({
  isVisible: Boolean
});
const emit = defineEmits(['close']);
const router = useRouter(); 
const email = ref('');
const password = ref('');
const header = getHeaderRequest();

const handleLogin = async () => {
  try { 
    const response = await axios.post(baseUrl + "auth/login", { 
      userName: email.value, 
      password: password.value
    }, header);
    const dataUser = await axios.get(baseUrl + "user/" + response.data.account.userId, header);
    response.data.account.role = dataUser.data.role;
    localStorage.setItem('token', JSON.stringify(response.data.token)); 
    localStorage.setItem('user', JSON.stringify(response.data.account));
    close(); 
    if(dataUser.data.role === 'client'){ 
      router.push('/');
    } else if(dataUser.data.role === 'admin') {
      router.push('/admin');
    }
  } catch (error) { 
    console.error('error al iniciar sesion', error); 
  }
};

const close = () => {
  emit('close');
};
</script>


<template>
    <div v-if="isVisible" class="modal-overlay" @click="close">
        <div class="modal-content" @click.stop>
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" required />

            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" required />

            <button type="submit"  class="login-button">Iniciar Sesión</button>
        </form>
        <p class="register-link">¿No tienes una cuenta? <router-link to="/register" @click="close">Regístrate aquí</router-link></p>
        <button @click="close" class="close-button">X Cerrar</button>
        </div>  
    </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Fondo más oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */
  width: 100%;
  max-width: 400px; /* Ancho máximo para mantenerlo centrado */
  animation: slide-down 0.3s ease; /* Animación de deslizamiento */
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333; /* Color de texto más oscuro */
  font-family: 'Bodoni Moda', serif;
  font-weight: 600; 
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 14px;
}

input[type="text"],
input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 16px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #f1c40f; /* Color de enfoque */
  outline: none;
}

.login-button {
  width: 60%;
  padding: 10px;
  background-color: black; /* Color de botón */
  color: #f1c40f;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: black; /* Color al pasar el mouse */
  color: #e7723c;
}

.register-link {
  margin-top: 15px;
  font-size: 14px;
  color: black;
}

.register-link a {
  color: black;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}

.close-button {
  margin-top: 15px;
  background-color: transparent;
  color: #888;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.close-button:hover {
  color: #555;
}

@keyframes slide-down {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@media (max-width: 480px) {
  .modal-content {
    padding: 20px;
    max-width: 90%;
    font-size: 14px;
  }

  h2 {
    font-size: 20px;
  }

  label {
    font-size: 13px;
  }

  input[type="text"],
  input[type="password"] {
    padding: 8px;
    font-size: 14px;
  }

  .login-button {
    width: 100%;
    font-size: 15px;
    padding: 10px;
  }

  .register-link {
    font-size: 13px;
  }

  .close-button {
    font-size: 13px;
  }
}
</style>