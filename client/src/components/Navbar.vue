<template>
<b-navbar toggleable="lg" type="dark" class="nav-background fixed-top" >
          <b-navbar-brand v-if="!isLogged" href="#">Fitness Witness</b-navbar-brand>
          <b-navbar-brand v-if="isLogged" href="/diary">Fitness Witness</b-navbar-brand>
             <b-navbar-nav class="ml-auto">
              <b-nav-item-dropdown v-if="isLogged" right toggle-class="text-decoration-none" no-caret>
                <template v-slot:button-content>
                  <i class="material-icons md-36 nav-link">
                  account_circle
                  </i>
                </template>
                <b-dropdown-item router-link to="/updateaccount">Account</b-dropdown-item>
                <b-dropdown-item router-link to="/updateprofile">Profile</b-dropdown-item>
                <b-dropdown-item router-link to="/updatediet">Diet</b-dropdown-item>
                <b-dropdown-item @click="signoutAccount">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      input: {
        email: '',
        password: ''
      },
      isLogged: this.checkIfIsLogged()
    }
  },
  created() {
    this.$bus.$on('logged', () => {
      this.isLogged = this.checkIfIsLogged()
    })
  },
  methods: {
    checkIfIsLogged() {
      var account = (localStorage.getItem('access_token') || '')
      if (account !== '') {
        return true
      } else {
        return false
      }
    },
    signoutAccount() {
      localStorage.removeItem('access_token')
      this.isLogged = this.checkIfIsLogged()
      this.$cookies.remove('diary')
      this.$cookies.remove('diet')
      this.$cookies.remove('account')
      this.$cookies.remove('profile')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.material-icons.md-36 {
  font-size: 36px;
  }

.nav-background {
  background: #1a3e59
}

 .navbar {
  min-height: 80px;
}

.navbar-brand {
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
}

.navbar-toggle {
  /* (80px - button height 34px) / 2 = 23px */
  margin-top: 23px;
  padding: 9px 10px !important;
}
</style>
