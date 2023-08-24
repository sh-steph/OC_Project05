<details>
  <summary>Français</summary>

# Projet Yoga App

Comme vous pouvez le constater le projet est constitué d'un front-end et d'un back-end. Ce projet a été développé dans le cadre d'une formation où le front-end et le back-end sont fournis à l'étudiant pour qu'il puisse développer l'ensemble des tests unitaires et des tests de bout en bout pour les deux parties de l'application ayant **pour objectif d'avoir un taux de couverture de 80% minimum** à l'aide du plan de test.

Le front est un projet développé sur Angular 14 et le back sur Springboot 2.6.

## Par où commencer ?

Pour la partie back du projet, il vous faudra tout d'abord exécuter la commande suivante `docker-compose up` à la racine du projet afin de générer la base de donnée à l'aide de docker, puis importer le dossier **back-end** dans votre IDE dédié (IntelliJ, Eclipse...).

Avant de `build` et `run` l'application, veuillez tout d'abord paramétrer les **variables d'environnements** de votre IDE afin que l'application puisse interagir avec la **base de données** dont les variables en question se situent dans le fichier **application.properties** (les valeurs sont paramétrées aux préalables dans le **docker-compose.yml**).

DB_USER=`user`
DB_PASSWORD=`password`

Exemple sur IntelliJ IDEA: DB_USER=oc_user;DB_PASSWORD=oc_pwd

<img src='/ressources/images/IntelliJ.png' width='500'/>

Pour la partie front du projet, aller dans le dossier **front-end** pour générer le **node_module** en exécutant la commande suivante `npm install`.
Une fois l'installation complète, executer la commande `npm start` pour exécuter l'application et naviguer sur l'URL fourni (l'URL par défaut `http://localhost:4200/`).

<details>
  <summary>Organisation de développement</summary>

## Kanban

<img src='/ressources/images/Kanban.png' width='500'/>

Suite à une lecture des spécifications, chaque **issue** (ticket) correspond à une fonctionnalité de l'application et donc à une branche qui lui est spécifique dont le premier numéro du ticket correspond à une partie de l'application.

Bien entendu, le nombre de tickets dépendent du développement en question et de son avancement (nombre de fonctionnalité additionnelle nécessaire, bug rencontré...).

Ce qui résulte à l'historique suivant à travers les différents commit détaillant brièvement les modifications apportées.

<img src='/ressources/images/branch-git.png' width='500'/>

</details>

<details>
  <summary>Le plan de test</summary>

| Fonctionnalités      | Exemples de tests à réaliser                                                                                                                |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Login                | - La connexion<br>- La gestion des erreurs en cas de mauvais login / password<br>- L’affichage d’erreur en l’absence d’un champ obligatoire |
| Register             | - La création de compte<br>- L’affichage d’erreur en l’absence d’un champ obligatoire                                                       |
| Sessions             | - Affichage de la liste des sessions<br><br>- L’apparition des boutons Create et Detail si l’utilisateur connecté est un admin              |
| Informations session | - Les informations de la session sont correctement affichées<br><br>- Le bouton Delete apparaît si l'utilisateur connecté est un admin      |
| Création session     | - La session est créée<br>- L’affichage d’erreur en l’absence d’un champ obligatoire                                                        |
| Suppression session  | - La session est correctement supprimée                                                                                                     |
| Modification session | - La session est modifiée<br>- L’affichage d’erreur en l’absence d’un champ obligatoire                                                     |
| Account              | - Affichage des informations de l’utilisateur                                                                                               |
| Logout               | - La déconnexion de l’utilisateur   

</details>

<details>
  <summary>Structure des tests unitaires et des tests de bout en bout</summary>
  

## Front
<details>
<summary>Test unitaire</summary>

Pour les tests unitaires de la partie front du projet, j'ai opté pour `Jest` étant donné que le front a été développé sur Angular.

Jest est un framework de test JavaScript reconnu pour sa facilité d'utilisation et de configuration due à sa **simplicité d'exécution des tests** et des ses **fonctionnalités avancées**.

Puisque Angular a une architecture basée sur les composants où l'on retouve sa logique(ts), son template(html) et son style(scss), on retrouvera également le fichier de test(spec.ts) où l'on rédigera l'ensemble de nos tests unitaires liés au composant en question.

Taux de couverture des tests :

