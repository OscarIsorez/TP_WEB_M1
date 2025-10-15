## INSTALLATION ET LANCEMENT
dans un bash:

cd TP_WEB_M1/pokedemo/pokedemo\ \(Copie\)/
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

