# Yoga App

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Java 17
- Maven
- Node.js
- Angular CLI

## Installation

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
- Les rapports de couverture Jest sont générés dans `front/coverage/`
- Les rapports de couverture Cypress sont générés dans `front/coverage/cypress/`

### Backend
- Les rapports de couverture sont générés dans `back/target/site/jacoco/`
