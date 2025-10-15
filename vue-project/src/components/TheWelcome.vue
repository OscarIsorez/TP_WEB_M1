<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
const title = ref('WE')
const color = ref('yellow')
function foo() {
  visible.value = !visible.value
}
</script>

<template>
  <h1>hello</h1>
  <p v-if="visible">Maintenant vous me voyez {{ title }}</p>
  <div :style="{ backgroundColor: color }">coucou</div>

  <button v-on:click="foo()">ok</button>
  <div v-background>Etel O</div>
  <div v-background:green>Etel O</div>
</template>
