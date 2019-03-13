/* eslint-disable */
export default {
  data () {
    return {
      name: null,
      email: null,
      uid: null,
      token: null
    }
  },
  mounted() {
    console.log(process.env)

    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.VUE_APP_ID,
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: process.env.VUE_APP_VERSION // The Graph API version to use for the call
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      this.checkLoginState()
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
  methods: {
    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    checkLoginState () {
      FB.getLoginStatus(this.handleLoginStatus)
    },

    handleLoginStatus (response) {
      console.log("handleLoginStatus");
      console.log(response);

      if (response.status === "connected") {
        this.token = response.authResponse.accessToken
        this.uid = response.authResponse.userID
        this.getUserData()
      } else {
        console.log('The person is not logged into your app or we are unable to tell.');
      }
    },

    getUserData() {
      FB.api(`/${this.uid}?fields=name,email&accessToken=${this.token}`, response => {
        console.log('response', response)
        this.email = response.email
        this.name = response.name
      });
    }

  }
};
