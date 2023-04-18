
# AP TKT-ReactJS - Cerza

![](https://www.anigaido.com/media/zoo_lieux/1-100/51/cerza-parc-des-safaris-hermival-les-vaux-xl.jpg)


## Contexte

Le project **TKT-ReactJS** a été réalisé en AP par groupe de 3 développeurs dont un chef de projet. Nous sommes employés de l'entreprise ***TKT*** située à Paris, et nous devons répondre à une demande exprimée par le ***Zoo Cerza*** qui consiste à créer un site web intranet sous ReactJS, devant permettre la gestion du Zoo.


## Développeurs participants

- [Hugo Poquet](https://www.github.com/Roswell1208) (Chef de projet)
- [Vincent Murienne](https://www.github.com/Vincent-Murienne)
- [Max Michelet](https://www.github.com/Gooobelet)


## Langages / frameworks

**Client:** ![ReactJS](https://img.shields.io/badge/-ReactJS-9cf)
            ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow)
            ![HTML](https://img.shields.io/badge/-HTML-orange)
            ![CSS](https://img.shields.io/badge/-CSS-blue)

**Server:** ![NodeJS](https://img.shields.io/badge/-NodeJS-green)
            ![express](https://img.shields.io/badge/-express-lightgrey)
            ![MySql](https://img.shields.io/badge/-MySql-9cf)

## Charte graphique

| Couleur             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Marron | ![#38241C](https://via.placeholder.com/10/38241C?text=+) #38241C |
| Rouge | ![#B9493E](https://via.placeholder.com/10/B9493E?text=+) #B9493E |
| Noir | ![#292929](https://via.placeholder.com/10/292929?text=+) #292929 |
| Orange | ![#FE9C3F](https://via.placeholder.com/10/FE9C3F?text=+) #FE9C3F |
| Blanc | ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) #FFFFFF |


## Fonctionnalités de l'application

- Page d'authentification (login / mot de passe) ![](https://img.shields.io/badge/git%20branch-feature--authentification-red)
- Pour les ****utilisateurs**** :
    - ***Encyclopédie*** des races animales ![](https://img.shields.io/badge/git%20branch-Encyclop%C3%A9die-red)
    - Envoi d'un ***avertissement*** à tous ![](https://img.shields.io/badge/git%20branch-Avertissement-red)
    - Consultation de ses ***missions*** (possibilité de marquer comme effectuée ou non et de mettre un commentaire) ![](https://img.shields.io/badge/git%20branch-feature--missions--user-red)
    - ***Contrôle d'animaux*** ![](https://img.shields.io/badge/git%20branch-Contr%C3%B4leAnimaux-red)
- Pour les ****administrateurs**** :
    - Consultation de toutes les ***missions*** et ajout d'une nouvelle mission ![](https://img.shields.io/badge/git%20branch-feature--missions--admin-red)
    - Envoi, modification et suppression d'un ***avertissement*** ![](https://img.shields.io/badge/git%20branch-Avertissement-red)


## Comment installer l'application

- #### Téléchargement du projet depuis git (application + api)

- #### Installation de la base de données (sur Xampp par exemple)
    - Démarrer apache et MySql
    - Créer une base de données nommée bdd-cerza sur phpmyadmin
    - Importer le fichier bdd-cerza.sql disponible à la racine du projet

- #### Pour l'application web :

     Ouvrir un terminal à la racine du projet.

     On se déplace dans le dossier :
    ```bash
    cd app-web-cerza
    ```

     On installe les dépendences
    ```bash
    npm install
    ```

     On démarre le server client
    ```bash
    npm start
    ```


- #### Pour l'API :

     Ouvrir un terminal à la racine du projet.
     On se déplace dans le dossier :
    ```bash
    cd api-cerza
    ```

     On installe les dépendences
    ```bash
    npm install
    ```

     On démarre le server
    ```bash
    npm start
    ```


## Documentation de l'API

#### Récupérer toutes les missions :

```http
  GET /api/missions
```

| Paramètre | Type     | Description  |
| :-------- | :------- | :----------- |
| Aucun | Aucun | Aucune |

#### Récupérer les missions d'un utilisateur avec son nom d'utilisateur :

```http
  GET /api/missions/${id}
```

| Paramètre | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. Nom d'utilisateur |

#### Créer une nouvelle mission :

```http
  POST /api/missions
```

| Paramètre | Type     | Description  |
| :-------- | :------- | :----------- |
| Aucun | Aucun | Aucune |

