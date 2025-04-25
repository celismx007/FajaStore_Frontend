<template>
    <div>
        <h2>Panel de administracion de productos</h2>
        <br>
        <div>
            <div class="text-end">
                <Button    
                data-bs-toggle="modal"
                data-bs-target="#modalProduct"
                text="Nuevo"
                icon="fa fa-plus"
                class="btn-color"
                    />
            </div>
            <TableProducts 
                :headers="headers"
                :items="products"
                :actions="{
                    edit: selectProduct, 
                    delete: delteProduct,
                }"
                />
            <Modal
                modalId='modalProduct'
                title="Tabla de Productos"
                modalClass="modal-lg"
                :showSaveButton="!selectedProduct?.id"
                :showUpdateButton="Boolean(selectedProduct?.id)"
                @onClose="reset()"
                @onSave="saveProduct()" >
                <Input 
                    id="img"
                    label="Imagen"
                    v-model="img"
                    type="text"
                    placeholder="ingrese la url de una imagen"/> 
                    <Button
                            @click="addImage"
                            text="Agregar Imagen"
                            icon="fa fa-edit"
                            buttonClass="btn-primary btn-sm m-1" 
                            />
                <div v-if="selectedProduct.images.length > 0">
                    <ul v-for="item in selectedProduct.images" :key="item">
                        <li>{{ item.image }} 
                            <button
                                class="btn btn-danger btn-sm"
                                @click="removeImg(item)"
                             > <i class="fa fa-times"></i>
                            </button>
                        </li>
                    </ul>
                </div>
                <Input 
                    id="name"
                    label="Nombre"
                    v-model="selectedProduct.name"
                    type="text"
                    placeholder="ingrese el nombre"/> 
                <Input 
                    id="price"
                    label="Precio"
                    v-model="selectedProduct.price"
                    type="number"
                    placeholder="ingrese el Precio"/> 
                <Input 
                    id="brand"
                    label="Marca"
                    v-model="selectedProduct.brand"
                    type="text"
                    placeholder="ingrese la Marca"/> 
                <Input 
                    id="category"
                    label="Categoria"
                    v-model="selectedProduct.category"
                    type="text"
                    placeholder="ingrese la Categoria"/> 
                <Input 
                    id="stock"
                    label="Stock"
                    v-model="selectedProduct.stock"
                    type="text"
                    placeholder="ingrese el Stock"/> 
                <Input 
                    id="description"
                    label="Descripcion"
                    v-model="selectedProduct.description"
                    type="text"
                    placeholder="ingrese la Descripcion"/> 
                <Input 
                    id="size"
                    label="Talla"
                    v-model="selectedProduct.size"
                    type="text"
                    placeholder="ingrese la Talla"/> 
                <Input 
                    id="color"
                    label="Color"
                    v-model="selectedProduct.color"
                    type="text"
                    placeholder="ingrese el Color"/> 
            </Modal>
        </div>
    </div>
</template>

<script setup>
import { getHeaderRequest } from '@/authService';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import TableProducts from '@/components/base/TableProducts.vue';
import Modal from '@/components/base/Modal.vue';
import { openModal, closeModal } from '@/modal';
import Button from '@/components/base/Button.vue';
import Input from '@/components/base/Input.vue';

const products = ref([]);
const header = getHeaderRequest();
const baseUrl = import.meta.env.VITE_BASE_URL + 'product/';
const baseUrlImg = import.meta.env.VITE_BASE_URL + 'image/';

const headers = [
    'Imagenes',
    'Nombre',
    'Precio', 
    'Marca',
    'Categoria',
    'Stock', 
    'Descripcion', 
    'Creacion', 
    'Talla', 
    'Color',
    'Acciones'
];

const selectedProduct = ref({
    images: [],
});
const images = ref([]);
const img = ref('');

const fetchProducts = async() => { 
    try { 
        console.log(baseUrl)
        const response = await axios.get(baseUrl, header);
        products.value = response.data; 
        console.log(products.value);
    } catch (e) { 
        console.error('error al obtener los productos', e); 
    }
};

const selectProduct = (product) => { 
    images.value = product.images;
    selectedProduct.value = product;
    openModal("modalProduct");
}

const saveProduct = async () => { 
    try { 
        console.log(selectedProduct.value); 
        const method = selectedProduct.value.id ? "put" : "post"
        const url = selectedProduct.value.id ? 
                `${baseUrl}${selectedProduct.value.id}`
                : baseUrl;
        const response = await axios[method](url, selectedProduct.value, header);
        alert('producto echo correctamente!');
        reset();
        closeModal("modalProduct");
    } catch(e) { 
        console.error(e);
    }
}

const delteProduct = async (product) => { 
    try { 
        const response = await axios.delete(baseUrl+product);
        fetchProducts();
    } catch (e) { 
        console.error(e);
    }
}

const reset = () => {
    if( images.value.length > 0 && !selectedProduct.value.name ) { 
        for (const item of images.value) { 
            if( !item.productId) {
                removeImg(item); 
            }
        }
    } 
    selectedProduct.value = {
            images: [],
    };
    images.value = [];
} 

const addImage = async () => { 
    if (img.value.trim()) { 
        try { 
            const data = { image: img.value, productId: selectedProduct.value.id };
            const response = await axios.post(baseUrlImg, data, header);
            const imageRes = response.data;
            images.value.push({id: imageRes.id, productId: imageRes.productId || null,  image: img.value });
            selectedProduct.value.images = images.value;
            img.value = '';
            alert('imagen agregada correctamente!');
        } catch(e) { 
            console.error(e);
            return;
        }
    } else { 
        alert('El campo de imagen está vacío.');
    }
} 

const removeImg = async (item) => { 
    try { 
        await axios.delete(baseUrlImg+item.id, header);

        const idToRemove = item.id; 
        const index = images.value.findIndex(image => image.id === idToRemove);
        if (index !== -1) {
        images.value.splice(index, 1);
        }
        selectedProduct.value.images = images.value;
        alert('imagen eliminada');
    } catch (e) { 
        console.error(e);
    }
}

onMounted(() => {
    fetchProducts();
});
</script>