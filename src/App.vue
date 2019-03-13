<template>
  <div id="app">
    <main class="container">
      <div id="fb-root"></div>
      <div
        class="fb-login-button"
        data-size="large"
        data-button-type="continue_with"
        data-auto-logout-link="true"
        data-use-continue-as="true"
        scope="public_profile,email"
      ></div>
      <!-- <button class="btn" @click.prevent="getUserData" >Button</button> -->
      <p class="status">{{this.name}}</p>
      <p class="status">{{this.email}}</p>
      <p class="status">{{this.uid}}</p>
      <p class="status">{{this.token}}</p>
    </main>
  </div>
</template>

<script>
import FacebookLogin from '@/utils/mixins/facebookLogin'

export default {
  mixins: [ FacebookLogin ],
  data () {
    return {
      name: null,
      email: null,
      uid: null,
      token: null
    }
  }
}
</script>

<style>
html {
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  min-height: 100vh;
  min-width: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.btn {
  padding: 10px 15px;
  background-color: #26a69a;
  color: #fff;
  font-weight: 100;
  border: none;
  border-radius: 3px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  margin: 15px;
}
.btn:hover {
  opacity: 0.85;
}
</style>
