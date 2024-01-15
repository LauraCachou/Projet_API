import './assets/main.css'

import { createApp } from 'vue' //récupère un objet, fonction "createAPP", permet intialiser application
import App from './App.vue' //appel fichier

createApp(App).mount('#app') //créer objet puis ensuite appel méthode instancier grâce à la fonction
//injecte dans la div #app les éléments (dans index.html)

//ce fichier peu manipulé