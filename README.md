# Crypto Analyzer - Service de Stockage

## 💾 Vue d'ensemble

Service de stockage MongoDB pour l'application Crypto Analyzer. Gère le stockage persistant des actualités cryptomonnaies et des analyses.

## 📊 Structure des Données

### Collection `searchresults`
```json
{
  "keyword": "bitcoin",
  "title": "Titre de l'article",
  "url": "https://...",
  "sentiment": "positive|negative|neutral",
  "createdAt": "2024-06-29T14:55:03.690Z"
}
```

### Collection `analysis`
```json
{
  "cryptocurrency": "bitcoin",
  "sentiment": "positive",
  "confidence": 0.72,
  "recommendation": "buy",
  "createdAt": "2024-06-29T14:55:03.690Z"
}
```

## 🛠️ Technologies

- MongoDB
- Docker
- Node.js (pour les scripts utilitaires)

## ⚙️ Configuration

### Variables d'Environnement
```env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
```

### Ports
- 27017 : MongoDB

## 🚀 Installation

1. Cloner le repo :
```bash
git clone [URL_DU_REPO]
cd crypto-analyzer-news-store
```

2. Lancer avec Docker :
```bash
docker-compose up -d
```

## 🔄 Intégration

Ce service est utilisé par :
- `crypto-analyzer-news-scraper` : Stockage des actualités
- `crypto-analyzer-analysis` : Lecture des actualités et stockage des analyses

## 💾 Sauvegarde

Les données sont persistées dans un volume Docker :
```yaml
volumes:
  mongodb_data:
    external: true
```

## 🔒 Sécurité

- Authentification MongoDB activée
- Accès réseau limité aux services autorisés
- Données persistées dans un volume sécurisé

## 📊 Monitoring

- Taille des collections
- Performances des requêtes
- Espace disque utilisé
- État des connexions

## 🛠️ Maintenance

### Nettoyage des Données
Les données sont conservées pendant 30 jours par défaut.

### Indexation
```javascript
db.searchresults.createIndex({ keyword: 1, createdAt: -1 })
db.searchresults.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 })
``` 