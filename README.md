<h1 align="center">NestJs cours</h1>
## Installation

Pour installer les dépendances, exécutez la commande suivante :

```bash
npm install
```

## Lancer l'application

Après avoir démarré Docker, vous pouvez lancer l'application avec :
```bash
docker compose up -d
```
puis, pour lancer le serveur en mode développement, utilisez la commande suivante :
```bash
npm run start:dev
```



exemple .env
```env
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE=backend_db

DB_SSL=false
DB_SYNCHRONIZE=true
DB_LOGGING=false


MAIL_PASSWORD=Azerty.1234
MAIL_USER=mail@example.com
MAIL_HOST=smtp.ionos.fr
```