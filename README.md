<details>
  <summary>Français</summary>

# Projet Yoga App

Comme vous pouvez le constater le projet est constitué d'un front-end et d'un back-end. Ce projet a été développé dans le cadre d'une formation où le front-end et le back-end sont fournis à l'étudiant pour qu'il puisse développer l'ensemble des tests unitaires et des tests de bout en bout pour les deux parties de l'application ayant **pour objectif d'avoir un taux de couverture de 80% minimum** à l'aide du plan de test.

Le front est un projet développé sur Angular 14 et le back sur Springboot 2.6.

## Par où commencer ?

Pour la partie back du projet, il vous faudra tout d'abord exécuter la commande suivante `docker-compose up` à la racine du projet afin de générer la base de donnée à l'aide de docker, puis importer le dossier **back-end** dans votre IDE dédié (IntelliJ, Eclipse...).

Avant de `build` et `run` l'application, veuillez tout d'abord paramétrer les **variables d'environnements** de votre IDE afin que l'application puisse interagir avec la **base de données** dont les variables en question se situent dans le fichier **application.properties** (les valeurs sont paramétrées aux préalables dans le **docker-compose.yml**).

DB_USER=`oc_user`
DB_PASSWORD=`oc_pwd`

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

### Objectif : réaliser 80 % de couverture de test

| Fonctionnalités      | Exemples de tests à réaliser                                                                                                                |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Login                | - La connexion<br>- La gestion des erreurs en cas de mauvais login / password<br>- L’affichage d’erreur en l’absence d’un champ obligatoire |
| Register             | - La création de compte<br>- L’affichage d’erreur en l’absence d’un champ obligatoire                                                       |
| Sessions             | - Affichage de la liste des sessions<br>- L’apparition des boutons Create et Detail si l’utilisateur connecté est un admin                  |
| Informations session | - Les informations de la session sont correctement affichées<br>- Le bouton Delete apparaît si l'utilisateur connecté est un admin          |
| Création session     | - La session est créée<br>- L’affichage d’erreur en l’absence d’un champ obligatoire                                                        |
| Suppression session  | - La session est correctement supprimée                                                                                                     |
| Modification session | - La session est modifiée<br>- L’affichage d’erreur en l’absence d’un champ obligatoire                                                     |
| Account              | - Affichage des informations de l’utilisateur                                                                                               |
| Logout               | - La déconnexion de l’utilisateur   

</details>

<details>
  <summary>Structure des tests unitaires et des tests de bout en bout</summary>
  

## Front
### Test unitaire

Pour les tests unitaires de la partie front du projet, j'ai opté pour `Jest` étant donné que le front a été développé sur Angular.

Jest est un framework de test JavaScript reconnu pour sa facilité d'utilisation et de configuration due à sa **simplicité d'exécution des tests** et des ses **fonctionnalités avancées**.

Puisque Angular a une architecture basée sur les composants où l'on retouve sa logique(ts), son template(html) et son style(scss), on retrouvera également le fichier de test(spec.ts) où l'on rédigera l'ensemble de nos tests unitaires liés au composant en question.

Taux de couverture des tests unitaires:

<img src='/ressources/images/unit-test-front-coverage.png' width='500'/>



### Test de bout en bout

Pour les tests de bout en bout, j'ai opté pour `Cypress` due à sa **stabilité et rapidité des tests** puisqu’il utilise une architecture unique qui s'exécute directement dans le navigateur, ce qui élimine les dépendances externes et les retards liés à l'interaction avec le navigateur, mais également à ses **possibiliés des tests** puisque comparé aux tests unitaires, Cypress prend en charge lors de ses tests les actions que peut effectuer un utilisateur.
Il peut prendre en compte plusieurs actions telles que les clics, les saisies de données, la validation des formulaires, etc.
Permettant donc d’effectuer des tests complets et réalistes.

L'ensemble des tests de bout en bout sont répertoriés sur le path suivant `front\cypress\e2e` traitant chacun des tests une fonctionnalité importante de l'application.

Taux de couverture des tests de bout en bout :

<img src='/ressources/images/unit-test-front-coverage.png' width='500'/>

  
## Back

