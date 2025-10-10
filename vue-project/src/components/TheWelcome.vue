<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
const title = ref("WE")
function foo() {
  visible.value = !visible.value
}

</script>

<template>
  <h1>hello</h1>
  <p v-if="visible">Maintenant vous me voyez {{ title }}</p>
  <button v-on:click="foo()">ok</button>
</template>
