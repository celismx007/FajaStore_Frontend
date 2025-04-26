<template>
  <div class="register-container shadow">
    <h2>Registro</h2>
    <br>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="firstName">Nombre:</label>
        <input type="text" id="firstName" v-model="userRegister.name" required />
      </div>
      <div class="form-group">
        <label for="lastName">Apellidos:</label>
        <input type="text" id="lastName" v-model="userRegister.lastName" required />
      </div>
      <div class="form-group">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="userRegister.email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="userRegister.password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Repetir contraseña:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <br>
      <button type="submit" class="register-button">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';

const userRegister = ref({
  email: '',
  lastName: '',
  name: '',
  password: '',
});
const baseUrl = import.meta.env.VITE_BASE_URL;
const confirmPassword = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
  if (userRegister.value.password !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden';
    return;
  }
  try {
    const response = await axios.get(baseUrl + "user", userRegister.value);
    console.log('Usuario registrado:', response.data);
    alert('Usuario creado exitosamente');
    resetData();
  } catch (e) {
    console.error('Error en el registro: ', e);
  }
};

const resetData = () => {
  userRegister.value = {
    email: '',
    lastName: '',
    name: '',
    password: '',
  };
  confirmPassword.value = '';
  errorMessage.value = '';
}
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  border: 1px solid black;
  max-width: 500px;
  width: 90%;
  margin: 40px auto;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #fff;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  color: black;
  text-align: center;
}

.register-form {
  width: 100%;
}

.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: black;
  font-weight: 600;
  font-size: 0.95rem;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #f1c40f;
  outline: none;
}

.error-message {
  color: #ff6b6b;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
}

.register-button {
  width: 100%;
  padding: 14px;
  background-color: black;
  color: #f1c40f;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.register-button:hover {
  color: #e7723c;
}

/* Responsive improvements */
@media (max-width: 480px) {
  .register-container {
    padding: 20px 15px;
    margin: 20px auto;
  }

  input {
    padding: 10px;
  }

  .register-button {
    padding: 12px;
    font-size: 0.95rem;
  }
}
</style>
