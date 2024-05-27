
// 1. Initialisation des variables dans le scope globale ********************************************


// Après cette ligne, gallery contiendra une référence à l'élément DOM avec la classe gallery.

const gallery = document.querySelector('.gallery');
let works = [];


// 2. Fonction pour récupérer et afficher les travaux (works) **********************************


// La fonction déclarée et asynchrone getWorks envoie une requête HTTP GET (avec fetch) à l'URL spécifiée, attend la réponse, vérifie si la réponse est correcte, et en cas d'erreur, lève une exception avec un message d'erreur approprié. 
// L'utilisation de await avant fetch signifie que la fonction va attendre que la promesse soit résolue avant de continuer. Cela signifie que le code attend la réponse de l'API,
// Le nom response utilisé dans ce contexte n'est pas choisi au hasard. Il est communément utilisé pour représenter l'objet retourné par la fonction fetch() lorsqu'elle effectue une requête HTTP. 


const getWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // la variable works contiendra les données de la réponse de l'API au format JSON.
    works = await response.json(); 
    // pas besoin de définir la variable works
    console.log('Works after fetching:', works); // Affiche les travaux récupérés dans la console


    works.forEach(work => {
        const workElement = document.createElement('div');
        workElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <div class="work-info">
                <figcaption>${work.title}</figcaption>
            </div> `;
        gallery.appendChild(workElement);
    });
}



// 3. Fonction pour récupérer les catégories et créer les boutons de filtres **************

const getFiltered = async () => {
    const response = await fetch ('http://localhost:5678/api/categories')
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const categories = await response.json();
    console.log('Categories:', categories);


    // initialisation de la variables pour les boutons par catégories
    const categoriesMenu = document.querySelector('.categories-menu');



    
    // Initialisation de la variable pour le bouton "Tous les travaux"
    // const allCategoriesButton = document.getElementById('all-categories');
    const allCategoriesButton = document.createElement('button');
    allCategoriesButton.textContent = 'Tous';
    allCategoriesButton.id = 'all-categories';
    categoriesMenu.appendChild(allCategoriesButton);


    // Ajouter un gestionnaire d'événements pour le clic sur le bouton "Tous les travaux"
    allCategoriesButton.addEventListener('click', () => {
    // Appeler la fonction updateGallery avec tous les travaux
    console.log('All button clicked', allCategoriesButton);
    updateGallery(works);

// categoriesMenu.appendChild(allCategoriesButton);
});

categories.forEach(category => {
    const categoryElement = document.createElement('div')
    categoryElement.innerHTML = 
    `<button id="${category.id}"> ${category.name}</button>`;
    categoriesMenu.appendChild(categoryElement);
    
    

// Ajoutez un gestionnaire d'événements pour filtrer la galerie par catégorie
categoryElement.addEventListener('click', () => {
    // Exemple de logique pour filtrer les travaux
    console.log('Category button clicked:', category.name); 
    console.log('Category ID:', category.id); // Affiche l'ID de la catégorie
    console.log('Works:', works); // Affiche tous les travaux pour vérifier leur structure
    const filteredWorks = works.filter(work => work.categoryId === category.id);
    updateGallery(filteredWorks);
    console.log('Filtered works:', filteredWorks); 
    
    
    
// filter parcourt chaque élément de works.Pour chaque work, il vérifie si work.category est égal à category.id.Si cette condition est vraie, work est ajouté au nouveau tableau filteredWorks.Si la condition est fausse, work est ignoré.

// La fonction updateGallery est appelée avec filteredWorks comme argument.
// updateGallery prend ce tableau de travaux filtrés et met à jour le contenu de l'élément gallery pour afficher seulement ces travaux.
        });
    });
}




// 4. Fonction pour mettre à jour la galerie avec des travaux filtrés ******************


// Fonction updateGallery :
// Utilise la variable gallery existante pour mettre à jour le contenu de la galerie avec les travaux filtrés.
// filteredWorks est une convention courante et descriptive pour nommer des variables qui contiennent des données filtrées.La méthode filter est utilisée pour créer un nouveau tableau contenant uniquement les éléments qui satisfont une condition spécifique.

const updateGallery = (filteredWorks) => {
    gallery.innerHTML = ''; // Vider la galerie existante
    filteredWorks.forEach(work => {
        const workElement = document.createElement('div');
        workElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <div class="work-info">
                <figcaption>${work.title}</figcaption>
            </div>
        `;
        gallery.appendChild(workElement);
    });
    
}



//     workElement.innerHTML définit le contenu HTML intérieur du div créé
//     La chaîne de caractères entre les backticks (`) est un template literal qui permet d'inclure des expressions JavaScript en utilisant ${expression}.
//     Il boucle sur chaque élément du tableau works.
// Pour chaque élément work :
// Il crée un nouvel élément div.
// Il définit le contenu HTML de ce div pour inclure une image et une légende utilisant les propriétés imageUrl et title de l'élément work.
// Il ajoute ce div au conteneur gallery dans le DOM.



// 5. Appels des fonctions pour initialiser l'affichage ********************************


// Appeler la fonction getWorks pour récupérer les travaux et les afficher initialement
getWorks().then(() => {
// Appeler getFiltered pour générer le menu des catégories après avoir récupéré les travaux
getFiltered();
});