<img src='/ressources/images/unit-test-front-coverage.png' width='500'/>

</details>
<details>
<summary>Test de bout en bout</summary>

Pour les tests de bout en bout, j'ai opté pour `Cypress` due à sa **stabilité et rapidité des tests** puisqu’il utilise une architecture unique qui s'exécute directement dans le navigateur, ce qui élimine les dépendances externes et les retards liés à l'interaction avec le navigateur, mais également à ses **possibiliés des tests** puisque comparé aux tests unitaires, Cypress prend en charge lors de ses tests les actions que peut effectuer un utilisateur. Il peut prendre en compte plusieurs actions telles que les clics, les saisies de données, la validation des formulaires, etc. Permettant donc d’effectuer des tests complets et réalistes.

L'ensemble des tests de bout en bout sont répertoriés sur le path suivant `front\cypress\e2e` traitant chacun des tests une fonctionnalité importante de l'application.
</details>
  
## Back

<details>
<summary>Test unitaire</summary>

Pour les tests unitaires de la partie back du projet, j'ai opté pour `JUnit5` due à sa **compatibilité avec Java** puisque JUnit5 est spécifiquement conçu pour le langage de programmation Java, ce qui en fait un choix naturel pour les projets développés avec Spring Boot, ainsi pour ses **fonctionnalités avancées** et son **architecture modulaire** permettant donc de nombreuses possibilités de test.

En plus de `Mockito` en complément des tests unitaires de JUnit5 afin de pouvoir “mock” lors des tests, c'est-à-dire simuler un objet pour imiter un comportement d’un objet réel pour les besoins des tests.

Taux de couverture des tests :

<img src='/ressources/images/unit-test-front-coverage.png' width='500'/>

</details>
<details>
<summary>Test de bout en bout</summary>

Pour les tests de bout en bout de la partie back du projet, tout comme pour les test unitaires, j'ai également opté pour `JUnit5` puisque l'essentiel des tests à effectuer concernait principalement les **Request Mapping** (POST, PUT, DELETE) sur l'ensemble des contrôleurs concernés.

</details>
</details>
<details>
  <summary>Les enjeux de la mise en place des tests unitaires et des tests de bout en bout</summary>

Étant donné que la partie frontend a déjà été fourni dans le cadre de la formation se concentrant donc sur la partie backend.

## Test unitaire

Les tests unitaires sont axés sur la vérification du bon fonctionnement des parties individuelles de l'application (ex: l'affichage d'un contenu si l'utilisateur a le statut d'administrateur). Les tests unitaires peuvent être des fonctions, des méthodes ou des classes. Les enjeux des tests unitaires sont les suivants :

- `Isolation et détection précoce des erreurs` : Les tests unitaires permettent d'isoler chaque unité du code pour s'assurer qu'elle fonctionne correctement, indépendamment des autres parties du système. Cela facilite la détection et la résolution des erreurs à un stade précoce du développement.
- `Régression` : Lorsque de nouvelles fonctionnalités sont ajoutées ou des modifications sont apportées, les tests unitaires aident à garantir que les modifications ne cassent pas les fonctionnalités existantes.
- `Source de documentation complémentaire` : Les tests unitaires agissent également comme une source de documentation complémentaire pour la compréhension du code. Ils fournissent des exemples concrets de la manière dont le code doit être utilisé et des attentes de sortie. Cela permet particulièrement aux développeurs débutants et aux nouveaux membres intégrant l'équipe de faciliter l'adaptation au projet.

## Test de bout en bout

Les tests de bout en bout, également connus sous le nom de tests fonctionnels, évaluent le comportement d'une application dans son ensemble, en simulant les interactions de l'utilisateur à travers un scénario pré-défini. Les enjeux des tests de bout en bout sont les suivants :

- `Validation du flux utilisateur` : Les tests de bout en bout vérifient que toutes les parties de l'application fonctionnent ensemble de manière cohérente pour répondre aux besoins de l'utilisateur. Cela garantit que le flux utilisateur attendu est respecté.
- `Détection des problèmes d'intégration` : Les erreurs d'intégration entre différentes parties de l'application, telles que la communication entre le front-end et le back-end, peuvent être détectées par les tests de bout en bout.
- `Garantie de qualité utilisateur` : Les tests de bout en bout sont essentiels pour s'assurer que l'application fonctionne correctement dans un environnement similaire à celui que les utilisateurs finaux utilisent. Cela aide à garantir une meilleure expérience utilisateur.
- `Identification des problèmes de performance` : Les tests de bout en bout peuvent révéler des problèmes de performance et d'efficacité qui ne sont souvent pas visibles dans les tests unitaires.

