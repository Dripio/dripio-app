<template>
  <div class="hello">
    <ul>
      <!-- <li v-for="garden in gardens"> -->
        <!-- <v-ons-button>{{ garden.name }} </v-ons-button> -->
      <!-- </li> -->
    </ul>
    <v-ons-button>Add Garden<v-ons-button>
</template>

<script>
export default {
  name: 'AddGarden',
  props: {
    // gardens: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
