<template>
  <div class="home">
    <Controller msg="Temperature"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Controller from '@/components/Controller.vue'

export default {
  name: 'home',
  components: {
    Controller
  }
}
</script>