## Résumé

Les tests unitaires se concentrent donc à vérifier des fonctionnalites de l'application de manière individuelle, tandis que les tests de bout en bout s'intéressent à la validation du de l'application dans son ensemble. Les deux types de tests sont essentiels afin de garantir la qualité de l'application, détecter les erreurs à différents niveaux et offrir une meilleure confiance dans le bon fonctionnement de l'application et particulièrement aux projets de grande envergures.

</details>
<details>
  <summary>Les dépendances</summary>

| Dépendance |                        Lien                         |
| :--------- | :-------------------------------------------------: |
| Jest       |       https://jestjs.io/docs/getting-started        |
| Cypress    | https://docs.cypress.io/guides/overview/why-cypress |
| JUnit5     |           https://www.baeldung.com/junit            |
| Mockito    |              https://site.mockito.org/              |
| AssertJ    |  https://www.baeldung.com/introduction-to-assertj   |

</details>
</details>
<details>
  <summary> English</summary>

# Yoga App project

As you can see, the project consists of a front-end and a back-end. This project was developed as part of a training program in which the front-end is provided to the student so that I develop the entire back-end and set up the connection between the front-end and the back-end.

The front-end is a project developed on Angular 14 and the back-end on Springboot 2.7.

## Where to start ?

For the back end of the project, you'll first need to run the following command `docker-compose up` at the project root to generate the database using docker.
Then import the **back-end** folder into your dedicated IDE (IntelliJ, Eclipse...), `build` and `run` the application.

For the front-end part of the project, go to the **front-end** folder to generate the **node_module** by executing the following command `npm install`.
Once the installation is complete, run the command `npm start` to execute the application and navigate to the URL provided (the default URL is `http://localhost:4200/`).

Before `build` and `run` the application, please first set the **environment variables** in your IDE so that the application can interact with the **database** whose variables are located in the **application.properties** file (the values are set beforehand in the **docker-compose.yml**).

DB_URL=jdbc:mysql://localhost:`port`/`db_name`
DB_USER=`user`
DB_PASSWORD=`password`

Example on IntelliJ IDEA: DB_URL=jdbc:mysql://localhost:3306/oc_chatop_db;DB_USER=oc_user;DB_PASSWORD=oc_pwd

<img src='/ressources/images/IntelliJ.png' width='500'/>

<details>
  <summary>Development organization</summary>

## Kanban

<img src='/ressources/images/Kanban.png' width='500'/>

Following a reading of the specifications, each **issue** corresponds to an application feature and therefore to a specific branch, the first ticket number of which corresponds to a part of the application.

Of course, the number of tickets depends on the development and its progress (number of additional functions required, bugs encountered...).

This results in the following history through the various commits, briefly detailing the modifications made.

<img src='/ressources/images/branch-git.png' width='500'/>

</details>

<details>
  <summary>Project architecture structure</summary>

<details>
  <summary>Tree</summary>
back-end
├── HELP.md
├── images
│   └── rentals
├── lib
│   └── webjars-locator-core-0.48.jar
├── mvnw
├── mvnw.cmd
├── pom.xml
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── openclassrooms
│       │           └── occhatop
│       │               ├── OcChatopApplication.java
│       │               ├── configuration
│       │               │   ├── AuthEntryPointJwt.java
│       │               │   ├── JwtAuthenticationFilter.java
│       │               │   ├── SecurityConfig.java
│       │               │   └── SwaggerConfiguration.java
│       │               ├── controllers
│       │               │   ├── AuthenticationController.java
│       │               │   ├── ImageController.java
│       │               │   ├── MessageController.java
│       │               │   ├── RentalController.java
│       │               │   └── UserController.java
│       │               ├── dao
│       │               │   ├── AuthenticationRequest.java
│       │               │   ├── AuthenticationResponse.java
│       │               │   └── RegisterRequest.java
│       │               ├── dto
│       │               │   ├── RentalDTO.java
│       │               │   └── UserDTO.java
│       │               ├── exceptions
│       │               │   ├── RentalNotFoundException.java
│       │               │   ├── UserIdNotFoundException.java
│       │               │   └── UserNotFoundException.java
│       │               ├── models
│       │               │   ├── authentication
│       │               │   │   └── User.java
│       │               │   ├── message
│       │               │   │   └── Message.java
│       │               │   └── rental
│       │               │       └── Rental.java
│       │               ├── repositories
│       │               │   ├── MessageRepository.java
│       │               │   ├── RentalRepository.java
│       │               │   └── UserRepository.java
│       │               └── services
│       │                   ├── AuthenticationService.java
│       │                   ├── JwtService.java
│       │                   ├── MessageService.java
│       │                   ├── RentalService.java
│       │                   └── UserService.java
│       └── resources
│           ├── application.properties
│           ├── static
│           └── templates
</details>