Naviguez jusqu'au répertoire **back** et executez la commande sur votre terminal `mvn clean test`.
Cela créera un rapport statistique de l'ensemble des tests du back à l'aide de `Jacoco` dont vous retrouverez dans le dossier suivant `\back\target\site\jacoco\index.html`

Taux de couverture global des tests :

<img src='/ressources/images/e2e-global-back-coverage.png' width='500'/>

### Test unitaire

Pour les tests unitaires de la partie back du projet, j'ai opté pour `JUnit5` due à sa **compatibilité avec Java** puisque JUnit5 est spécifiquement conçu pour le langage de programmation Java, ce qui en fait un choix naturel pour les projets développés avec Spring Boot, ainsi pour ses **fonctionnalités avancées** et son **architecture modulaire** permettant donc de nombreuses possibilités de test.

En plus de `Mockito` en complément des tests unitaires de JUnit5 afin de pouvoir “mock” lors des tests, c'est-à-dire simuler un objet pour imiter un comportement d’un objet réel pour les besoins des tests.

Taux de couverture des tests unitaires:

<img src='/ressources/images/unit-test-back-coverage.png' width='500'/>

### Test de bout en bout

Pour les tests de bout en bout de la partie back du projet, tout comme pour les test unitaires, j'ai également opté pour `JUnit5` puisque l'essentiel des tests à effectuer concernait principalement les **Request Mapping** (POST, PUT, DELETE) sur l'ensemble des contrôleurs concernés en reproduisant le comportement d'un utilisateur.

Taux de couverture des tests de bout en bout :

<img src='/ressources/images/e2e-test-back-coverage.png' width='500'/>

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
| Jacoco     |          https://www.baeldung.com/jacoco            |

</details>
</details>

<details>
  <summary>English</summary>

# Yoga App project

As you can see, the project consists of a front-end and a back-end. This project was developed as part of a training program in which the front-end is provided to the student so that I develop the entire back-end and set up the connection between the front-end and the back-end.

The front-end is a project developed on Angular 14 and the back-end on Springboot 2.6.

## Where to start ?

For the back end of the project, you'll first need to run the following command `docker-compose up` at the project root to generate the database using docker.
Then import the **back-end** folder into your dedicated IDE (IntelliJ, Eclipse...), `build` and `run` the application.

Before `build` and `run` the application, please first set the **environment variables** in your IDE so that the application can interact with the **database** whose variables are located in the **application.properties** file (the values are set beforehand in the **docker-compose.yml**).

DB_USER=`oc_user`
DB_PASSWORD=`oc_pwd`

For the front-end part of the project, go to the **front-end** folder to generate the **node_module** by executing the following command `npm install`.
Once the installation is complete, run the command `npm start` to execute the application and navigate to the URL provided (the default URL is `http://localhost:4200/`).

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
  <summary>Testing plan</summary>

### Objectif : réaliser 80 % de couverture de test

| Fonctionnalités      | Exemples de tests à réaliser                                                                                                                |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Login                | - Login<br>- Error handling in case of wrong login / password<br>- Error display in case of missing mandatory field                         |
| Register             | - Account creation<br>- Error display when a mandatory field is missing                                                                     |
| Sessions             | - Session list display<br>- Create and Detail buttons appear if the logged-in user is an admin                                              |
| Session Information  | - Session information is correctly displayed<br>- Delete button appears if the logged-in user is an admin                                   |
| Create session       | - The session is created<br>- Error display in the absence of a mandatory field                                                             |
| Delete session       | - Session successfully deleted                                                                                                              |
| Update session       | - The session is modified<br>- Error display in the absence of a mandatory field                                                            |
| Account              | - User information display                                                                                                                  |
| Logout               | - User logout   

</details>

<details>
  <summary>Structure of unit tests and end-to-end tests</summary>
  

## Front
### Unit test

For unit tests on the front end of the project, I opted for `Jest`, given that the front end was developed on Angular.

Jest is a JavaScript testing framework renowned for its ease of use and configuration, thanks to its **simplicity of test execution** and **advanced features**.

