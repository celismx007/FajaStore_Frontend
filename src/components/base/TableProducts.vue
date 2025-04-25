<script setup>
import { computed, ref } from 'vue';
import Button from './Button.vue';
import { formatDate } from '@/utils/formatData';


const props = defineProps({
    headers: { 
        type: Array, 
        required: true,
    }, 
    items: { 
        type: Array, 
        required: true,
    }, 
    actions: { 
        type: Object, 
        required: true,
    }
});

const itemsPerPage = 7; 
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage)); 

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage; 
    return props.items.slice(start, end);
});

const changePage = (page) => {
    if( page >= 1 && page <= totalPages.value) { 
        currentPage.value = page; 
    }
};

const getShortDescription = (description) => {
    if (!description) return '';
    const length = Math.ceil(description.length / 3);
    return description.substring(0, length) + (description.length > length ? '...' : '');
};

</script>

<template>
    <div class="table-responsive">
        <table class="table table-scriped table-hover">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="items.length === 0">
                    <td colspan="6" class="text-center">No hay Productos Registrados</td>
                </tr>
                <tr v-for="item in paginatedItems" :key="item.id">
                    <td v-if="item.images.length > 0"><img :src="item.images[0].image" alt=""
                        style="width: 150px; height: auto;"
                        ></td>
                    <td>{{ item.name }}</td>
                    <td>Bs. {{ item.price }}</td>
                    <td>{{ item.brand }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.stock }}</td>
                    <td>{{ getShortDescription(item.description) }}</td>
                    <td>{{ formatDate(item.creationDate) }}</td>
                    <td>{{ item.talla }}</td>
                    <td>{{ item.color }}</td>
                    <td>
                        <Button
                            @click="() => actions.edit(item)"
                            icon="fa fa-edit"
                            buttonClass="btn-black btn-sm m-1" 
                            />
                        <Button
                            @click="() => actions.delete(item.id)"
                            icon="fa fa-trash"
                            :buttonClass="`btn-black btn-sm m-1`"
                            />
                    </td>
                </tr>
            </tbody>
        </table>

        <nav
            aria-label="Page navigation"
            class="d-flex justify-content-center mt-3"
            >
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPag === 1 }">
                    <a 
                        class="page-link"
                        href="#"
                        @click.prevent="changePage(currentPage - 1)"
                        >Anterior</a>
                </li>
                <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === currentPage }"
                    >
                    <a 
                        class="page-link"
                        href="#"
                        @click.prevent="changePage(page)"
                        > {{ page }}</a>
                </li>
                <li
                    class="page-item" :class="{ disabled: currentPage === totalPages }"
                    >
                    <a 
                        class="page-link"
                        href=""
                        @click.prevent="changePage(currentPage + 1)">
                    Siguiente</a>

                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.pagination .page-link {
  color: var(--primary-color);
}

.pagination .page-item.active .page-link {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: silver;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
}
.btn-black {
    background-color: black;
    color: white;
    border: none; /* Opcional para quitar bordes */
}

.btn-black:hover {
    background-color: #333; /* Oscurecer un poco en hover */
}
</style>