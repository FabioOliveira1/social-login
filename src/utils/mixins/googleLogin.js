/* eslint-disable */
export default {
  data () {
    return {
      google: {
        name: null,
        emails: []
      }
    }
  },
  mounted () {
    this.initGoogle()
  },
  methods: {
    initGoogle () {
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = 'https://apis.google.com/js/api.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'google-jssdk')
      document.getElementById('google-jssdk').addEventListener('load', () => {
        gapi.load('client:auth2', this.initGoogleClient)
      })
    },
    initGoogleClient() {
      gapi.client.init({
          apiKey: process.env.VUE_APP_GOOGLE_KEY,
          discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
          clientId: process.env.VUE_APP_GOOGLE_ID,
          scope: 'profile'
      }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateGoogleSigninStatus)

        this.updateGoogleSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
      })
    },
    updateGoogleSigninStatus (isSignedIn) {
      if (isSignedIn) {
        this.makeGoogleApiCall()
      }
    },
    handleGoogleSignInClick () {
      gapi.auth2.getAuthInstance().signIn()
    },
    handleGoogleSignOutClick () {
      gapi.auth2.getAuthInstance().signOut()
      this.google.name = null
      this.google.emails = null
    },
    makeGoogleApiCall () {
      gapi.client.people.people.get({
        'resourceName': 'people/me',
        'personFields': 'emailAddresses,names'
      })
        .then(({ result }) => {
          this.google.name = result.names[0].displayName
          this.google.emails = result.emailAddresses.map(i => i.value)
        })
        .catch((reason) => {
          console.log('Error: ' + reason.result.error.message)
        })
    }
  }
}
