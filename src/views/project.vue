<template>
  <div class="BodY">
    <p class="title">PROJECT LIST</p>
    
    <!-- SHOW DIALOG {{ selectedItem.fullname }}-->
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title >
            Description
          </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="infor">
                {{ selectedItem.description }}
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
       
      </v-card>
    </v-dialog>

    <!-- THE SEACH BAR -->
    <v-row class="TheSeach">
      <v-col cols="12" sm="3" md="3" lg="3">
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          dense
          outlined
          hide-details
          prepend-inner-icon="mdi-search"
          label="Rechercher"
          class="theSeachBar"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- START DATA TABLE -->
    <v-row class="TheSeach">
      <v-col cols="12" md="8" lg="8">
        <div class="dataWrapper">
          <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="Project"
            :search="search"
            :items-per-page="-1"
            hide-default-footer
          >
            <!-- FOR SEE EDIT, DELETE AND SHOW DIALOG -->
            <template v-slot:[`item.actions`]="{ item }">
              <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
              <v-btn icon class="mino-icon" color="mainGreenColor" @click="showItem(item)"
                ><v-icon small> mdi-eye </v-icon></v-btn
              >
            </template>
            <template v-slot:[`item.fullname`]="{ item }">
              <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
              <v-icon dense color="mainGreenColor"> mdi-account </v-icon>
              <span style="color: mainGreenColor">{{ item.fullname }}</span>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
              <!-- modification avec CESINHIO  a la base on avait v-slot:[item.actions="{ item }"-->
              <v-icon small> mdi-arrow-right </v-icon> {{ item.created_at }}
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>

    
    <!--  END DATA TABLE -->

    <!-- ALERT -->
    <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="mainGreenColor"
        >{{ this.travelDeleteResponse.message }}</v-alert
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
        >{{ this.travelDeleteResponse.message }}</v-alert
      >
    </transition>

  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
import { mapGetters } from "vuex"

  export default {
    name: 'Project',

    components: {
      // HelloWorld,
    },

  
  data: () => ({
    // For the table
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    search: "",
    headers: [
      {
        text: "COMPANIES",
        align: "start",
        sortable: false,
        value: "comapny",
      },
      { text: "SENDER", value: "fullname" },
      { text: "EMAIL", value: "email" },
      { text: "SUBMISSION DATE", value: "created_at" },
      { text: "DETAILS", value: "actions", sortable: false },
    ],
    desserts: [],

    // for alerte
    addingSuccess: false,
    addingfalse: false,


    // For travel detail
    dialog: false,

    // For travel edit
    editedIndex: -1,
    defaultItem: {
      fullname: "",
      created_at: "",
      comapny: "",
    },
    selectedItem: {
      fullname: "",
      created_at: "",
      comapny: "",
    },
  }),


  methods: {
    // ------------------------
    // Show Travel infomation
    // ------------------------
    showItem(item) {
      this.selectedItem = Object.assign({}, item);
      this.dialog = true;
    },


    // For table re-render after delete or update an item
    // forceRerender() {
    //   this.$store.state.travelcomponentKey += 1;
    // },
  },

  computed: {
    ...mapGetters(["Project"]),
  },

  created() {
    this.$store.dispatch("init_project");
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





.dataWrapper {
  height: 100%;
  /* overflow-y: scroll; */
  padding: 0;
}
.dataWrapper::-webkit-scrollbar {
  width: 20px;
}
.dataWrapper::-webkit-scrollbar-track {
  background: #ffffff;
}

.dataWrapper::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 30px;
  border: 7px solid #ffffff;
}

/* .tableWrapperDiv::-webkit-scrollbar{
  width: 20px;
}
.tableWrapperDiv::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

.tableWrapperDiv::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 30px;
  border: 7px solid rgb(255, 255, 255);
} */

.v-data-table {
  line-height: 1.5;
  max-width: 100%;
  /* margin: 0px 45px; */
}
.v-btn {
  font-weight: bold;
  letter-spacing: normal;
  text-transform: none;
}

.TheSeach{
  justify-content:center;
  /* background:red; */
}
.theSeachBar {
  /* margin-left: 50px; */
  margin-bottom: 10px;
}

/* Show details */
.infor{
  /* height: 400px;
  background:rgb(229, 255, 0); */
  text-align:center;
}
.details{
  height: 400px;
  background:#3cff00;
}

</style>