Since Angular has a component-based architecture where we find its logic(ts), template(html) and style(scss), we'll also find the test file(spec.ts) where we'll write all our unit tests linked to the component in question.

Unit test coverage rate:

<img src='/ressources/images/unit-test-front-coverage.png' width='500'/>

### End-to-end test

For end-to-end testing, I opted for `Cypress` due to its **stability and speed of testing** since it uses a unique architecture that runs directly in the browser, eliminating external dependencies and delays related to browser interaction, but also to its **possibility of testing** since, compared to unit testing, Cypress takes into account the actions that a user can perform in its tests.
It can take multiple actions such as clicks, data entry, form validation, etc., enabling comprehensive and realistic testing.
Allowing you to carry out comprehensive and realistic tests.

All the end-to-end tests are listed on the following path `frontcypress\e2e`, each dealing with an important feature of the application.

End-to-end test coverage rate :

<img src='/ressources/images/unit-test-front-coverage.png' width='500'/>

## Back

Navigate to the **back** directory and run the terminal command `mvn clean test`.
This will create a statistical report of all the tests in the back using `Jacoco`, which you'll find in the following folder `/back/target/site/jacoco/index.html`.

Overall test coverage rate :

<img src='/ressources/images/e2e-global-back-coverage.png' width='500'/>

### Unit test

For the unit testing of the back end of the project, I opted for `JUnit5` due to its **compatibility with Java** since JUnit5 is specifically designed for the Java programming language, making it a natural choice for projects developed with Spring Boot, as well as for its **advanced features** and **modular architecture** thus enabling numerous testing possibilities.

In addition to `Mockito` as a complement to JUnit5's unit tests, in order to be able to "mock" during testing, it will simulate an object to mimic the behavior of a real object for testing purposes.

Unit test coverage rate:

<img src='/ressources/images/unit-test-back-coverage.png' width='500'/>

### End-to-end test

For the end-to-end testing of the back end, as for the unit tests, I also opted for `JUnit5`, since most of the tests to be carried out concerned **Request Mapping** (POST, PUT, DELETE) on all the controllers concerned, reproducing the behavior of a user.

End-to-end test coverage rate :

<img src='/ressources/images/e2e-test-back-coverage.png' width='500'/>

</details>
<details>
  <summary>The challenges of implementing unit testing and end-to-end testing</summary>

Since the front-end has already been covered in the training course, we'll concentrate on the back-end.

## Unit test

Unit tests focus on verifying the correct operation of individual parts of the application (e.g. displaying content if the user has administrator status). Unit tests can be functions, methods or classes. The challenges of unit testing are as follows:

- `Isolation and early error detection`: Unit testing allows you to isolate each unit of code to ensure that it functions correctly, independently of other parts of the system. This facilitates the detection and resolution of errors at an early stage of development.
- `Regression`: When new features are added or modifications are made, unit tests help to ensure that changes don't break existing functionality.
- `Additional documentation`: Unit tests also act as an additional source of documentation for understanding the code. They provide concrete examples of how the code is to be used and what the output expectations are. This is particularly useful for novice developers and new team members, making it easier to adapt to the project.

## End-to-end test

End-to-end testing, also known as functional testing, evaluates the behavior of an application as a whole, simulating user interactions through a pre-defined scenario. The challenges of end-to-end testing are as follows:

- `User flow validation`: End-to-end testing verifies that all parts of the application work together coherently to meet the user's needs. This ensures that the expected user flow is respected.
- `Detecting integration problems`: Integration errors between different parts of the application, such as communication between the front-end and back-end, can be detected by end-to-end testing.
- `User quality guarantee`: End-to-end testing is essential to ensure that the application functions correctly in an environment similar to that used by end-users. This helps guarantee a better user experience.
- `Identifying performance problems`: End-to-end testing can reveal performance and efficiency problems that are often not visible in unit tests.

## Summary

Unit tests concentrate on checking individual application functions, while end-to-end tests focus on validating the application as a whole. Both types of testing are essential to guarantee application quality, detect errors at different levels and offer greater confidence in the application's correct operation, particularly for large-scale projects.

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
| Jacoco     |          https://www.baeldung.com/jacoco            |

</details>
</details>