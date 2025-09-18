# 📅 LifeCalendar — Vue 3 / TailwindCSS

La version en ligne des disponible sur [lifecalendar.leonardocm.fr](https://lifecalendar.leonardocm.fr)

Un outil de visualisation de vie sous forme de **calendrier existentiel**, basé sur l’idée des **semaines vécues**.  
Chaque carré représente une semaine de vie : explorez et prenez du recul sur le temps qui passe.

## 💀 Memento Mori

Le concept de memento mori vient du latin et signifie « souviens-toi que tu vas mourir ».
Il s’agit d’un rappel philosophique et spirituel de la finitude de la vie humaine.
Dans l’histoire, on le retrouve dans l’art, la religion et la philosophie comme une invitation à :

prendre conscience du temps limité qui nous est offert,

vivre chaque instant avec intensité,

donner du sens à nos actions quotidiennes.

Un memento mori n’est pas une pensée morbide, mais un outil de sagesse et de lucidité : en gardant à l’esprit la mort, nous apprenons à mieux apprécier la vie.

## 🎮 Fonctionnalités

- 📊 Visualisation des **semaines vécues** et **restantes**
- ⏱ Affichage en temps réel de l’**âge exact** (années, mois, jours, heures, minutes, secondes)
- 🌙 **Mode sombre** natif avec TailwindCSS
- ⚡ Design minimaliste et réactif
- 🖱 Interface simple : juste ouvrir et explorer

## 🚀 Lancer le projet en local

1. Clone (ou télécharge) le projet :

```bash
git clone https://github.com/leonardo-correiamendes/lifeCalendar.git
```

2. Installe les dépendances :

```bash
cd life-calendar
npm install
```

3. Lance le serveur de développement :

```bash
npm run dev
```

4. Ouvre le lien local (souvent http://localhost:5173)

## 🛠️ Technologies utilisées

- Vue 3 (Composition API)
- Vite
- TailwindCSS (dark mode, responsive)
- JavaScript (computed, reactive states)

## 📂 Structure du projet

```
LifeCalendar/
│
├── index.html              # Entrée principale
├── vite.config.js          # Config Vite
├── src/
│   ├── App.vue             # Composant racine
│   ├── main.ts             
│   ├── components/         # Composants (Age, Grille…)
|   ├── composables/        # Composables (useNow, useDark...)
│   └── assets/             # Images, icônes
└── tailwind.config.js      # Config Tailwind
```

## 🎯 Interactions

- Horloge : secondes, minutes et heures **s’actualisent en direct**
- Mode clair/sombre basé sur les préférences système
- Grille interactive des semaines vécues

## 🧩 Points clés d’implémentation

- ⚡ Utilisation de `computed()` pour l’**âge exact**
- ⏱ Mise à jour en temps réel avec `setInterval`
- 🎨 Couleurs basées sur une **palette gris/teal**
- 📐 Grille générée dynamiquement (90 ans = 4680 semaines)

## ✨ Idées d’amélioration

- 📅 Export en **PDF / image**
- 📲 Version mobile dédiée (PWA)
- 🔔 Rappels personnalisés
- 🎨 Thèmes colorés (au choix de l’utilisateur)

## 👤 Auteur

- **Leonardo Correia Mendes**  
- Étudiant en informatique (BUT Informatique)
