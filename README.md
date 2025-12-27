# Pokedemo - Application Pokemon avec Tests

Application Angular 20 permettant de consulter des informations sur les Pokemon via l'API PokeAPI.

## Prérequis

- Node.js : version 18 ou supérieure
- npm : version 9 ou supérieure
- Angular CLI : version 20.3.3

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/OscarIsorez/TP_WEB_M1.git
cd TP_WEB_M1
```

2. Installer les dépendances du dossier racine :
```bash
npm install
```

3. Installer les dépendances du projet Angular :
```bash
cd pokedemo
npm install
```

4. Installer Cypress (tests E2E) :
```bash
npm install cypress --save-dev --legacy-peer-deps
```

Note : Le flag `--legacy-peer-deps` est nécessaire pour résoudre les conflits de dépendances entre jest-preset-angular et Angular 20.

## Lancer l'application

Depuis le dossier `pokedemo` :

```bash
npm start
```

L'application sera accessible sur http://localhost:4200/

## Tests Unitaires (Jest)

### Lancer les tests depuis la racine du projet

```bash
cd TP_WEB_M1
npm run test:coverage
```

### Résultats attendus
- 38 tests qui passent
- 100% de coverage sur statements, functions et lines
- 84.61% de coverage sur branches

### Fichiers de tests
- `pokedemo/src/app/**/*.spec.ts` : Tests unitaires avec Jest
- Approche : Shallow testing avec mocks Jest
- Tous les composants, services et pipes sont testés

## Tests E2E (Cypress)

### Prérequis : L'application doit tourner

1. Dans un terminal, démarrer l'application :
```bash
cd pokedemo
npm start
```

2. Dans un autre terminal, lancer Cypress :
```bash
cd pokedemo
npx cypress open
```

3. Dans l'interface Cypress :
   - Sélectionner "E2E Testing"
   - Choisir un navigateur (Chrome recommandé)
   - Cliquer sur le fichier pokemon.cy.ts

### Scénarios testés
- Affichage du titre de l'application
- Chargement de la liste des Pokemon
- Sélection d'un Pokemon
- Filtrage de la liste par nom
- Affichage des détails et de l'image du Pokemon

# Explications 

Nous avons suivi les étapes du TP une par une pour créer une application Web Angular permettant d'afficher les caracteristiques des pokemon de base via une recherche avec un identifiant ou un nom. Pour cela, l'api pokeAPI a été utilisée. Nous avons appris comment Angular générait un cadre de développement fixe en séparant les responsabilités du code. Nous avons utilisé ces principes pour créer cette application. Nous avons implémenté plusieurs composants en commençant pour un "my-component" gérer les entrées utilisateur, ainsi que la fonctionnalité de recherche. Cette fonctionnalité a necéssité l'utilisation d'un pipe Angular. Nous avons suivi la doc en ligne pour implémenter cet outil. Nous avons ensuite implémenté un service pour gérer les accès externes de notre application à pokeAPI. Grâce à Angular, nous avons pu créer une application fractionnée en composants pour réduire les dépendances entre les parties du code. Nous avons de plus ajouté un composant externe "toggle" pour comprendre comment utiliser les différents composants créés par la communauté Angular. Cette expérience nous a fait comprendre l'étendu des possilbles, étant donné la richesse de l'écosystème Angular.

# Question 3 bis : Expliquer pourquoi il devient difficile de faire une attaque XSS sur une application angular

Angular protège contre les XSS par défaut en considérant toutes les données comme potentiellement dangereuses.

Quand on affiche une variable avec {{ maVariable }}, Angular supprime automatiquement les caractères spéciaux. Si un attaquant injecte <script>alert('hack')</script>, ça s'affiche comme du texte brut au lieu de s'exécuter.

Si on utilise [innerHTML] pour insérer du HTML, Angular nettoie le contenu avant de l'afficher. Les balises dangereuses comme <script> </script> sont automatiquement retirées.

Pour les URLs, Angular détecte les liens louches type javascript:alert('xss') et les bloque ou les préfixe avec "unsafe:" pour empêcher leur exécution.

Si on veut vraiment afficher du HTML non filtré, il faut utiliser explicitement DomSanitizer.bypassSecurityTrustHtml(). C'est fait exprès pour que le développeur soit conscient qu'il désactive une protection.

En gros, Angular force les bonnes pratiques : tout est sécurisé par défaut, et il faut faire un effort pour contourner les protections. Ça réduit énormément les risques d'XSS accidentelles.

