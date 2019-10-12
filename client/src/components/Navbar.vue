<template>
<b-navbar toggleable="lg" type="dark" class="nav-background">
          <b-navbar-brand href="/">MacrosApp</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
             <b-navbar-nav class="ml-auto">
              <!-- <router-link to="/accounts" class="nav-link">Account</router-link> -->
              <!-- <router-link to="/accounts" class="nav-link">
                <i class="material-icons md-36 nav-link">
                account_circle
                </i>
              </router-link> -->
              <!-- <b-nav-item-dropdown right> -->
                <!-- Using 'button-content' slot -->
                <!-- <template v-slot:button-content>
                  <i class="material-icons md-36 nav-link">
                  account_circle
                  </i>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
              <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="pe-7s-user"></i>
                        <p>Account</p>
              </a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li> -->
              <button role="button" type="button" class="btn dropdown" data-toggle="dropdown"> 
                  <i class="material-icons md-36 nav-link">
                account_circle
                </i>
              </button>

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
.material-icons.md-36 { 
  font-size: 36px;
  }

.nav-background {
  background: #518888
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
