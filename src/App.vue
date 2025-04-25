<script setup>
import { ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import Banner from '@/components/Banner.vue';
import TopBar from './components/TopBar.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';
import FooterInfo from './components/FooterInfo.vue';
import Navbar from './components/Navbar.vue';
import ContactComponent from "./components/ContactComponent.vue";

const router = useRouter();
const searchQuery = ref('');

const handleSearch = (query) => { 
  searchQuery.value = query; 
  router.push({
    name: 'SearchResults', query: { q: query } 
  });
  searchQuery.value = '';
};
</script>

<template>
  <div>
    <div id="app" class="container-fluidn">
      <Banner />
      <TopBar @search="handleSearch" />
      <Navbar />
      <main class="m-5">
          <router-view :search-query="searchQuery"/>
          <ContactComponent class="contact" />
      </main>
      <WhatsAppButton />
    </div>          
    <footer>
      <FooterInfo/>
    </footer>
  </div>
</template> 

<style>

#app {
  font-family: 'Playfair Display', serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

html, body { 
  height: 100%;
  margin: 0;
}

.container-fluidn { 
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


.contact {
  padding-bottom: 50px;
}
</style>
