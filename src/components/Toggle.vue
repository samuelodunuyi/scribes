<script setup>
// import { ref, onMounted } from 'vue'

// const id = ref(null)
// onMounted(() => {
//   id.value = _uid
// });

defineProps(['modelValue', 'disabled2'])
defineEmits(['update:modelValue'])


</script>

<template>
    <span class="switch">
        
        <input type="checkbox"
        :disabled="disabled2"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
        >
        <label></label>
    </span>
</template>

<style scoped>

.switch{
    --bg-color: rgb(231, 231, 231);
    --accent-color: rgb(50, 50, 248);
    --ch-color: rgb(20, 19, 19);
    position: relative;
    width: 50px;
    height: 24px;
    border-radius: 50px;

}

.switch input{
    appearance: none;
    width: inherit;
    height: inherit;
    border-radius: 25px;
    background: var(--bg-color);

    outline: none;
}

.switch input::before,
.switch input::after{
    font-size: 8px;
    z-index: 2;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bolder;
}

.switch input::before{
    content: 'YES';
    left: 10%;
}

.switch input::after{
    content: 'NO';
    right: 10%;
}

.switch input:checked{
    background: var(--accent-color);
}

.switch label{
    z-index: 1;
    position: absolute;
    top: 10%;
    bottom: 10%;
    border-radius: 20px;
}

.switch input{
    transition: 0.25s;
}

.switch input:checked::after,
.switch input:checked::before {
    color: var(--bg-color);
    transition: color 0.5s;
}

.switch input:not(:checked){
    background: var(--bg-color);
    transition: color 0.2s 0.5s;
}
.switch input:not(:checked)::before{
    color: var(--ch-color);
    transition: color 0.4s;
}

.switch input:checked+label{
    z-index: 3;
    left: 55%;
    right: 5%;
    background: var(--bg-color);
    transition: right 0.5s, left 0.4s 0.2s; 
}
.switch input:not(:checked) +label{
    z-index: 3;
    left: 5%;
    right: 55%;
    background: var(--accent-color);
    transition:  right 0.4s 0.2s, left 0.5s; 
}
</style>