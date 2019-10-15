<template>
  <div id="app">
    <Navbar class="navbar" />

      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">Learn more</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/diet">Diet</router-link> |
        <router-link to="/diary">Diary</router-link>
      </div>  -->

    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  padding-top: 5em;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
