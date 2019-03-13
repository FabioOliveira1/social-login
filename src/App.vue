<template>
  <div id="app">
    <main class="container">
      <!-- Facebook Login Button -->
      <div id="fb-root"></div>
      <div
        class="fb-login-button"
        data-size="large"
        data-button-type="continue_with"
        data-auto-logout-link="true"
        data-use-continue-as="true"
        scope="public_profile,email"
      ></div>
      <!-- Facebook User Info -->
      <table>
        <thead>
          <th colspan="2">Facebook Data</th>
        </thead>
        <tbody>
          <tr>
            <td>Nome: </td>
            <td>{{ this.facebook.name || 'Sem informação' }}</td>
          </tr>
          <tr>
            <td>Email: </td>
            <td>{{ this.facebook.email || 'Sem informação' }}</td>
          </tr>
          <tr>
            <td>User ID: </td>
            <td>{{ this.facebook.uid || 'Sem informação' }}</td>
          </tr>
          <tr>
            <td>Acces Token: </td>
            <td>{{ this.facebook.token || 'Sem informação' }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Google Login Button -->
      <button class="btn" id="signout-button" @click="handleGoogleSignOutClick" v-if="google.name">Sign Out</button>
      <button class="btn" id="signin-button" @click="handleGoogleSignInClick" v-else>Sign In</button>

      <!-- Google User Info -->
      <table>
        <thead>
          <th colspan="2">Google Data</th>
        </thead>
        <tbody>
          <tr>
            <td>Nome: </td>
            <td>{{ this.google.name || 'Sem informação' }}</td>
          </tr>
          <tr>
            <td>Emails: </td>
            <td>{{ this.google.emails.join(', ') || 'Sem informação' }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
import FacebookLogin from '@/utils/mixins/facebookLogin'
import GoogleLogin from '@/utils/mixins/googleLogin'

export default {
  mixins: [ FacebookLogin, GoogleLogin ],
  data () {
    return {
      facebook: {
        name: null,
        email: null,
        uid: null,
        token: null
      },
      google: {
        name: null,
        emails: []
      }
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

table {
  margin: 15px;
}

table td {
  max-width: 200px;
}

table td:first-child {
  font-weight: bold;
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
