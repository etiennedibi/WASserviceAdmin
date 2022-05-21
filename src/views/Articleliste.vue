<template>
  <div class="BodY">
    <p class="title">ARTICLE LIST</p>
    
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

    <v-container class="stationListboxWrapper">
      <v-data-iterator
        :items="Articles"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <!-- <v-row>
            <v-col cols="12" md="4" lg="4">
              <v-text-field
                v-model="search"
                dense
                outlined
                hide-details
                prepend-inner-icon="mdi-search"
                label="Rechercher"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2" lg="2"></v-col>
          </v-row> -->

          <!-- PRODUCT DETAILS MODAL TEMPLATE FOR EACH PRODUCT -->
           <!-- SHOW DIALOG {{ selectedItem.fullname }}-->
          <v-dialog v-model="dialog" max-width="700">
            <v-card>
              <v-card-title >
                  {{ selectedItem.title }}
                </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" class="infor">
                      {{ selectedItem.content }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            
            </v-card>
          </v-dialog>
          <!-- END PRDUCT DETAILS MODAL TEMPLATE FOR EACH PRODUCT -->

          <!-- EDIT TRAVEL DIALOG -->
          <v-dialog v-model="dialogEdit" max-width="500">
            <v-card>
              <v-card-title >
                  EDIT ARTICLE
                </v-card-title>
              <v-card-text>
                <v-container>
                  <form class="updateForm">
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" md="12" lg="12">
                          <v-text-field
                          clearable
                          clear-icon="mdi-close-circle"
                          label="Title"
                          solo
                          v-model="selectedItem.title"
                        ></v-text-field>
                        <v-textarea
                          clearable
                          v-model="selectedItem.concerning"
                          clear-icon="mdi-close-circle"
                          label="Subtitle"
                          auto-grow
                          solo
                          rows="1"
                          row-height="15"
                        ></v-textarea>

                         <v-textarea
                          clearable
                          v-model="selectedItem.content"
                          clear-icon="mdi-close-circle"
                        label="Text"
                          auto-grow
                          solo
                          rows="10"
                          row-height="15"
                        ></v-textarea>
                        </v-col>
                        
                      </v-row>
                    </v-container>
                  </form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red"
                  rounded
                  depressed
                  @click="closeEdit"
                  style="color: white"
                  >Annuler</v-btn
                >
                <v-btn
                  color="green"
                  rounded
                  depressed
                  @click="TheEdit"
                  style="color: white"
                  >Enregistrer</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>


           <!-- DELETE TRAVEL DIALOG -->
        <v-dialog v-model="dialogDelete" max-width="420">
          <v-card>
            <v-card-title >
              DELETE ARTICLE
            </v-card-title>
            <v-card-text>
              <v-container>
                <div class="CancelVerification">
                  voulez-vous vraiment supprimer <br />
                  cet article ?
                </div>
                <div class="verificationAction">
                  <v-btn
                    color="success"
                    rounded
                    depressed
                    @click="closeDelete"
                    style="color: white"
                    >Non</v-btn
                  >
                  <v-btn
                    color="error"
                    rounded
                    depressed
                    @click="deleteItemConfirm"
                    style="color: white"
                    >Oui</v-btn
                  >
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              md="4"
              lg="4"
            >
              <div class="SomeLink">
                  <div>
                    <p>{{item.concerning}}</p>
                    <p>{{item.created_at}} </p>
                  </div>
                  <div>
                    <p>
                      {{item.title}}
                    </p> 
                  </div>
                  <div> 
                    <v-btn icon color="#3d3c3c96" @click="openDialog(item)"><v-icon small>mdi-eye</v-icon></v-btn> 
                    <v-btn icon color="#3d3c3c96" @click="editItem(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
                    <v-btn icon color="#3d3c3c96" @click="deleteItem(item)"><v-icon small>mdi-delete</v-icon></v-btn> 
                  </div>
              </div>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ page }} sur {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="mainGreenColor "
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="mainGreenColor "
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
    
    <!--  END DATA TABLE -->

  <transition name="slide">
      <v-alert
        v-if="addingSuccess"
        elevation="13"
        type="success"
        max-width="300"
        class="alert"
        color="success"
      >
       {{ articleaEditResponse.message }}</v-alert
      >
    </transition>
    <transition name="slide">
      <v-alert
        v-if="addingfalse"
        elevation="13"
        type="error"
        max-width="300"
        class="alert"
        color="black"
      >
        {{ articleaEditResponse.message }}</v-alert
      >
    </transition>


  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
import axios from "axios";
import { mapGetters } from "vuex"

  export default {
    name: 'Articlelist',

    components: {
      // HelloWorld,
    },

     data: () => ({
    // For the list dialog
    dialog: false,
    selectedItem: {},
    /* FOR DATA ITERATOR */
    itemsPerPageArray: [4, 8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 6,
    sortBy: "name",
    keys: ["id", "Name", "Quantity", "price"],
    items: [

      {
        id: 'd1',
        name: 'Frozen Yogurt',
        Quantity: 159,
        price: 2500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd2',
        name: 'Ice cream sandwich',
        Quantity: 237,
        price: 1500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd3',
        name: 'Eclair',
        Quantity: 262,
        price: 25000,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd4',
        name: 'Cupcake',
        Quantity: 305,
        price: 18500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd5',
        name: 'Gingerbread',
        Quantity: 356,
        price: 9500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd6',
        name: 'Jelly bean',
        Quantity: 375,
        price: 10500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd7',
        name: 'Lollipop',
        Quantity: 392,
        price: 17500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd8',
        name: 'Honeycomb',
        Quantity: 408,
        price: 2500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd9',
        name: 'Donut',
        Quantity: 452,
        price: 3000,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },
      {
        id: 'd10',
        name: 'KitKat',
        Quantity: 518,
        price: 5500,
        save:[
          { product: 'donus', quantity:40, price:30000 },
          { product: 'Yahourt Vigor', quantity:150, price:750000 }
        ]
      },

    ],


    dialogEdit:false,
    ArticleToEdit: {
      title: "",
      content: "",
      concerning: "",
      id:"",
    },

    // For travel deleted
    dialogDelete: false,
    articleToDelete: "",
    articleDeleteResponse: "",


    articleaEditResponse: "",
    addingSuccess: false,
    addingfalse: false,

    
  }),

  computed: {
     ...mapGetters(["Articles"]),

    numberOfPages() {
      return Math.ceil(this.Articles.length / this.itemsPerPage);
    },
  },

  methods: {
    /* FOR DIFFERENCIATION BETWEEN PRODUCT */
    getClass(quantity) {
      if (quantity <= 30) return "InvBox";
      else return "InvBox2";
    },
    /* FOR DATA ITERRATOR */
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },

    /* FOR ITEM DIALOG OPEN */
    openDialog(item) {
      this.selectedItem = Object.assign({}, item);
      this.$store.state.OneSTation = this.selectedItem.id;
      this.$store.state.forceRdeDeclared += 1;
      this.dialog = !this.dialog;
    },

    editItem(item) {
      console.log("popop");
      this.selectedItem = Object.assign({}, item);
      //  Open the Edit Dialogue
      this.dialogEdit = true;
    },

    TheEdit() {
      axios({ url: "article/update", data: this.selectedItem, method: "PUT" })
        .then((response) => {
          this.articleaEditResponse = response.data;
          if (this.articleaEditResponse.message == "sucess") {
            // Modification effectuée
            this.articleaEditResponse.message = "modification effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              // this.forceRerender();
            }, 3000);
          } else {
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          } 
        })
        .catch((error) => {
          this.articleaEditResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeEdit();
    },

    closeEdit() {
      this.dialogEdit = false;
    },


    // --------------------
    // delete a travel
    // --------------------
    deleteItem(item) {
      // this.editedIndex = this.Travels.indexOf(item);
      this.selectedItem = Object.assign({}, item);
      this.articleToDelete = { article_id: this.selectedItem.id };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(this.articleToDelete);
        axios({ url: "article/delete/" + this.articleToDelete.article_id,  method: "DELETE" })
        .then((response) => {
          this.articleaEditResponse = response.data;

          if (this.articleaEditResponse.message == "success") {
            // Annulation effectuée
            this.articleaEditResponse.message = "Suppression effectuée";
            this.addingSuccess = !this.addingSuccess;
            setTimeout(() => {
              this.addingSuccess = !this.addingSuccess;
              this.forceRerender();
            }, 3000);
            this.$store.dispatch("init_article");
          } else {
            this.articleaEditResponse.message =
              "Impossible d'effectuer l'annulation";
            this.addingfalse = !this.addingfalse;
            setTimeout(() => {
              this.addingfalse = !this.addingfalse;
            }, 3000);
          }
        })
        .catch((error) => {
          this.articleaEditResponse = error.message;
          console.error("There was an error!", error);
        });

      this.closeDelete();
    },


    closeDelete() {
      this.dialogDeleteConfirm = false;
      this.dialogDelete = false;
      this.selectedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },


},

   created() {
    this.$store.dispatch("init_article");
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
.stationListboxWrapper {
  /* background: red; */
  border-radius: 10px;
  /* height: 53vh; */
  padding: 15px;
}


/* CARD STYLE */
.SomeLink{
  height: 200px;
  border: solid 1px #f4f4f4;
  border-radius: 4px;
  padding: 15px;
  background:#ffffff;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.activeLinks{
  background: #1a5b07;
  border:none;
}
.SomeLink p{
  margin: 0;
}
.SomeLink div:nth-child(1){
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #3d3c3c96;
  margin-bottom: 15px;
  /* background-color:pink */
}
.SomeLink div:nth-child(1) > p{
  font-size: 12px;
}

.SomeLink div:nth-child(2){
  color: #000000;
  font-size: 14px;
  height: 100px;
  display: flex;
  text-transform: uppercase;
  justify-content: space-between;
  align-items: center;
  /* background:red */
}
.SomeLink div:nth-child(2) img{
  height: 100px;
  width:100px;
  /* background:red; */
  border-radius:100px;
}

.SomeLink div:nth-child(3){
  color: #48f613;
  /* background:red; */
  font-size: 10px;
  font-weight: bold;
}





/* Edit Article */
.editIMGO {
  margin-bottom: 35px;
}
.updateForm {
  height: 400px;
  /* width: 110%; */
  overflow-y: scroll;
}
.updateForm::-webkit-scrollbar {
  width: 20px;
}
.updateForm::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

.updateForm::-webkit-scrollbar-thumb {
  background-color: var(--main-green-color);
  border-radius: 30px;
  border: 7px solid rgb(255, 255, 255);
}

.updateForm .col-lg-12,
.col-md-12 {
  padding-bottom: 0px;
  padding-top: 0px;
}


/* For delete item */
.CancelVerification{
  margin-bottom:20px;
}


.alert{
    position: absolute;
    top: 100px;
    left: 82%;
  }

</style>