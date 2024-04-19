    
const searchImages = async function(query) {
  const accessKey = 'pQivX8PoCD-y2EBfBQH3Qio7IfV1njWFSsluw14pcZE';
  const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(response.statusText);
  }
};

export { searchImages };