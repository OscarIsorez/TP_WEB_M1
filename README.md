## INSTALLATION ET LANCEMENT
dans un bash:

git clone https://github.com/OscarIsorez/TP_WEB_M1.git

cd TP_WEB_M1/

git checkout TP0

cd pokedemo

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

executer les commandes : 

export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install 22

npm install -g @angular/cli

npm install

ng serve

choisir no

ouvrir le port local indiqué

# Explications 

Nous avons suivi les étapes du TP une par une pour créer une application Web Angular permettant d'afficher les caracteristiques des pokemon de base via une recherche avec un identifiant ou un nom. Pour cela, l'api pokeAPI a été utilisée. Nous avons appris comment Angular générait un cadre de développement fixe en séparant les responsabilités du code. Nous avons utilisé ces principes pour créer cette application. Nous avons implémenté plusieurs composants en commençant pour un "my-component" gérer les entrées utilisateur, ainsi que la fonctionnalité de recherche. Cette fonctionnalité a necéssité l'utilisation d'un pipe Angular. Nous avons suivi la doc en ligne pour implémenter cet outil. Nous avons ensuite implémenté un service pour gérer les accès externes de notre application à pokeAPI. Grâce à Angular, nous avons pu créer une application fractionnée en composants pour réduire les dépendances entre les parties du code. Nous avons de plus ajouté un composant externe "toggle" pour comprendre comment utiliser les différents composants créés par la communauté Angular. Cette expérience nous a fait comprendre l'étendu des possilbles, étant donné la richesse de l'écosystème Angular.

# Question 3 bis : Expliquer pourquoi il devient difficile de faire une attaque XSS sur une application angular

Angular protège contre les XSS par défaut en considérant toutes les données comme potentiellement dangereuses.

Quand on affiche une variable avec {{ maVariable }}, Angular supprime automatiquement les caractères spéciaux. Si un attaquant injecte <script>alert('hack')</script>, ça s'affiche comme du texte brut au lieu de s'exécuter.

Si on utilise [innerHTML] pour insérer du HTML, Angular nettoie le contenu avant de l'afficher. Les balises dangereuses comme <script> </script> sont automatiquement retirées.

Pour les URLs, Angular détecte les liens louches type javascript:alert('xss') et les bloque ou les préfixe avec "unsafe:" pour empêcher leur exécution.

Si on veut vraiment afficher du HTML non filtré, il faut utiliser explicitement DomSanitizer.bypassSecurityTrustHtml(). C'est fait exprès pour que le développeur soit conscient qu'il désactive une protection.

En gros, Angular force les bonnes pratiques : tout est sécurisé par défaut, et il faut faire un effort pour contourner les protections. Ça réduit énormément les risques d'XSS accidentelles.
