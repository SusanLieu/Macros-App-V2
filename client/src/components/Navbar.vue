<template>
<b-navbar toggleable="lg" type="dark" class="nav-background">
          <b-navbar-brand href="/">MacrosApp</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
             <b-navbar-nav class="ml-auto">
              <router-link to="/profile" class="nav-link">Profile</router-link>
              <router-link to="/" class="nav-link">Switch Account</router-link>
              <!-- <a to="/logout" class="nav-link">Log out</a> -->
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
</template>
<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'Navbar',
  data() {
    return {
      input: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      Api.post('/accounts/login/', this.input)
        .then(response => {
          this.$router.push({
            name: 'diary'
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.nav-background {
  background: #527a7a
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
