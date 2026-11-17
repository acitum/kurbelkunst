# KURBELKUNST – Winter Games

**Ride it. Draw it. Collect it.** Eine eigenständige React-Webseite für die GPS-Art-Challenge des Kurbel Kollektivs Wien.

## Was ist enthalten?

- Responsive Startseite mit dem offiziellen Waschbär-Logo, Vereinsfarben, Challenge-Erklärung und Social-Media-Links
- Navigation **Winter Games** und **Grande Finale**
- 14 Motivkarten mit Vorschaubild, Kilometern, Höhenmetern, 1–5 Schneeflocken und GPX-Download
- Filter für verfügbare Motive, Mini Art und Big Art
- Leaderboard mit Einzelwertung, Kilometern und Teams (über JSON gepflegt)
- Zwei bereits bereitgestellte, bereinigte GPX-Tracks inklusive grafischer Streckenvorschau
- Zwölf **ausdrücklich als Platzhalter** markierte Motive
- Kein Login, kein automatischer Upload, keine automatische Streckenvalidierung: siehe Abschnitt *Leaderboard-Ausbau*

## 1. Lokal starten – VS Code

1. [Node.js LTS](https://nodejs.org/) installieren (Node.js 20.19+ oder 22.12+ empfohlen).
2. ZIP entpacken und den Ordner in VS Code öffnen (**Datei → Ordner öffnen**).
3. VS-Code-Terminal öffnen (**Terminal → Neues Terminal**).
4. Diese Befehle ausführen:

```bash
npm install
npm run dev
```

5. Die im Terminal angezeigte Adresse öffnen, normalerweise `http://localhost:5173/`.
6. Zum Testen des Produktions-Builds:

```bash
npm run build
npm run preview
```

Die fertige Webseite liegt nach dem Build in `dist/`.

## 2. Neue Motive hinzufügen oder Platzhalter ersetzen

**Nur diese drei Dinge sind nötig:**

1. GPX-Datei nach `public/tracks/` kopieren, z. B. `herz.gpx`.
2. Vorschaubild nach `public/images/` kopieren, z. B. `herz.png`.
3. Den entsprechenden Eintrag in `public/motifs.json` bearbeiten.

Beispiel:

```json
{
  "id": "herz",
  "title": "Herzenssache",
  "subtitle": "Liebe geht durch die Pedale.",
  "distanceKm": 21.4,
  "elevationM": 105,
  "difficulty": 2,
  "image": "images/herz.png",
  "gpx": "tracks/herz.gpx",
  "status": "available",
  "category": "Mini Art"
}
```

Wichtig:
- `id` muss eindeutig sein; keine Umlaute oder Leerzeichen.
- `difficulty` ist eine ganze Zahl von **1 bis 5**; 5 = am schwierigsten.
- `status` = `available` aktiviert den Download; `soon` zeigt „Coming soon“.
- `distanceKm` und `elevationM` sind Zahlen, **keine Texte**.
- Dateipfade sind relativ zum Ordner `public/` (kein `/public/` im JSON).
- Die beiden enthaltenen Streckenlängen und Höhenmeter wurden aus den GPX-Daten errechnet. Die Schwierigkeitsgrade 4/5 sind **vorläufige redaktionelle Einschätzungen**, keine geprüfte Einstufung.
- Die restlichen zwölf Namen sind kreative Platzhalter. Bitte vor Veröffentlichung ersetzen.

**Achtung:** Wenn `status` auf `soon` steht, aber eine GPX-Datei im öffentlichen Ordner liegt, ist sie trotzdem über ihre URL abrufbar. Eine JSON-Sperre ist keine Zugangskontrolle.

## 3. Bestenliste bearbeiten

In `public/leaderboard.json` steht zunächst eine leere Rangliste:

```json
{
  "updated": "2026-12-01",
  "participants": [
    {"name":"Winterfuchs","completed":4,"km":87.5},
    {"name":"Kritzelbär","completed":2,"km":51.2}
  ],
  "teams": [
    {"name":"Team Waschbär","completed":6,"km":150.3}
  ]
}
```

Die Webseite sortiert automatisch nach Anzahl der Motive bzw. Kilometern. **Diese JSON-Werte sind redaktionell gepflegte Ergebnisse**, keine automatisch verifizierten Leistungen. Bitte nur öffentliche Anzeigenamen und aggregierte Ergebnisse veröffentlichen und vorher eine Einwilligung einholen.

## 4. Auf GitHub hochladen

Im VS-Code-Terminal:

```bash
git init
git add .
git commit -m "Initial Kurbelkunst Winter Games website"
git branch -M main
git remote add origin https://github.com/DEIN-NAME/DEIN-REPO.git
git push -u origin main
```

Vorher auf GitHub ein **leeres Repository** anlegen. `DEIN-NAME` und `DEIN-REPO` ersetzen. Alternativ in VS Code links auf „Quellcodeverwaltung“ → „Auf GitHub veröffentlichen“ klicken. Bei späteren Änderungen:

```bash
git add .
git commit -m "Add new GPS art motif"
git push
```

## 5. Hosting-Empfehlung

**Für diese statische Version: Cloudflare Pages oder Netlify.** Beide können ein GitHub-Repository verbinden und nach jedem Push automatisch neu bauen. Prüfe die jeweils aktuellen Nutzungsbedingungen und Limits.

### Cloudflare Pages (empfohlen)

1. Konto bei [Cloudflare](https://pages.cloudflare.com/) anlegen.
2. **Workers & Pages → Create → Pages → Connect to Git** wählen (Bezeichnungen können sich ändern).
3. GitHub-Repository auswählen.
4. Build command: `npm run build`.
5. Build output directory: `dist`.
6. Deploy starten. Du erhältst eine `*.pages.dev`-Adresse.
7. Optional eigene Domain verbinden.

Das Projekt verwendet `base: './'` und funktioniert bei üblichem Root-Hosting. Die Navigation nutzt keine serverseitigen Unterseiten, sodass keine Rewrite-Regel erforderlich ist.

**Alternative:** Netlify, Build `npm run build`, Publish directory `dist`.

### Wichtig zum Datenschutz und zum Routenschutz

- Die Seite hat derzeit **keine Benutzeranmeldung**.
- Alle Dateien in `public/tracks/` sind nach Veröffentlichung **öffentlich abrufbar**. Auch ein nicht verlinkter GPX-Track ist nicht geschützt.
- Die gelieferten zwei GPX-Dateien wurden aus den bereitgestellten Tracks erzeugt, wobei persönliche GPX-Metadaten und Zeitstempel entfernt wurden. Die Koordinaten selbst bleiben erhalten und können sensible Start-/Zielpunkte enthalten. **Vor Veröffentlichung Strecken auf private Orte und Befahrbarkeit prüfen.**
- Falls Tracks exklusiv für angemeldete Teilnehmer:innen sein sollen, müssen sie **aus `public/` entfernt** und in einem privaten Storage (z. B. Supabase Storage) mit serverseitiger Berechtigungsprüfung bereitgestellt werden.
- Für einen öffentlichen Uploadbereich braucht ihr eine Datenschutzerklärung, Aufbewahrungs- und Löschregeln, Missbrauchsschutz sowie eine verantwortliche Kontaktstelle.

## 6. Wie wird daraus eine echte Challenge mit Upload und Leaderboard?

Empfohlene Ausbaustufen:

**Stufe 1 (enthalten):** Statische Webseite + GPX-Downloads + redaktionell gepflegte Bestenliste. Ergebnisse werden z. B. über ein externes Formular gesammelt, manuell geprüft und in `leaderboard.json` übertragen. Keine Datenbankkosten, keine automatischen Benutzerkonten.

**Stufe 2:** Supabase Auth + private Buckets für GPX-Dateien und Uploads + Datenbanktabellen `participants`, `teams`, `motifs`, `submissions`, `completions`. Einreichungen werden über einen authentifizierten Upload an private Storage-Buckets gespeichert. Admins bestätigen Einreichungen. Nur freigegebene Ergebnisse werden öffentlich angezeigt.

**Stufe 3:** Serverseitige GPX-Streckenprüfung (z. B. Python/FastAPI oder Edge Function) mit Track-Nähe, Abdeckung, Zeit- und Duplikatprüfungen. GPS-Abweichungen und problematische Einreichungen werden manuell geprüft. GPX-Dateien sind nicht fälschungssicher. Original-Uploads werden nach einer definierten Frist gelöscht.

**Strava:** Hashtags oder Clubmitgliedschaft allein sind keine zuverlässige Grundlage für automatische Wertung. Eine Strava-OAuth-Anbindung erfordert individuelle Autorisierung, API-Freigaben, Datenschutzprüfung und Beachtung der aktuellen API-Bedingungen. Komoot-Aktivitäten können alternativ per GPX eingereicht werden.

### Vorschlag für die Wertungsregeln

- **Art Collector:** 1 Punkt je *unterschiedlichem*, anerkanntem Motiv (maximal 14).
- **Kilometerwertung:** Summe der anerkannten Challenge-Aktivitäten; keine Doppelzählung desselben Tracks.
- **Teamwertung:** Jedes Motiv zählt pro Team einmal, sobald ein Teammitglied es absolviert hat. Teamgrößen vor Start festlegen, um Fairness zu sichern.
- **Privatsphäre:** Öffentliche Bestenliste nur mit freiwillig gewähltem Anzeigenamen; keine Roh-GPS-Daten oder privaten Wohnorte veröffentlichen.

## 7. Projektstruktur

```text
kurbelkunst-winter-games/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── motifs.json             ← hier neue Motive pflegen
│   ├── leaderboard.json        ← hier Ergebnisse pflegen
│   ├── images/                 ← Logo + Motivvorschauen
│   └── tracks/                 ← öffentlich herunterladbare GPX
├── src/
│   ├── main.jsx                ← React-Komponenten
│   └── styles.css              ← Design und Farben
└── README.md
```

## 8. Vor dem offiziellen Start prüfen

- [ ] Alle 14 Motive, Angaben und Vorschaubilder sind final.
- [ ] Strecken sind sicher, legal befahrbar und getestet.
- [ ] Offizielle Vereinsfarben und finales Logo sind bestätigt.
- [ ] Datum, Regeln, Verantwortliche und Kontaktmöglichkeit sind festgelegt.
- [ ] Impressum/Anbieterinformationen und Datenschutzhinweise sind entsprechend dem tatsächlichen Betrieb ergänzt.
- [ ] Entscheiden, ob GPX-Downloads wirklich öffentlich sein sollen.
- [ ] Falls Bestenliste öffentlich: Einwilligung und Überprüfungsprozess festlegen.
- [ ] URL der offiziellen Vereinswebseite ergänzen (aktuell noch nicht bekannt).

## Pflegeaufwand

Bei einer neuen Zeichnung: Bild + GPX ablegen, JSON-Eintrag aktualisieren, `git push` – die Hosting-Plattform veröffentlicht die Änderung automatisch. Keine Datenbankadministration für die statische Version nötig.
