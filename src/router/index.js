import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cart from '@/components/Cart.vue';
import Checkout from '@/components/Checkout.vue'
import MainPageView from '@/views/MainPageView.vue';

const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: MainPageView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/postParto', 
    name: 'postParto', 
    component: () => import('../views/FajasPostParto.vue')
  },
  {
    path: '/cinturillas', 
    name: 'cinturillas', 
    component: () => import('../views/CinturillasView.vue')
  },
  {
    path: '/modeladoras', 
    name: 'modeladoras', 
    component: () => import('../views/ModeladorasView.vue')
  },
  {
    path: '/accesorios', 
    name: 'accesorios', 
    component: () => import('../views/AccesoriosView.vue')
  },
  {
    path: '/SearchResults', 
    name: 'SearchResults', 
    component: () => import( '@/views/SearchResults.vue')
  },
  {
    path: '/product/:id', 
    name: 'ProductDetail', 
    component: () => import( '@/components/ProductDetail.vue'),
    props: true // Esta línea indica que los parámetros de la ruta se pasarán como props
  },
  { path: '/cart',
    name: 'Cart', 
    component: Cart 
  },
  { path: '/checkout', 
    name: 'Checkout', 
    component: Checkout 
  },
  { path: '/register', 
    name: 'register', 
    component: () => import( '@/views/RegisterView.vue'),
  }, 
  { path: '/pijamas', 
    name: 'pijamas', 
    component: () => import( '@/views/pijamas.vue'),
  }, 
  { path: '/lenceria', 
    name: 'lenceria', 
    component: () => import( '@/views/lenceria.vue'),
  }, 
  { path: '/trajeBanio', 
    name: 'trajeBanio', 
    component: () => import( '@/views/trajeBanio.vue'),
  }, 
  { path: '/ropaInterior', 
    name: 'ropaInterior', 
    component: () => import( '@/views/ropaInterior.vue'),
  }, 
  { path: '/mariaE', 
    name: 'mariaE', 
    component: () => import( '@/views/MariaE.vue'),
  }, 
  { path: '/ancherry', 
    name: 'ancherry', 
    component: () => import( '@/views/Ancherry.vue'),
  }, 
  { path: '/salome', 
    name: 'salome', 
    component: () => import( '@/views/Salome.vue'),
  }, 
  { path: '/pareo', 
    name: 'pareo', 
    component: () => import( '@/views/pareo.vue'),
  }, 
  { path: '/admin', 
    name: 'admin', 
    component: () => import( '@/views/AdminView.vue'),
    meta: { requiresAuth: true } //requiere autenticacion
  }, 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Middleware para verificar la autenticación
router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = localStorage.getItem('user');

    // Redirigir a la página de login si no está autenticado
    if (!loggedIn) {
      return next('/login');
    }

    // Verificar si el usuario tiene acceso de administrador
    const user = JSON.parse(loggedIn);
    if (user && user.role.includes('admin')) {
      next();
    } else {
      next('/');  // Redirigir a la página principal si no es admin
    }
  } else {
    next();  // Permitir el acceso a rutas públicas
  }
});

export default router;
