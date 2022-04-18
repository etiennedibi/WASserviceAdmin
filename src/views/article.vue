<template>
  <div class="BodY">
    <p class="title">ADD ARTICLE</p>

    <v-form ref="form1">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" lg="6" class="Art-Title">
            <v-text-field
              clearable
              clear-icon="mdi-close-circle"
              label="Title"
              solo
              v-model="new_article.title"
            ></v-text-field>
            <v-textarea
              clearable
              v-model="new_article.concerning"
              clear-icon="mdi-close-circle"
              label="Subtitle"
              auto-grow
              solo
              rows="1"
              row-height="15"
            ></v-textarea>
            <v-file-input
              :rules="rules"
              solo
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an illustration"
              prepend-icon="mdi-camera"
              label="illustration"
              v-on:change="handleFileUpload()"
            ></v-file-input>
          </v-col>
          <v-col cols="12" md="6" lg="6" class="Art-text">
            <v-textarea
              clearable
              v-model="new_article.content"
              clear-icon="mdi-close-circle"
             label="Text"
              auto-grow
              solo
              rows="10"
              row-height="15"
            ></v-textarea>
            
            <v-btn
              elevation="2"
              large
              color="white"
              v-on:click.prevent="submit"
            >Submit</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>



    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
      >
        Nouveau type Enregistré avec succes</v-alert
      >
    </transition>
    <transition name="slide">
      <v-alert
        v-if="addingfalse"
        elevation="13"
        type="error"
        max-width="300"
        class="alert"
        color="error"
      >
        {{ articleaAddingResponse.message }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
import axios from "axios";
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Article',


    components: {
      // HelloWorld,
    },

    data: () => ({
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],


    // FOR FORM SENDING
    new_article: {
      title: "TITLE: Diffusion mondiale de banane",
      content: "TEXT:À la fin du XIXe siècle la culture du bananier devint un enjeu économique important influant même des choix politiques internationaux. À la fin du XIXe siècle la culture du bananier devint un enjeu économique important influant même des choix politiques internationaux.À la fin du XIXe siècle la culture du bananier devint un enjeu économique important influant même des choix politiques internationaux.",
      concerning: "CONCERNING : INPHB, Yamoussoukro, Côte d'Ivoire",
      illustration: "",
    },

    articleaAddingResponse: "",
    addingSuccess: false,
    addingfalse: false,
    }),



    methods: {
    submit() {
      // this.handleFileUpload()
      const formData = new FormData
      formData.append('illustration', this.new_article.illustration)
      formData.append('title', this.new_article.title)
      formData.append('content', this.new_article.content)
      formData.append('concerning', this.new_article.concerning)

        axios({ url: "article/add", data: formData, method: "POST", headers:{'Content-Type': 'multipart/form-data'} })
        .then((response) => {
          this.articleaAddingResponse = response.data;
          console.log(response.data);
          if (this.articleaAddingResponse.message == "success") {
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              // this.forceRerender1();
            }, 3000);
          } else {
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.articleaAddingResponse = error.message;
          console.error("There was an error!", error);
        });

      this.$refs.form1.reset();
    },

    // For table re-render after delete or update an item
    // forceRerender1() {
    //   this.$store.state.articlecomponentKey += 1;
    // },

    handleFileUpload(){
        this.new_article.illustration = event.target.files[0];
      }
  },

  }


  
</script>



<style scoped>
.BodY{
  margin-top: 70px;
}

.title{
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.Art-Title{
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  background:#f4f4f4 ;
}
.Art-text{
  background: #f4f4f4 ;
}

</style>