# API de Confessions Anonymes

Une API RESTful permettant aux utilisateurs de partager des confessions anonymes et de recevoir des réponses.

Projet by : Mayssa Hamdaoui, Antonin Merlo-Meyffren

## Fonctionnalités

- Création de confessions anonymes
- Système de tags pour catégoriser les confessions
- Niveau d'intensité pour chaque confession (1-10)
- Système de réponses anonymes
- Interface avec un psy fictif
- Documentation API avec Swagger
- Gestion complète des réponses (création, mise à jour, suppression)
- Tags prédéfinis pour une meilleure catégorisation
- Système de validation des données
- Gestion des erreurs détaillée en mode développement

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v8.0 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/Arustat/CodingGame-API.git
cd CodingGame-API
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=confessions_db
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
```

4. Initialiser la base de données :
```bash
npm run init-db
```

5. Démarrer le serveur :
```bash
# Mode développement avec rechargement automatique
npm run dev

# Mode production
npm start
```

## Documentation API

La documentation complète de l'API est disponible via Swagger UI à l'adresse :
```
http://localhost:3000/api-docs
```

## Structure de l'API

### Confessions
- `POST /api/confessions` - Créer une nouvelle confession
- `GET /api/confessions` - Lister toutes les confessions
- `GET /api/confessions/:id` - Obtenir une confession spécifique
- `PUT /api/confessions/:id` - Mettre à jour une confession
- `DELETE /api/confessions/:id` - Supprimer une confession

### Réponses
- `POST /api/confessions/:id/responses` - Ajouter une réponse à une confession
- `GET /api/confessions/:id/responses` - Obtenir toutes les réponses d'une confession
- `PUT /api/responses/:id` - Mettre à jour une réponse
- `DELETE /api/responses/:id` - Supprimer une réponse

### Tags
- `GET /api/tags` - Lister tous les tags disponibles

## Tags Prédéfinis

L'API inclut un ensemble de tags prédéfinis pour faciliter la catégorisation des confessions :
- culpabilité
- honte
- peur
- colère
- tristesse
- joie
- amour
- haine
- mensonge
- trahison
- jalousie
- envie
- doute
- confiance
- espoir

## Exemple d'utilisation

### Créer une confession
```bash
curl -X POST http://localhost:3000/api/confessions \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Ma confession...",
    "intensity": 7,
    "tags": ["trahison", "amour"]
  }'
```

### Ajouter une réponse
```bash
curl -X POST http://localhost:3000/api/confessions/1/responses \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Ma réponse...",
    "is_psychologist": false
  }'
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT

