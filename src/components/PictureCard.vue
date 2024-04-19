<template>
  <div class="pictureCard">
    <img :src="photo.urls.regular" :alt="photo.alt_description">
    <div class="details">
      <p class="description">{{ photo.description ? photo.description : 'Unknown title' }}</p>
      <p class="format">Format: {{ photo.width }} x {{ photo.height }}</p>
      <p class="artist">By {{ photo.user.name ? photo.user.name : 'Unknown' }}</p>
      <div class="tag">
        <p v-if="photo.tags && photo.tags.length > 0">Tags: 
          <span v-for="tag in photo.tags" :key="tag.title">{{ tag.title ? tag.title : 'None' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    tags: [],
    props: {
      photo: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style scoped>
  .pictureCard {
    border-radius: 5px;
    box-shadow: 3px 3px 11.300000190734863px rgba(0, 0, 0, 0.15);
    width: 100%;
  }

  .pictureCard img {
    width: 100%;
    height: 400px;
    border-radius: 5px;
    object-fit: cover;
  }

  .details {
    padding: 0 15px;
    margin-bottom: 20px;
    text-align: justify;
    font-size: 12px;
    color: #666;
    text-align: center;
  }

  .artist {
    font-size: 15px;
    color: black;
    text-transform: capitalize;
  }

  .tag span{
    margin-right: 5px;
    padding: 3px 8px;
    border-radius: 5px;
    width: auto;
    height: auto;
    border-radius: 10px;
    border-style: none;
    color : #5D5D5D;
    background-color: #F4F4F4;
  }
</style>
