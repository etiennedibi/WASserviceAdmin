<template>
  <div class="BodY">
    <p class="title">ARTICLE LIST</p>
    
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
          <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            width="1200"
            overlay-color="black"
            overlay-opacity="0.8"
            mainGreenColor
          >
            <v-card tile>
              <!-- <v-toolbar flat color="Importantcolor Importantcolor--text" >
                        <v-btn icon dark @click="dialog = false">
                          <v-icon class="Titlecolor--text">mdi-close</v-icon>
                        </v-btn> 
                        <v-toolbar-title>POUET</v-toolbar-title>
                      </v-toolbar>             -->

              <v-card-text>
                <v-container>
                  <v-row class="detailsTemplate">
                    dkoieijrf
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- END PRDUCT DETAILS MODAL TEMPLATE FOR EACH PRODUCT -->
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
                    <p>WAC ARTICLE</p>
                    <p>{{item.created_at}} </p>
                  </div>
                  <div>
                    <p>
                      {{item.title}} <br>
                      <!-- <span style="text-transform: lowercase; line-height:10px;">{{item.concerning}}</span> -->
                    </p>  
                    <img src="file:///home/hico/Documents/Fabrice/WASserviceAPI/ArtIMG/cl1xljzl6000128cr2h7qgppx.png" alt="" srcset="">
                  </div>
                  <div> 
                    <v-btn icon color="#3d3c3c96" @click="openDialog(item)"><v-icon small>mdi-eye</v-icon></v-btn> 
                    <v-btn icon color="#3d3c3c96"><v-icon small>mdi-pencil</v-icon></v-btn>
                    <v-btn icon color="#3d3c3c96"><v-icon small>mdi-delete</v-icon></v-btn> 
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



  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
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
    itemsPerPage: 8,
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

    
  }),

  computed: {
     ...mapGetters(["Articles"]),

    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
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
  border-radius: 10px;
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
}
.SomeLink div:nth-child(1) > p{
  font-size: 12px;
}

.SomeLink div:nth-child(2){
  color: #000000;
  font-size: 14px;
  display: flex;
  text-transform: uppercase;
  justify-content: space-between;
  align-items: center;
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

</style>