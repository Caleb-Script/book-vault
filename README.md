
# BookVault - Moderne Buchverwaltung

[![CI/CD](https://img.shields.io/github/workflow/status/<username>/BookVault/CI?label=CI/CD)](https://github.com/<username>/BookVault/actions)  
[![License](https://img.shields.io/github/license/<username>/BookVault)](https://opensource.org/licenses/MIT)

**BookVault** ist eine moderne Single Page Application (SPA) zur effizienten Verwaltung von Büchern. Diese Anwendung ermöglicht es Nutzern, ihre Buchsammlung zu suchen, anzuzeigen, hinzuzufügen und zu verwalten. Sie wurde mit **React**, **Vite**, **Chakra UI**, und **React Icons** entwickelt und kommuniziert über eine **GraphQL-API** mit dem Backend. 

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