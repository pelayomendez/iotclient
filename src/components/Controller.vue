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
    <div id="toggles">
      <br>
        <div class="field">
            <b-switch v-model="motor"
                true-value="1"
                false-value="0"
                @click.native="switchMotor()">
                <p style="width:20px;">Motor</p>
            </b-switch>
        </div>
        <div class="field">
            <b-switch v-model="calentador"
                true-value="1"
                false-value="0"
                @click.native="switchCalentador()">
                <p style="width:20px;">Calentador</p>
            </b-switch>
        </div>
    </div>
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
      temperature: 23,
      calentador: 0,
      motor: 0
    }
  },
  watch: {
    temperature: function(val)
    {
      this.$mqtt.publish('Homie/MKR1000/MKRCORE/Thermostat/Set', new Buffer(String(val)), {qos:1, retain:false}, function(){
        //console.log(err)
      })
    }
  },
  methods: {
    switchMotor () {
      const val = (this.motor == 0) ? 1 : 0
      console.log(val)
      this.$mqtt.publish('Homie/MKR1000/MKRRELAY/Relay01/Set', new Buffer(String(val)), {qos:1, retain:false}, function(){
        //console.log(err)
      })
    },
    switchCalentador () {
      const val = (this.calentador == 0) ? 1 : 0
      this.$mqtt.publish('Homie/MKR1000/MKRRELAY/Relay02/Set', new Buffer(String(val)), {qos:1, retain:false}, function(){
        //console.log(err)
      })
    }
  },
  mqtt: {
    'Homie/#' (data, topic) {
      const value = String.fromCharCode.apply(null, data)
      if(topic === "Homie/MKR1000/MKRENV/Temperature") {
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        this.temperature = parseInt(value)
      }
      if(topic === "Homie/MKR1000/MKRRELAY/Relay01") {
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        this.motor = parseInt(value)
      }
      if(topic === "Homie/MKR1000/MKRRELAY/Relay02") {
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        this.calentador = parseInt(value)
      }
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

#toggles {
  margin-top:50px;
}

</style>
