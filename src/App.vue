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
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted ()
  {  
    this.$mqtt.on('connect', () => {console.log('connect')
      this.$mqtt.subscribe('homie/mkr1000/envshield/temperatura')
    })
    //this.$mqtt.on('message', () => {console.log('message')})
    this.$mqtt.on('close', (e) => {
      console.log('close')
      console.log(e)
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
