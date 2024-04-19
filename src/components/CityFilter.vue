<template>
  <div class="cityFilter">
    <select v-model="selectedCity">
      <option value="">Select a topic</option>
      <option v-for="city in cities" :key="city.value" :value="city.value">{{ city.label }}</option>
    </select>
    <button @click="searchByCity">Filter</button>
  </div>
</template>

<script>
  import { searchImages } from '../services/photosAPI'
  import PictureCard from './PictureCard.vue';

  export default {
    data() {
      return {
        selectedCity: '',
        loading: false,
        cities: [
          { label: 'Paris', value: 'Paris' },
          { label: 'London', value: 'London' },
          { label: 'New-York', value: 'New-York' },
          { label: 'Japan', value: 'Japan' },
          { label: 'Shanghai', value: 'Shanghai' }
        ],
        filteredPhotos: []
      };
    },
    
    components: {
      PictureCard
    },

    methods: {
      async searchByCity() {
        this.loading = true;
        try {
          const searchTerm = this.selectedCity;
          const data = await searchImages(searchTerm);
          this.filteredPhotos = data.results;
          this.$emit('cityFilter', this.filteredPhotos);
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
  select {
    width: 125px;
    height: 35px;
    color: #333;
    border-style: none;
    color : #5D5D5D;
    border-radius: 10px;
    padding: 5px;
    background-color: whitesmoke;
    font-family: Poppins;
  }

  .cityFilter{
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
</style>
