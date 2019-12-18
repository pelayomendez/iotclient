<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <circle-slider
      v-model="desired"
      :side="250"
      :min="0"
      :max="100"
      :step-size="1"
      :circle-width-rel="20"
      :progress-width-rel="10"
      :knob-radius="10"
      :knob-color="'#4099FF'"
      :progress-color="'#4099FF'"
      @click.native="changeTemperature()">
    ><h3>0º</h3>
    </circle-slider>
    <h1 class="info">{{ desired }} <span>&#176;</span> | <b style='margin-left:5px;'>{{ thermostat }}</b> <span>&#176;</span> </h1>
    <h2 class="temp"> 
      <b-icon pack="fas" icon="thermometer-three-quarters" size="is-small" ></b-icon> Temperature: {{ temperature }} <span style="margin-right:5px;">&#176;</span> 
      <b-icon pack="fas" icon="cloud" size="is-small" style="margin-left:5px;"></b-icon> Humidity: {{ humidity }} %</h2>
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
      desired: 0,
      thermostat: 23,
      temperature: 24,
      humidity: 50,
      calentador: 0,
      motor: 0
    }
  },
  methods: {
    changeTemperature() {
      if(this.desired == 0) return
      console.log('Homie/MKR1000/MKRCORE/Thermostat/Set' + ' ' + this.desired)
      this.$mqtt.publish('Homie/MKR1000/MKRCORE/Thermostat/Set', new Buffer(String(this.desired)), {qos:1, retain:false}, function(){
        //console.log(err)
      })
    },
    switchMotor () {
      const val = (this.motor == 0) ? 1 : 0
      console.log(val)
      this.$mqtt.publish('Homie/MKR1000/MKRRELAY/Relay02/Set', new Buffer(String(val)), {qos:1, retain:false}, function(){
        //console.log(err)
      })
    },
    switchCalentador () {
      const val = (this.calentador == 0) ? 1 : 0
      this.$mqtt.publish('Homie/MKR1000/MKRRELAY/Relay01/Set', new Buffer(String(val)), {qos:1, retain:false}, function(){
        //console.log(err)
      })
    }
  },
  mqtt: {
    'Homie/#' (data, topic) {
      const value = String.fromCharCode.apply(null, data)
       if(topic === "Homie/MKR1000/MKRCORE/Thermostat") {
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        this.thermostat = parseInt(value)
      }
      if(topic === "Homie/MKR1000/MKRENV/Temperature") {
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        this.temperature = parseInt(value)
      }
      if(topic === "Homie/MKR1000/MKRENV/Humidity") {
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        this.humidity = parseInt(value)
      }
      if(topic === "Homie/MKR1000/MKRRELAY/Relay02") {
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        this.motor = parseInt(value)
      }
      if(topic === "Homie/MKR1000/MKRRELAY/Relay01") {
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

.info {
  margin-top:15px;
  margin-left:10px;
}

.temp {
  font-size: 11px;
  color: #bfbfbf;
  margin-top:25px;
  margin-right:15px;
}
</style>
