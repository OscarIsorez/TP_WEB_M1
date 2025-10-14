<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '../modeles/Todo'
import TodoComponent from './TodoComponent.vue'

const input = ref("")
const todos = ref<Todo[]>([])

function addTodo() {
  if (input.value) {
    todos.value.push({ id: todos.value.length + 1, title: input.value , state: 'pending', date: new Date() })
    input.value = ""
  }
}

function getRemainingTodosCount() {
  return todos.value.filter(todo => todo.state != 'done').length
}



</script>

<template>
    <input v-model="input" placeholder="Add a new todo" />
    <button @click="addTodo">Add</button>

    <button> All </button>
    <button> Active </button>
    <button> Completed </button>

    
    <TodoComponent v-for="todo in todos" :key="todo.id" :todo="todo"  @toggle= "toggleTodo"/>

    <footer> <span>{{ getRemainingTodosCount() }} items remaining to do</span></footer>
</template>
