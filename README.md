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


