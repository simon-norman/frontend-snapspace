<template>
  <v-container grid-list-xl>
    <v-layout row justify-center align-center wrap>
      <v-flex xs12 s4 md3>
        <label class="btn btn-file info btn--block">
          Take photo
          <input type="file" id="addphoto" accept="image/*" style="display: none;">
        </label>
      </v-flex>
    </v-layout>
    <v-layout row justify-center align-center wrap>
      <v-flex xs4 s2 md1>
      <v-subheader>Normal with hint text</v-subheader>
      </v-flex>
      <v-flex xs8 s2 md2>
        <v-text-field name="input-1-3" label="Hint Text" single-line></v-text-field>
      </v-flex>
    </v-layout>  
    <v-layout row justify-center align-center wrap>
      <v-flex xs12 s4 md3>
        <v-btn block class="info">Submit</v-btn>
      </v-flex>
    </v-layout>    
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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

.btn-file {
  position: relative;
  margin: 0 !important;
  overflow: hidden;
  cursor: pointer;
}

.btn-file [type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  display: block;
}
</style>
