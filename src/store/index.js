import { createStore } from 'vuex'

export default createStore({
  state() {
    return { 
      cart: []
    };
  },
  mutations: { 
    ADD_TO_CART(state, product) { 
      const existingProduct = state.cart.find(item => item.id === product.id && item.color === product.color && item.size === product.size); 
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else { 
        state.cart.push({ ...product, quantity: 1}); 
      }
    },
    REMOVE_FROM_CART(state, productId) { 
      state.cart = state.cart.filter(item => item.id !== productId);  
    }, 
    CLEAR_CART(state) { 
      state.cart = [];
    },
    UPDATE_ITEM_QUANTITY(state, { id, quantity }) {
      const item = state.cart.find(item => item.id === id);
      if (item) { 
        item.quantity = quantity; 
      }
    }
  },
  actions: { 
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product); 
    }, 
    removeFromCart({ commit }, productId ) {
      commit('REMOVE_FROM_CART', productId);
    }, 
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    updateQuantity({ commit }, { id, quantity }) {
      commit('UPDATE_ITEM_QUANTITY', { id, quantity }); 
    }
  },
  getters: {
    cartItems: (state) => state.cart, 
    cartItemCount: (state) => state.cart.reduce((total, item) => total + item.quantity, 0)
  },
  modules: {
  }
});
