<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { Todo } from '../modeles/Todo'

const props = defineProps<{
    todo: Todo
}>()

</script>

<template>
    <ul>
        <li> {{props.todo.title + ' (' + props.todo.state + ')' + props.todo.date.toLocaleDateString()}}</li>

    </ul>

    
</template>