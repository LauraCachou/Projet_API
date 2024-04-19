<template>
  <div class="presentation">
    <div class="introduction">
      <h2>Research</h2>
      <p>Get unlimited access to this image database!<br>Discover magnificent photos from all over the world!</p>
    </div>
    <div class="refineSearch">
      <Research @search="updatePhotos"/>
      <CityFilter @cityFilter="updatePhotos"/>
    </div>
  </div>
  <div class="filters">
    <h4>Sort by : </h4><br>
    <button @click="sortAuthors">Authors (A to Z)</button>
    <button @click="sortAuthorsReverse">Authors (Z to A)</button>
    <button @click="filterPortrait">Portrait Format</button>
    <button @click="filterLandscape">Landscape Format</button>
    <button @click="resetFilters">Reset Filters</button>
    <button @click="saveToLocalStorage">Save Filters</button>
  </div>
  <div v-if="displayedPhotos.length === 0" class="displayNull">
    <p>Make a search to see magnificent photos appear.</p>
  </div>
  <div v-else class="display">
    <PictureCard v-for="photo in displayedPhotos" :key="photo.id" :photo="photo" @click="openPhotoPage(photo)"/>
  </div>
</template>
  
<script>
  import Research from './Research.vue';
  import CityFilter from './CityFilter.vue';
  import PictureCard from './PictureCard.vue';
  import PhotoPage from './PhotoPage.vue';
  
  export default {
    components: {
      Research,
      CityFilter,
      PictureCard,
      PhotoPage
    },
    data() {
      return {
        originalPhotos: [],
        displayedPhotos: [],
        loading: false
      };
    },
    methods: {
      openPhotoPage(photo) {
        const params = new URLSearchParams();
        params.append('id', photo.id);
        params.append('title', encodeURIComponent(photo.alt_description));
        params.append('description', encodeURIComponent(photo.description));
        params.append('author', encodeURIComponent(photo.user.name));
        params.append('imageUrl', encodeURIComponent(photo.urls.regular));
        params.append('created_at', encodeURIComponent(photo.created_at));
        params.append('instagram_username', encodeURIComponent(photo.user.instagram_username));
        const tags = photo.tags.map(tag => tag.title);
        params.append('tags', encodeURIComponent(JSON.stringify(tags)));
        params.append('width', encodeURIComponent(photo.width));
        params.append('height', encodeURIComponent(photo.height));
        const photoPageURL = `PhotoPage.html?${params.toString()}`;
        window.location.href = photoPageURL;
      },
      async updatePhotos(photos) {
        this.loading = true;
        try {
          this.originalPhotos = photos.slice();
          this.displayedPhotos = photos;
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      },

      sortAuthors() {
        this.displayedPhotos.sort((a, b) => {
          const authorA = a.user.name.toUpperCase();
          const authorB = b.user.name.toUpperCase();
          if (authorA < authorB) return -1;
          if (authorA > authorB) return 1;
          return 0;
        });
      },

      sortAuthorsReverse() {
        this.displayedPhotos.sort((b, a) => {
          const authorA = a.user.name.toUpperCase();
          const authorB = b.user.name.toUpperCase();
          if (authorA < authorB) return -1;
          if (authorA > authorB) return 1;
          return 0;
        });
      },

      filterPortrait() {
        this.displayedPhotos = this.originalPhotos.filter(photo => photo.height > photo.width);
      },

      filterLandscape() {
        this.displayedPhotos = this.originalPhotos.filter(photo => photo.height < photo.width);
      },

      resetFilters() {
        this.displayedPhotos = this.originalPhotos.slice();
      },

      saveToLocalStorage() {
        localStorage.setItem("originalPhotos", JSON.stringify(this.originalPhotos));
        localStorage.setItem("displayedPhotos", JSON.stringify(this.displayedPhotos));
      }
    }
  };
</script>
  
<style scoped>
  .display {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    margin-top: 40px;
    height: auto;
  }

  .displayNull{
    text-align: center;
  }

  .filters{
    margin-top: 35px;
    display: flex;
    gap: 10px;
    place-items: center;
    place-content: center;
  }

  .filters button{
    width: 145px;
  }

  .refineSearch{
    display: grid;
    width: 50%;
    place-items: end;
    place-content: end;
  }

  .presentation{
    display: flex;
    gap: 10px;
    place-items: center;
    width: auto;
  }

  .introduction{
      display: inline;
      float: left;
      width: 50%;
      text-align: left;
  }

  .research{
    display: flex;
    gap: 10px;
    float: right;
    width: 100%;
    place-content: end;
  }

  @media (max-width: 1024px) {
    .presentation {
      display: grid;
      place-content: center;
      text-align: center;
    }

    .introduction{
        width: 100%;
        text-align: center;
      }

    .refineSearch{
      display: grid;
      width: 100%;
      place-items: center;
      place-content: center;
    }

    .filters{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
    }
  }
</style>
  