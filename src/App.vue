<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png" />
    <Header @changePath="changeTo" />
    <div id="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: { Header },
  methods: {
    changeTo(index) {
      console.log(index, "change")
      if (index === 1) {
        this.$router.push({ path: '/dashboard' })
      }
      else {
        this.$router.push({ path: '/' })
      }
    },
  },
}
// 'Poppins',
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,300;0,500;1,100&display=swap');

body {
  /* 
  #e9eeef
  #fbfcfc
  #090030
  #d89b00
  #ceccd6
  */
  background: #eeeef0;
  margin: 0px;
}

#app {
  font-family: 'Exo 2', sans-serif;
  font-weight: 300;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #090030;

}

.logo {
  margin: 5px 0px 0 5px;
  position: absolute;
  float: inline-start;
  height: 60px;
}
</style>