As you can see, the architecture of the project follows a fairly common structure for applications developed with Spring Boot.

- `configuration`: This folder contains the **configurations** specific to the application, in particular the security configuration. In this project, a security system is set up to filter access to certain URLs according to users, using the JSON Web Token (JWT).

- `controllers`: This folder contains the **controller** classes that manage API mapping. Controllers are responsible for receiving HTTP requests, processing the data and returning the appropriate responses.

- `models`: This folder contains the **models** classes, which represent the application's business entities. Models are generally Java classes with annotations for data persistence and validation.

- `repositories`: This folder contains the **repository interfaces** that define data persistence operations. Repository interfaces are used to interact with the database or other data storage system (the application currently uses MySQL).

- `services`: This folder contains the **services** classes that implement the application's business logic. Services are responsible for manipulating data, coordinating operations and executing business rules such as registering a new user, generating the token for authentication and updating user announcements.

</details>

<details>
  <summary>Application development challenges</summary>

Since the frontend has already been provided as part of the training course, we'll concentrate on the backend.
This project addresses the following issues:

## Setting up authentication with JSON Web Token (JWT)

The authentication is at the heart of the vast majority of applications on all platforms, this project uses **JSON Web Token** (JWT) to secure access to certain API resources. JWTs offer a secure method of exchanging authentication information between client and server, while avoiding the need to store user state on the server.

The JWT offers a number of advantages:

- `Security`: JWTs are encrypted and digitally signed, guaranteeing data integrity and preventing unauthorized alteration.

- `Information passing`: JWTs enable additional information to be transmitted in the token itself, avoiding the need to consult the database each time a protected access request is made.

- `Stateless`: JWTs are "stateless", meaning that the server doesn't need to store the user's state. This means greater scalability and fewer database calls.

Authentication process diagram :

<img src='/ressources/images/JWT-works.png' width='500'/>

## Mapping API database interaction

This project uses API mappings to enable interaction with the database. API mappings define API endpoints and specify HTTP operations (GET, POST, PUT, DELETE) so that the frontend can interact with the database.

Here are a few examples of commonly used API mappings:

- `GET`: Used to retrieve data from the database. In the context of this project, it is used to retrieve information about the authenticated user. You can use the endpoint `/api/auth/me` with the HTTP GET method.

- `POST`: Used to create new resources in the database. In the context of the project, it is used to register a new user or add a new advert. You can use the `/auth/register` endpoint with the HTTP POST method and supply the data of the future user in the body of the request.

- `PUT`: Used to update existing resources in the database. In the context of the project it is used to modify the content of an advert, you can use the endpoint `/api/rentals/{id}` with the HTTP PUT method and supply the new advert data in the request body.

- `DELETE`: Used to remove resources from the database. It is not used in this project.

API mappings are used to expose the application's functionality to clients, so that any other application developed on a web, mobile or other service framework can interact with it.

## Swagger

You can view and experiment with all the APIs through Swagger through the following link `http://localhost:3000/swagger-ui/index.html` when the application is running.
Many APIs require a token (JWT), so it's best to start with authentication.

</details>

<details>
  <summary>Dependencies</summary>

| Dependency |                        Link                         |
| :--------- | :-------------------------------------------------: |
| Jest       |       https://jestjs.io/docs/getting-started        |
| Cypress    | https://docs.cypress.io/guides/overview/why-cypress |
| JUnit5     |           https://www.baeldung.com/junit            |
| Mockito    |              https://site.mockito.org/              |
| AssertJ    |  https://www.baeldung.com/introduction-to-assertj   |

</details>
</details>
