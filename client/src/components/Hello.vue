<template>
  <div class="hello">
    <div>
      <p id="photomessage"></p>
      <label>Take photo
        <input type="file" id="addphoto" accept="image/*" style="display: none;">
      </label>
        <div>
          <div>
            <span>Tell us more</span>
          </div>
          <textarea id="snapshotcomment"></textarea>
        </div>
        <button id="submit">Submit</button>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  data: {
    image: '',
    comment: ''
  },
  takePhoto(event) {
    this.image = event.files[0];
    console.log(this.image);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  color: #35495e;
}
</style>
