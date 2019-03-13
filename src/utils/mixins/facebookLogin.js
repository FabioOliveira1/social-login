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
          appId: process.env.VUE_APP_ID,
          cookie: true,
          xfbml: true,
          version: process.env.VUE_APP_VERSION
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
        this.token = response.authResponse.accessToken
        this.uid = response.authResponse.userID
        this.getFacebookUserData()
      } else {
        console.log('The person is not logged into your app or we are unable to tell.');
        this.email = null
        this.name = null
        this.token = null
        this.uid = null
      }
    },
    getFacebookUserData() {
      FB.api(`/${this.uid}?fields=name,email&accessToken=${this.token}`, response => {
        this.email = response.email
        this.name = response.name
      });
    }
  }
};
