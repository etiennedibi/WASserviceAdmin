<template>
  <div class="home">
    <img src="../assets/Logo2.png" alt="" srcset="">
    <v-form >
      <v-container>
        <v-row class="poli">
          <v-col cols="12" >
            <v-text-field
            outlined
            label="email"
            prepend-inner-icon="mdi-map-marker"
            v-model="userCredentials.email"
            :rules="[() => !!userCredentials.email]"
            v-on:keyup.enter="submit"
          ></v-text-field>
          <v-text-field
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="Password"
            outlined
            class="input-group--focused"
            v-model="userCredentials.password"
            @click:append="show2 = !show2"
            v-on:keyup.enter="submit"
          ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>


    <transition name="slide">
      <v-alert
        v-if="addingfalse"
        elevation="13"
        type="error"
        max-width="300"
        class="alert"
        color="error"
        >{{ this.companyaddingResponse }}</v-alert>
      >
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },

  data () {
    return {
      show2: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
      },

      // for user login
      userCredentials: {
        email: "",
        password: "",
      },

      // for alerte
      addingfalse: false,
      companyaddingResponse: "",

    }
  },


  methods: {
    submit() {
      this.$store
        .dispatch("auth_request", this.userCredentials)
        .then(() => {
          this.$router.push("/projet");
        })
        .catch((authError) => {
          this.companyaddingResponse =
            "Le Pseudo ou le mot de passe est incorrecte";
          this.addingfalse = !this.addingfalses;
          setTimeout(() => {
            this.addingfalse = false;
          }, 3000);
          console.error(";) Le moniteur: auth failling ", authError);
        });
    },
  },

}
</script>


<style scoped>
  .home{
    margin:0 !important;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .home > img{
    height:200px;
  }
  .poli{
    width: 300px;
  }
</style>