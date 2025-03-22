# Yoga App

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Java 17
- Maven
- Node.js
- Angular CLI
- MySQL (version 5.7 ou supérieure)

## Installation

### Base de données

1. Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine
2. La base de données sera créée automatiquement au démarrage de l'application
3. Créez un fichier `secrets.properties` dans le dossier `back/src/main/resources/` avec le contenu suivant :
```properties
mysql-root-pass=votre_mot_de_passe_mysql
jwt-secret-pass=votre_clé_secrète_jwt
```
4. Pour initialiser la base de données avec des données de test, vous pouvez exécuter le script SQL fourni :
```bash
# Se connecter à MySQL et exécuter le script
mysql -u root -p < ressources/sql/script.sql
```
Ce script créera :
- Les tables nécessaires (TEACHERS, SESSIONS, USERS, PARTICIPATE)
- Des données de test incluant :
  - Deux professeurs de yoga
  - Un compte administrateur (email: yoga@studio.com)

### Backend (Spring Boot)

```bash
# Cloner le projet
git clone https://github.com/AntoineCheminPro/Openclassroom-tests

# Accéder au dossier backend
cd back

# Installer les dépendances
mvn clean install
```

### Frontend (Angular)

```bash
# Accéder au dossier frontend
cd front

# Installer les dépendances
npm install
```



## Lancement de l'application

### Backend

```bash
# Dans le dossier back
mvn spring-boot:run
```
Le serveur démarre sur `http://localhost:8080`

### Frontend

```bash
# Dans le dossier front
ng serve
```
L'application est accessible sur `http://localhost:4200`

## Tests

### Tests Unitaires Backend

```bash
# Dans le dossier back
mvn test
```

### Tests Unitaires Frontend

```bash
# Dans le dossier front
npm run test

# Dans le dossier front avec rapport de couverture
npm run test:coverage
```

### Tests d'Intégration Backend

```bash
# Dans le dossier back
mvn test -Dtest=*IT
```

### Tests End-to-End (Cypress)

```bash
# Dans le dossier front
# Lancer d'abord le serveur backend et frontend
npm run e2e:coverage
```

## Couverture de Code

### Frontend
- Les rapports de couverture Jest sont générés dans `front/coverage/jest/lcov-report/index.html`
- Les rapports de couverture Cypress sont générés dans `/front/coverage/lcov-report/index.html`

### Backend
- Les rapports de couverture sont générés dans `back/target/site/jacoco/`
