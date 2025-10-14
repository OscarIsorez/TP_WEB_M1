<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Todo } from '../modeles/Todo'
import TodoComponent from './TodoComponent.vue'

const input = ref("")
const todos = ref<Todo[]>(getInitialTodos())

function getInitialTodos(): Todo[] {
  return [
    { id: 1, title: 'Learn Vue 3', state: 'done', date: new Date('2024-01-01') },
    { id: 2, title: 'Build a Todo App', state: 'pending', date: new Date('2024-02-15') },
    { id: 3, title: 'Master TypeScript', state: 'pending', date: new Date('2024-03-10') }
  ]
}

const filter = ref<'all' | 'pending' | 'done'>('all')

const filteredTodos = computed(() => {
  if (filter.value === 'all') {
    return todos.value
  }
  return todos.value.filter(todo => todo.state === filter.value)
})

function addTodo() {
  if (input.value) {
    todos.value.push({ id: todos.value.length + 1, title: input.value , state: 'pending', date: new Date() })
    input.value = ""
  }
}

function getRemainingTodosCount() {
  return todos.value.filter(todo => todo.state != 'done').length
}

function toggleTodo(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.state = todo.state === 'pending' ? 'done' : 'pending'
  }
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

function updateTodo(id: number, title: string) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.title = title
  }
}

function deleteAllTodos() {
  todos.value = []
}

</script>

<template>
  <div class="todos-container">
    <input v-model="input" placeholder="Add a new todo" />
    <button @click="addTodo">Add</button>
    <button @click="deleteAllTodos">Delete all</button>

    <div>
      <input type="radio" id="all" value="all" v-model="filter">
      <label for="all">All</label>
      
      <input type="radio" id="pending" value="pending" v-model="filter">
      <label for="pending">Pending</label>
      
      <input type="radio" id="done" value="done" v-model="filter">
      <label for="done">Done</label>
    </div>

    <TodoComponent v-for="todo in filteredTodos" 
    :key="todo.id" 
    :todo="todo" 
    @toggle="toggleTodo" 
    @delete="deleteTodo"
    @update="updateTodo"
    />

    <footer    v-if="todos.length > 0 && getRemainingTodosCount() > 0 ">
      <span>{{ getRemainingTodosCount() }} items remaining to do</span>
    </footer>
  </div>
</template>
