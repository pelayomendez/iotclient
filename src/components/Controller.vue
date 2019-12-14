<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <circle-slider
      v-model="temperature"
      :side="250"
      :min="0"
      :max="100"
      :step-size="1"
      :circle-width-rel="20"
      :progress-width-rel="10"
      :knob-radius="10"
      :knob-color="'#4099FF'"
      :progress-color="'#4099FF'"
    ><h3>0º</h3>
    </circle-slider>
    <h1>{{ temperature }} <span>&#176;</span> </h1>
  </div>
</template>

<script>
import Vue from 'vue'

import VueCircleSlider from 'vue-circle-slider'
Vue.use(VueCircleSlider)

export default {
  name: 'Controller',
  props: {
    msg: String
  },
  data: () => {
    return {
      temperature: 23
    }
  },
  watch: {
    temperature: function(val)
    {
      this.$mqtt.publish('homie/mkr1000/envshield/temperatura', new Buffer(String(val)), {qos:1, retain:false}, function(){
        //console.log(err)
      })
    }
  },
  methods: {
    publish () {
      console.log(this.sliderValue)
      console.log(this.$mqtt)
      this.$mqtt.publish('test', String(this.sliderValue))
    }
  },
  mqtt: {
    'homie/mkr1000/envshield/temperatura' (data, topic) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
