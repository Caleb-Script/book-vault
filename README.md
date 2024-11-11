# BookVault - Moderne Buchverwaltung

[![CI/CD](https://img.shields.io/github/workflow/status/Caleb-Script/BookVault/CI?label=CI/CD)](https://github.com/caleb-script/BookVault/actions)  

**BookVault** ist eine moderne Single Page Application (SPA) zur effizienten Verwaltung von Büchern. Diese Anwendung ermöglicht es Nutzern, ihre Buchsammlung zu suchen, anzuzeigen, hinzuzufügen und zu verwalten. Sie wurde mit **React**, **Vite**, **Chakra UI**, und **React Icons** entwickelt und kommuniziert über eine **GraphQL-API** mit dem Backend. 

## 📑 Inhaltsverzeichnis

- [Features](#-features)
- [Technologie-Stack](#-technologie-stack)
- [Installation und Setup](#-installation-und-setup)
  - [Voraussetzungen](#1-voraussetzungen)
  - [Backend Setup](#2-backend-setup)
  - [Frontend Setup](#3-frontend-setup)
- [Live Demo](#-live-demo)
- [Mitwirken](#-mitwirken)
- [Lizenz](#-lizenz)
- [Dokumentation](#-dokumentation)
- [Team](#-team)
- [Commit-Nachrichten Konventionen](#commit-nachrichten-konventionen)

## 🚀 Features

- **Login-System**: Benutzeranmeldung mit umfassendem Fehlerhandling.
- **Suchformular**: Präzise Buchsuche mit Textfeldern, Dropdowns, Radiobuttons und Checkboxen.
- **Suchergebnisse**: Darstellung von Suchergebnissen inklusive Fehlerbehandlung, falls keine Treffer gefunden werden.
- **Detailansicht**: Detaillierte Informationen zu jedem Buch (Titel, Autor, Jahr, Beschreibung).
- **Buch hinzuzufügen**: Möglichkeit, neue Bücher mit Validierung hinzuzufügen.
- **Routing**: Navigation zwischen verschiedenen Seiten der Anwendung für ein optimiertes Benutzererlebnis.
- **REST/GraphQL-Client**: Flexibler Austausch von Daten zwischen Frontend und Backend.

## 🧰 Technologie-Stack

- **Frontend**: 
  - **React**: Für den Aufbau einer interaktiven und schnellen Benutzeroberfläche.
  - **Vite**: Build-Tool für schnelle Entwicklung und optimierte Produktions-Bundles.
  - **Chakra UI**: Für eine zugängliche und anpassbare UI-Komponentenbibliothek.
  - **React Icons**: Um gängige Icons einfach in der UI darzustellen.

- **Backend**:
  - **GraphQL**: API zum Abrufen und Verwalten von Daten aus dem Backend.
  - **Docker**: Containerisierung des Backend-Services für konsistente Umgebungen.

- **Codequalität und Tools**:
  - **ESLint**: Für die Sicherstellung von Codequalität.
  - **Prettier**: Für einheitliches Code-Format.
  - **SonarQube / SonarCloud**: Für kontinuierliche Codeanalyse und Qualitätsmanagement.
  - **GitHub Actions**: CI/CD-Pipeline zur Automatisierung von Tests und Deployments.

## 📖 Installation und Setup

### 1. **Voraussetzungen**

- [Docker](https://www.docker.com/) für das Backend
- [Node.js](https://nodejs.org/) (Version 16 oder höher)
- [Git](https://git-scm.com/)

### 2. **Backend Setup**

1. Klone das Repository:
   ```bash
   git clone https://github.com/<username>/BookVault.git
   cd BookVault
   ```

2. Starte das Backend mit Docker:
   ```bash
   docker-compose up
   ```

### 3. **Frontend Setup**

1. Installiere die benötigten Abhängigkeiten:
   ```bash
   npm install
   ```

2. Starte die Anwendung im Entwicklermodus:
   ```bash
   npm run dev
   ```

Die Anwendung sollte nun unter [http://localhost:3000](http://localhost:3000) erreichbar sein.

## 🌐 Live Demo

Für eine Live-Demo der Anwendung besuche:  
[https://bookvault-demo.com](https://bookvault-demo.com)

## 🧑‍🤝‍🧑 Mitwirken

Beiträge sind herzlich willkommen! Bitte folge diesen Schritten:

1. Forke das Repository.
2. Erstelle einen Branch für deine Änderungen:
   ```bash
   git checkout -b feature/feature-name
   ```
3. Mache deine Änderungen und committe sie:
   ```bash
   git commit -m "Beschreibung der Änderungen"
   ```
4. Push deinen Branch:
   ```bash
   git push origin feature/feature-name
   ```
5. Öffne einen Pull Request (PR).

## ⚖️ Lizenz

Dieses Projekt ist unter der **MIT-Lizenz** lizenziert. Siehe die [LICENSE](./LICENSE) Datei für weitere Details.

## 📑 Dokumentation

Weitere Informationen zur Nutzung und Entwicklung findest du in unserer [Dokumentation](./docs).

## 👨‍💻 Team

- **Caleb** – Projektleitung, Frontend-Entwicklung
- **Alicia** – Backend-Entwicklung, API-Design
- **Benjamin** – Frontend-Entwicklung, UI-Design
- **Jasin** – Testing, Qualitätssicherung

## Commit-Nachrichten Konventionen

Um ein konsistentes Commit-Protokoll zu gewährleisten, bitten wir alle Teammitglieder, die **Conventional Commits**-Konventionen zu befolgen. Hier sind die wichtigsten Typen und deren Verwendung:

### Commit-Typen

- **`feat`**: Ein neues Feature oder eine Erweiterung der Funktionalität.
  - Beispiel: `feat(auth): add user authentication`
  
- **`fix`**: Eine Fehlerbehebung.
  - Beispiel: `fix(login): resolve bug with password validation`
  
- **`chore`**: Änderungen an der Infrastruktur oder Konfiguration, die keine funktionalen Änderungen beinhalten.
  - Beispiel: `chore: update package-lock.json`
  
- **`docs`**: Änderungen an der Dokumentation (z.B. README, Kommentare).
  - Beispiel: `docs(readme): improve setup instructions`
  
- **`style`**: Änderungen am Code-Stil (z.B. Einrückungen, Formatierungen), die keine funktionalen Änderungen bewirken.
  - Beispiel: `style: fix indentation in main.js`
  
- **`refactor`**: Code-Refactoring ohne neue Funktionalität oder Fehlerbehebung.
  - Beispiel: `refactor(auth): simplify login logic`
  
- **`perf`**: Leistungsverbesserungen.
  - Beispiel: `perf(api): optimize user data processing`
  
- **`test`**: Änderungen an Tests (z.B. neue Tests oder Tests verbessern).
  - Beispiel: `test(auth): add unit tests for login function`
  
- **`build`**: Änderungen am Build-Prozess (z.B. Build-Tools oder Deployment-Skripte).
  - Beispiel: `build: add webpack configuration`
  
- **`ci`**: Änderungen an der CI/CD-Konfiguration (z.B. GitHub Actions oder Jenkins-Pipelines).
  - Beispiel: `ci: add GitHub Actions workflow for testing`
  
- **`revert`**: Rückgängig machen eines früheren Commits.
  - Beispiel: `revert: revert "feat(auth): add login functionality"`
  
- **`release`**: Versionsmarkierung für die Veröffentlichung eines Releases.
  - Beispiel: `release: v1.0.0`

### Formatierung

Die Commit-Nachricht sollte das folgende Format haben:
`<type>: <subject>`

- **`type`**: Der Typ der Änderung (z.B. `feat`, `fix`, `chore`).
- **`subject`**: Eine kurze und prägnante Beschreibung der Änderung, die im **Präsens** verfasst sein sollte und mit einem Kleinbuchstaben beginnt. Vermeide Punkte am Ende.

### Beispiel:

```bash
git commit -m "feat(api): add user authentication"
```

## Zusätzliche Hinweise
- Vermeide leere Commit-Nachrichten – Stelle sicher, dass die Nachricht sinnvoll und aussagekräftig ist.
- Keine zu allgemeinen Nachrichten wie "update" oder "change".
- Verwende den richtigen Typ: Wähle den passenden Typ für deine Änderung.
- Länge der Nachricht: Halte den Betreff der Nachricht unter 72 Zeichen, um eine gute Lesbarkeit in der Git-Historie zu gewährleisten.

Indem wir diese Konventionen einhalten, stellen wir sicher, dass die Git-Historie konsistent und leicht nachvollziehbar bleibt.
