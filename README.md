## INSTALLATION ET LANCEMENT
dans un bash:

cd TP_WEB_M1/pokedemo/pokedemo

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

Nous avons suivi les étapes du TP une par une pour créer une application Web Angular permettant d'afficher les caracteristiques des pokemon de base via une recherche avec un identifiant ou un nom. Pour cela, l'api pokeAPI a été utilisée. Nous avons appris comment Angular générait un cadre de développement fixe en séparant les responsabilités du code. Nous avons utilisé ces principes


