/* eslint-disable */
export default {
  data () {
    return {
      facebook: {
        name: null,
        email: null,
        uid: null,
        token: null
      }
    }
  },
  mounted() {
    this.initFacebook()
  },
  methods: {
    initFacebook () {
      window.fbAsyncInit = () => {
        FB.init({
          appId: process.env.VUE_APP_FACEBOOK_ID,
          cookie: true,
          xfbml: true,
          version: process.env.VUE_APP_FACEBOOK_VERSION
        });

        this.checkFacebookLoginState()
      };

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
    checkFacebookLoginState () {
      FB.getLoginStatus(this.handleFacebookLoginStatus)
    },
    handleFacebookLoginStatus (response) {
      if (response.status === "connected") {
        console.log('response', response)
        this.facebook.token = response.authResponse.accessToken
        this.facebook.uid = response.authResponse.userID
        this.getFacebookUserData()
      } else {
        console.log('The person is not logged into your app or we are unable to tell.');
        this.facebook.email = null
        this.facebook.name = null
        this.facebook.token = null
        this.facebook.uid = null
      }
    },
    getFacebookUserData() {
      FB.api(`/${this.uid}?fields=name,email&accessToken=${this.token}`, response => {
        console.log('response intimal', response)
        this.facebook.email = response.email
        this.facebook.name = response.name
      });
    }
  }
};
