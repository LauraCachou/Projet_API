<template>
  <div class="research">
    <input v-model="query" type="text" placeholder="Search for images">
    <button @click="search">Search</button>
  </div>
</template>

<script>
  import { searchImages } from '../services/photosAPI'
  import PictureCard from './PictureCard.vue';

  export default {
    data() {
      return {
        query: '',
        loading: false,
        photos: []
      };
    },

    components:{
      PictureCard
    },

    methods: {
      async search() {
        this.loading = true;
        try {
          const data = await searchImages(this.query);
          this.photos = data.results;
          this.$emit('search', this.photos);
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
</script>

<style scoped>
  input{
    padding: 10px;
    width: 250px;
    height: 35px;
    border-radius: 10px;
    border-style: none;
    color : #5D5D5D;
    background-color: whitesmoke;
    font-family: Poppins;
  }
</style>
