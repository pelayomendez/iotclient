<template>
  <div id="app">
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="./assets/logo.png"
                >
            </b-navbar-item>
        </template>
        <template slot="start" id="nav">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
               Home
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/stats' }">
                History
            </b-navbar-item>
        </template>
    </b-navbar>
    <router-view id="view"/>
    <div id="serverinfo">online: {{ serverOnline }} messages: {{ recivedMessages }} <br>latest: {{ latestMessage }}</div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data: () => {
    return {
      serverOnline: false,
      recivedMessages: 0,
      latestMessage: ''
    }
  },
  mounted ()
  {  
    this.$mqtt.on('connect', () => {
      console.log('connect')
      this.$mqtt.subscribe('Homie/#')
      this.serverOnline = true;
    })
    this.$mqtt.on('message', (m) => {
      this.recivedMessages += 1
      this.latestMessage = m
      //console.log('message')
       //console.log(i)
    })
    this.$mqtt.on('close', (e) => {
      console.log('close')
      console.log(e)
      this.serverOnline = false;
    })
    this.$mqtt.on('disconnect', () => {console.log('disconnect')})
    this.$mqtt.on('error', () => {console.log('error')})
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#view {
  margin-top: 150px;
}
#serverinfo {
  margin-top: 100px;
  font-size: 9px;
}
</style>

<style lang="scss">

$navbar-item-img-max-height: 3rem;
$navbar-height: 3rem;

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #4099FF;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";



</style>
