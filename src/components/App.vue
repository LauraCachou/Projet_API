<template>
  <div id="test">
    <DisplayPhotos/>
  </div>
</template>

<script>
  import Research from './Research.vue';
  import CityFilter from './CityFilter.vue';
  import DisplayPhotos from './DisplayPhotos.vue';

  export default {
    components: {
      Research,
      CityFilter,
      DisplayPhotos
    },

    data() {
      return {
        loading: false,
      };
    },
  };
</script>

<style>
  #app{
    margin-top: 10px;
    margin-bottom: 30px;
    font-family: Poppins;
    width: 80%;
    margin: 0 auto;
  }
</style>