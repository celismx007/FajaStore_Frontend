<script setup>

defineProps({ 
    modelValue: { type: [String, Number], required: true }, 
    label: { type: String, required: true }, 
    id: { type: String, required: true }, 
    placeholder: { type: String, default: '' }, 
    type: { type: String, default: 'text'},
})

const emit = defineEmits(['update:modelValue']);
const updateValue = (event) => { 
    emit('update:modelValue', event.target.value); 
}; 
</script>

<template>
    <div>
        <label :for="id" class="form-label m-0">{{ label }}</label>
        <input 
            :type="type"
            :id="id"
            :value="modelValue"
            @input="updateValue"
            class="form-control m-0"
            :placeholder="placeholder"
            >
        <slot></slot>
    </div>
</template>


<style scoped>
input { 
  width: 100%;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 50px;
  outline: none;
}
</style>