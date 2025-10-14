<script setup lang="ts">
import { defineProps, ref, nextTick } from 'vue'
import type { Todo } from '../modeles/Todo'

const props = defineProps<{
    todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'delete', id: number): void
  (e: 'update', id: number, title: string): void
}>()

const isEditing = ref(false)
const editTitle = ref('')
const editInput = ref<HTMLInputElement | null>(null)

function toggle() {
    emit('toggle', props.todo.id)
}

function deleteTodo() {
    emit('delete', props.todo.id)
}

async function startEdit() {
    isEditing.value = true
    editTitle.value = props.todo.title
    await nextTick()
    editInput.value?.focus()
    editInput.value?.select()
}

function saveEdit() {
    if (editTitle.value.trim()) {
        emit('update', props.todo.id, editTitle.value.trim())
    }
    isEditing.value = false
}

function cancelEdit() {
    isEditing.value = false
    editTitle.value = ''
}
</script>

<template>
    <ul>
        <li style="cursor: pointer; display: flex; align-items: center; gap: 8px;"> 
            <input type="checkbox" :checked="props.todo.state === 'done' " @change="toggle" />
            
            <!-- editable with a double click  -->
            <span v-if="!isEditing" @dblclick="startEdit">
                {{props.todo.title + ' (' + props.todo.state + ') ' + props.todo.date.toLocaleDateString()}}
            </span>
            <input 
                v-else 
                v-model="editTitle" 
                @keyup.enter="saveEdit"
                @keyup.escape="cancelEdit"
                @blur="saveEdixt"
                style="flex: 1"
                ref="editInput"
            />
            <button @click="deleteTodo">Delete</button>
        </li>
    </ul>
</template>