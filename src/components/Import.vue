<template>
    
</template>
<script>
export default {
  data() {
    return {
      query: '',
      images: [],
      errorMessage: ''
    };
  },
  methods: {
    async searchImages() {
      try {
        const accessKey = 'pQivX8PoCD-y2EBfBQH3Qio7IfV1njWFSsluw14pcZE'; // 
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${this.query}&client_id=${accessKey}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          this.images = data.results;
          this.errorMessage = '';
        } else {
          this.images = []; //utilise ça pour faire filtre je crois
          this.errorMessage = 'Aucune image trouvée.';
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Une erreur est survenue lors de la recherche des images.';
      }
    }
    
  }
};
</script>
