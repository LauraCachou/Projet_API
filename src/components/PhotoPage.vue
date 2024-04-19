<template>
    <div id="photoPage">
      <h2>Photo Details</h2>
      <div class="photoDetails" v-if="photo">
        <img :src="photo.urls.regular" :alt="photo.alt_description">
        <div class="details">
          <p>Title: {{ photo.description ? photo.description : 'Unknown title' }}</p>
          <p>Published at: {{ photo.created_at ? photo.created_at.slice(0, 10) : 'Unknown date' }}</p>
          <p>By: {{ photo.user ? photo.user : "Unknown author" }}</p>
          <p>Instagram Username: @{{ photo.instagram_username ? photo.instagram_username : 'Unknown account' }}</p>
          <p>Format: {{ photo.width ? photo.width:"Unknown format"}} x {{ photo.height ? photo.height:"Unknown format"}}</p>
          <div class="tag">
            <p v-if="photo.tags && photo.tags.length > 0">Tags: 
              <span v-for="tag in photo.tags" :key="tag.title">{{ tag ? tag : 'None' }}</span>
            </p>
          </div><br/>
          <span class="download"><a :href="photo.urls.regular" download>Download</a></span>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        photo: null
      };
    },
    created() {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const title = decodeURIComponent(params.get('title'));
      const description = decodeURIComponent(params.get('description'));
      const author = decodeURIComponent(params.get('author'));
      const imageUrl = decodeURIComponent(params.get('imageUrl'));
      const createdAt = decodeURIComponent(params.get('created_at'));
      const instagramUsername = decodeURIComponent(params.get('instagram_username'));
      const tags = JSON.parse(decodeURIComponent(params.get('tags')));
      const width = parseInt(params.get('width'));
      const height = parseInt(params.get('height'));
      
      if (id && title && description && author && imageUrl && createdAt && instagramUsername && tags && height && width) {
        this.photo = {
          id: id,
          alt_description: title,
          description: description,
          user: author,
          urls: { regular: imageUrl },
          created_at: createdAt,
          instagram_username: instagramUsername,
          tags: tags,
          height: height,
          width: width
        };
      } else {
        console.error('Missing photo data');
      }
    }
  };
</script>

<style scoped>
  #photoPage{
    margin-top: 10px;
    margin-bottom: 30px;
    font-family: Poppins;
    width: 80%;
    margin: 0 auto;
  }
  .photoDetails{
    border-radius: 5px;
    box-shadow: 3px 3px 11.300000190734863px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    place-content: center;
    margin: 0 auto;
  }

  .photoDetails img {
    width: 600px;
    border-radius: 5px;
    object-fit: cover;
    height:fit-content;
  }

  .details {
    padding: 20px;
    width: 100%;
    line-height: 2em;
  }
  
  .download a{
    margin-right: 5px;
    padding: 3px 8px;
    border-radius: 5px;
    width: auto;
    height: auto;
    border-radius: 10px;
    border-style: none;
    color : #5D5D5D;
    background-color: whitesmoke;
  }
  .download a:hover{
    background-color:#C8A3E0;
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

  @media (max-width: 1024px) {
    .photoDetails{
    display: block;
    }

    .photoDetails img {
    width: 100%;
    }
  }
</style>