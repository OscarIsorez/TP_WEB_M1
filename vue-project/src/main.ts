import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const defaultBackgroundColor = 'yellow'
const defaultText = 'yellow text'

app.use(router)

app.mount('#app')

app.directive('background', (el, binding) => {
  el.style.backgroundColor = binding.arg || defaultBackgroundColor
  el.innerHTML = 'My background is ' + (binding.arg || defaultBackgroundColor)
})
