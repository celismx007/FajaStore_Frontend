<script setup>

defineProps({
    text: { type: String, required: false },
    buttonClass: { type: String, default: 'btn-primary'}, 
    icon: { type: String, default: ''},
    textClass: { type: String, default: ''}, 
})

defineEmits(['click']);
</script>

<template>
        <button :class="['btn', buttonClass]" v-bind="$attrs" @click="$emit('click')">
            <i v-if="icon" :class="icon + ' mx-1 text-white'"></i>
            <span :class="textClass">{{ text }}</span>
        </button>
</template>

<style scoped>
</style>