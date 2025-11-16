# PGMon+ Dokumentation & Anleitung - Review

**Review Datum:** 5. Oktober 2025  
**Geprüfte Materialien:** Wiki-Anleitungen + Frontend-Template  
**Kontext:** Lernprojekt für Vue 3 mit 6 Einheiten (Inverted Classroom)

::: info
**About This Review**  
AI analysis of teaching materials (wiki guides + template) created 2018-2024 for FH St. Pölten.  
Reviews alignment between documentation, template code, and actual project state across Vue 1→2→3 evolution.  
Value: Shows the gap between teaching docs and reality, common documentation drift in educational projects.
:::

## 🎯 Executive Summary

Die **Wiki-Anleitungen** sind **hervorragend strukturiert** und bieten eine **didaktisch wertvolle** Einführung in Vue 3. Allerdings gibt es **erhebliche Diskrepanzen** zwischen Anleitung und aktuellem Code-Stand, die **zwingend korrigiert** werden müssen, bevor das Projekt als öffentliche Lernressource dienen kann.

**Bewertung als Lernanleitung: 7.5/10** 🟡


## ✅ Stärken der Dokumentation

### 🎓 **Didaktischer Aufbau**

1. **Exzellente Struktur (Inverted Classroom)**
   ```
   Jede Einheit:
   - Vorbereitung (Selbststudium)
   - Übung (Präsenz)
   - Klare Lernziele
   - Dev Diary für Reflexion
   ```
   ✅ Sehr guter pädagogischer Ansatz!

2. **Progressiver Schwierigkeitsgrad**
   - Einheit 1: Components & Props (Basics)
   - Einheit 2: API Integration & Maps
   - Einheit 3: Forms & Validation
   - Einheit 4: State Management (Pinia)
   - Einheit 5: Persistence (localStorage)
   - Einheit 6: Dynamic Styling (Day/Night)
   
   ✅ Logische Progression!

3. **Gute Ressourcen-Verlinkung**
   - Vue Guide Kapitel passend zur Einheit
   - Externe Tools & Libraries gut dokumentiert
   - Best Practices (Debounce/Throttle) erklärt

4. **Realistische Projekt-Struktur**
   - Teamarbeit (Git Collaboration)
   - Dev Diary (Reflection)
   - Kontinuierliche Integration
   
   ✅ Bereitet auf echte Entwicklungsumgebung vor!


## 🚨 Kritische Diskrepanzen & Probleme

### ❌ **Problem 1: Veraltete/Fehlende Dependencies**

**In Anleitung erwähnt:**
```json
"@vuelidate/core": "^2.0.3",
"@vuelidate/validators": "^2.0.4",
"@fawmi/vue-google-maps": "^0.9.79",
"material-design-lite": "^1.3.0"
```

**Im Template NICHT vorhanden:**
```json
// frontend-template/package.json
{
  "dependencies": {
    "axios": "^1.5.0",
    "pinia": "^2.1.6",
    "vue": "^3.3.4",
    "vue-router": "^4.2.4"
  }
  // ❌ Vuelidate fehlt!
  // ❌ Google Maps fehlt!
  // ❌ MDL fehlt!
}
```

**Im Haupt-Projekt vorhanden:**
```json
// package.json (Hauptprojekt)
{
  "dependencies": {
    "@fawmi/vue-google-maps": "^0.9.79",
    "@vuelidate/core": "^2.0.3",
    "@vuelidate/validators": "^2.0.4",
    "material-design-lite": "^1.3.0",
    // ✅ Alle vorhanden
  }
}
```

**Problem:** Template enthält nicht alle Dependencies, die in den Anleitungen verwendet werden!

**Lösung:**
```bash
# Template-Dependencies synchronisieren
cd frontend-template
npm install @vuelidate/core @vuelidate/validators
npm install @fawmi/vue-google-maps
npm install material-design-lite
npm install mitt suncalc
npm install -D sass
npm install -D eslint-plugin-vue @vue/eslint-config-prettier prettier
npm install -D vite-plugin-pwa
```

---

### ❌ **Problem 2: Template zeigt Vuelidate, aber MDL fehlt**

**Template RegisterView.vue:**
```vue
<template>
  <div>
    <form id="register" novalidate @submit.stop.prevent="submit">
      <input v-model="name" />  <!-- ❌ Plain HTML Input -->
      <br />
      <span v-if="v$.name.$errors">  <!-- ✅ Vuelidate OK -->
        <ul>
          <li v-for="error in v$.name.$errors" :key="error.$message">
            {{ error.$message }}
          </li>
        </ul>
      </span>
    </form>
    <MdlButton form="register">Register</MdlButton>
  </div>
</template>
```

**Haupt-Projekt RegisterView.vue:**
```vue
<template>
  <div>
    <MdlCard>  <!-- ✅ MDL Component -->
      <template #content>
        <form id="register" novalidate @submit.stop.prevent="submit">
          <MdlInput  <!-- ✅ Custom MDL Input Component -->
            v-model.trim="name"
            label="Username"
            type="text"
            required
            :error="v$.name.$errors"
          />
          <!-- ... -->
        </form>
      </template>
    </MdlCard>
  </div>
</template>
```

**Problem:** Template-Beispiel ist **inkonsistent** - zeigt Vuelidate, aber ohne MDL-Integration, die in der Anleitung gelehrt wird!

**Lösung:** Template sollte MdlInput-Component bereits enthalten oder zumindest kommentiert vorbereitet sein.

---

### ❌ **Problem 3: MdlButton im Template ist leer**

**Template MdlButton.vue:**
```vue
<script>
import { upgradeElement } from "@/tools";
export default {
  data() {
    return {};
  },
  mounted() {
    upgradeElement(this.$refs.button);
  },
};
</script>

<template>
  <button ref="button">
    <slot>submit</slot>
  </button>
</template>
```

**Problem:** 
- Keine Props definiert! (icon, color, type, disabled)
- Keine MDL-Klassen!
- Keine Validator-Functions!
- Tests in `__tests__/MdlButton.spec.js` erwarten Props die nicht existieren!

**Tests erwarten:**
```javascript
it("check if icon element gets created when icon prop is defined", async () => {
  const buttonIcon = "search";
  const wrapper = shallowMount(MdlButton);
  await wrapper.setProps({
    icon: buttonIcon,  // ❌ Prop existiert nicht!
  });
  
  const icon = wrapper.find("i");
  expect(icon.exists()).toBe(true);  // ❌ Wird fehlschlagen!
});
```

**Lösung:** Template-MdlButton sollte entweder:
1. **Starter-Version** sein mit TODO-Kommentaren
2. **Vollständige Lösung** aus dem Hauptprojekt kopieren

**Empfehlung:** Starter-Version mit Scaffolding:

```vue
<script>
import { upgradeElement } from "@/tools";
export default {
  props: {
    // TODO: Add icon prop (String)
    // TODO: Add disabled prop (Boolean)
    // TODO: Add color prop (String with validator)
    // TODO: Add type prop (String with validator)
  },
  computed: {
    // TODO: Create buttonType computed
    // TODO: Create buttonColor computed
  },
  mounted() {
    upgradeElement(this.$refs.button);
  },
};
</script>

<template>
  <!-- TODO: Add MDL classes -->
  <!-- TODO: Add :class binding for buttonType and buttonColor -->
  <!-- TODO: Add conditional <i> element for icon -->
  <button
    class="mdl-button mdl-js-button mdl-js-ripple-effect"
    ref="button"
  >
    <slot>submit</slot>
  </button>
</template>
```

---

### ❌ **Problem 4: API-Dokumentation Links sind veraltet**

**In Anleitungen:**
```markdown
[API Specs][api]

[api]: https://app.swaggerhub.com/apis/pgmon/ws18/
```

**Problem:** 
- Link ist möglicherweise veraltet (ws18 = Wintersemester 2018?)
- Keine Information ob API noch läuft
- Im Code ist hardcoded: `https://lbartner-01.media.fhstp.ac.at:4430/api`

**Lösung:**
1. Swagger-Link aktualisieren
2. Mock-API-Server bereitstellen
3. API-Dokumentation im Projekt inkludieren (OpenAPI/Swagger YAML)

---

### ❌ **Problem 5: Setup-Anleitung referenziert Sheep Hosting**

```markdown
## Webspace

Die FH stellt dir einen kostenlosen Webspace zur Verfügung auf welchem die Web App später gehosted wird.

Wenn du dir noch kein [Sheep Hosting][sheep] geholt hast dann ist jetzt der richtige Zeitpunkt!
```

**Problem:** 
- Ist auskommentiert (gut!)
- Aber: Referenz zu FH-spezifischem Hosting
- Nicht relevant für öffentliches Lernprojekt

**Lösung:** Für öffentliche Version ersetzen mit:
````markdown
## Deployment

Für das Deployment deiner App gibt es viele Möglichkeiten:

**Kostenlose Hosting-Optionen:**
- [Netlify](https://www.netlify.com/) - Einfaches Deployment via Git
- [Vercel](https://vercel.com/) - Optimal für Vite-Projekte
- [GitHub Pages](https://pages.github.com/) - Direkt aus dem Repository
- [Render](https://render.com/) - Free Tier verfügbar

**Empfohlene Setup:**
```bash
# Build für Production
npm run build

# dist/ Ordner wird erstellt und kann deployed werden
```
````

---

### ❌ **Problem 6: GitLab-Referenzen sind FH-spezifisch**

```markdown
## Setup GitLab

Lege dir einen User im [FH GitLab][gitlab] an.  
Bitte vervollständige das Profil mit Namen und Foto!
Anschließend tritt bitte dieser [Gruppe][group] bei.

[gitlab]: https://git.nwt.fhstp.ac.at/
```

**Problem:** Nur für FH-Studenten relevant

**Lösung für öffentliche Version:**
```markdown
## Setup Git Repository

Erstelle ein Git-Repository für dein Projekt:

**GitHub:**
1. Erstelle ein neues Repository auf [GitHub](https://github.com)
2. Clone das Repository lokal
3. Kopiere das Template in deinen Workspace
4. Commit & Push

**GitLab:**
1. Erstelle ein Repository auf [GitLab](https://gitlab.com)
2. Folge den Setup-Anweisungen

**Tipp:** Für Teamarbeit nutze Branch-Protection und Pull-Request-Workflows!
```

---

### ❌ **Problem 7: Dev Diary ohne Kontext**

```markdown
## Dev Diary

Bitte schreibe zum Abschluss der Vorbereitung einen kurzen "Erlebnisbericht" ins *Dev Diary*! :)
```

**Problem:** 
- Wo ist das Dev Diary?
- Wie soll es strukturiert sein?
- Keine Beispiele

**Lösung:**
````markdown
## Dev Diary

Führe ein Lerntagebuch für jede Einheit. Dies hilft dir:
- Gelerntes zu reflektieren
- Probleme zu dokumentieren
- Fortschritt zu tracken

**Format (Vorschlag):**

```markdown
# Dev Diary - Einheit X

**Datum:** [Datum]

## Was habe ich gelernt?
- ...

## Was war schwierig?
- ...

## Was hat gut funktioniert?
- ...

## Offene Fragen
- ...

## Nächste Schritte
- ...
```

**Speicherort:** `dev-diary/einheit-X.md`
````

---

### ⚠️ **Problem 8: Node.js/Volta Version Alignment**

**In Anleitung:**
```markdown
* [Node.js][node]
* [VOLTA][volta] (managed unterschiedliche Node.js Versionen)
```

**In package.json (beide Projekte):**
```json
"volta": {
  "node": "18.17.1"
}
```

**Problem:** 
- Node 18 ist EOL im April 2025
- Bereits veraltet (Oktober 2025)

**Lösung:**
```json
"volta": {
  "node": "20.11.0"  // LTS bis April 2026
}
```

Und in Anleitung ergänzen:
````markdown
**Empfohlene Node.js Version:** 20.x LTS

Du kannst Volta nutzen um automatisch die richtige Version zu verwenden:
```bash
volta install node@20
```
````

---

### ⚠️ **Problem 9: Material Design Lite ist deprecated**

**In Anleitung:**
```markdown
## Material Design Lite

Wir werden [Material Design Lite][mdl] bei der Entwicklung der Vue App nutzen.
Ich habe absichtlich Material Design Lite gewählt da wir hier noch einiges an "ground work" erledigen können.
```

**Problem:** 
- MDL wurde 2018 deprecated
- Letztes Update: 2016
- Nicht mehr maintained

**ABER:** Für ein Lernprojekt ist das **AKZEPTABEL**, weil:
- ✅ Zeigt wie man Legacy-Libraries wrappt
- ✅ Demonstriert Component-Patterns
- ✅ Lernen durch "ground work" ist wertvoll

**Empfehlung:** In Anleitung **explizit erwähnen**:
```markdown
## Material Design Lite

⚠️ **Hinweis:** Material Design Lite ist eine **veraltete Library** (deprecated seit 2018).

**Warum nutzen wir sie trotzdem in diesem Lernprojekt?**

1. **Lernwert:** Du lernst wie man Legacy-Libraries in Vue integriert
2. **Component-Wrapping:** Du entwickelst eigene Vue-Wrapper-Components
3. **Realwelt-Scenario:** Im echten Job wirst du oft mit Legacy-Code arbeiten
4. **Praxis:** Du verstehst Component-Lifecycle und DOM-Manipulation besser

**Für Production-Projekte empfehlen wir:**
- [Vuetify](https://vuetifyjs.com/) - Material Design für Vue 3
- [Quasar](https://quasar.dev/) - Full-Featured Framework
- [PrimeVue](https://primevue.org/) - UI Component Library
- [Naive UI](https://www.naiveui.com/) - Modern Vue 3 Components
```

---

### ⚠️ **Problem 10: Google Maps API Key Security**

**In Anleitung:**
```markdown
## Google Maps API key

Besorge einen [Google Maps API key][maps-api-key] (pro Team ist nur ein Key notwendig).  
Versuche nun Google Maps in deiner Map View einzubinden.

Dazu muss eine Kreditkarte hinterlegt werden - das Freivolumen ist so hoch dass wir sicher nicht in die Situation kommen dass Kosten entstehen.
```

**Fehlt komplett:** Security-Hinweise!

**Lösung - Anleitung ergänzen:**
````markdown
## Google Maps API Key - Security

⚠️ **WICHTIG:** Der API-Key darf **NIEMALS** im Code committed werden!

### Setup-Schritte:

1. **API Key erstellen:**
   - Öffne [Google Cloud Console](https://console.cloud.google.com/)
   - Erstelle ein neues Projekt
   - Aktiviere "Maps JavaScript API"
   - Erstelle API-Credentials (API Key)

2. **Restrictions setzen (WICHTIG!):**
   ```
   Application restrictions:
   - HTTP referrers (websites)
   - Add: localhost:5173/*
   - Add: localhost:4173/*
   - Add: yourdomain.com/*  (für Production)
   
   API restrictions:
   - Restrict key
   - Select: Maps JavaScript API, Geocoding API
   ```

3. **Umgebungsvariablen nutzen:**
   
   Erstelle `.env` im Projekt-Root:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=your_key_here
   ```
   
   Füge `.env` zur `.gitignore` hinzu:
   ```bash
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```
   
   Erstelle `.env.example` als Vorlage:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=
   ```

4. **Im Code verwenden:**
   ```javascript
   // src/main.js
   app.use(VueGoogleMaps, {
     load: {
       key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
     },
   });
   ```

5. **README.md Update:**
   Dokumentiere im README wie andere Entwickler den Key setzen müssen!

**Kosten-Kontrolle:**
- Setze ein Budget-Alert in Google Cloud Console
- Empfohlen: $5/Monat Alert
- Free Tier: $200 Guthaben/Monat
````


## 📊 Vergleich: Template vs. Haupt-Projekt vs. Anleitung

| Feature | Template | Haupt-Projekt | Anleitung | Status |
|---------|----------|---------------|-----------|--------|
| Vue 3 | ✅ 3.3.4 | ✅ 3.3.4 | ✅ Vue 3 | ✅ Sync |
| Vite | ✅ 4.4.9 | ✅ 4.4.9 | ✅ Erwähnt | ✅ Sync |
| Pinia | ✅ 2.1.6 | ✅ 2.1.6 | ✅ Einheit 4 | ✅ Sync |
| Vue Router | ✅ 4.2.4 | ✅ 4.2.4 | ✅ Einheit 2 | ✅ Sync |
| Axios | ✅ 1.5.0 | ✅ 1.5.0 | ✅ Einheit 2 | ✅ Sync |
| Vuelidate | ❌ Fehlt | ✅ 2.0.3 | ✅ Einheit 3 | 🔴 **FEHLT** |
| Google Maps | ❌ Fehlt | ✅ 0.9.79 | ✅ Einheit 2 | 🔴 **FEHLT** |
| MDL | ❌ Fehlt | ✅ 1.3.0 | ✅ Einheit 1 | 🔴 **FEHLT** |
| Mitt | ❌ Fehlt | ✅ 3.0.1 | ❌ Nicht erwähnt | 🟡 Optional |
| SunCalc | ❌ Fehlt | ✅ 1.9.0 | ✅ Einheit 6 | 🔴 **FEHLT** |
| Sass | ❌ Fehlt | ✅ 1.66.1 | ⚠️ Optional | 🟡 Optional |
| PWA Plugin | ❌ Fehlt | ✅ 0.16.4 | ⚠️ Optional | 🟡 Optional |
| ESLint | ❌ Fehlt | ✅ 8.46.0 | ✅ Erwähnt | 🔴 **FEHLT** |
| Prettier | ❌ Fehlt | ✅ 3.0.0 | ✅ Erwähnt | 🔴 **FEHLT** |
| Vitest | ✅ 0.34.2 | ✅ 0.34.2 | ✅ Tests | ✅ Sync |
| MdlButton | 🟡 Leer | ✅ Komplett | ✅ Einheit 1 | 🟡 **Scaffolding fehlt** |
| MdlInput | ❌ Fehlt | ✅ Vorhanden | ✅ Einheit 3 | 🔴 **FEHLT** |
| MdlCard | ❌ Fehlt | ✅ Vorhanden | ⚠️ Implizit | 🔴 **FEHLT** |

**Legende:**
- ✅ Vorhanden & Sync
- 🟡 Teilweise / Optional
- 🔴 Fehlt / Kritisch
- ❌ Nicht vorhanden


## 🎯 Bewertung der Anleitungs-Qualität

### **Struktur & Didaktik: 9/10** ✅

**Stärken:**
- Exzellenter Inverted Classroom Ansatz
- Klare Lernziele pro Einheit
- Progressive Komplexität
- Gute Ressourcen-Links
- Praxisnahes Projekt

**Verbesserungen:**
- Mehr Code-Beispiele inline
- Troubleshooting-Sektion
- FAQ pro Einheit

### **Technische Korrektheit: 5/10** 🔴

**Probleme:**
- Template nicht synchron mit Anleitung
- Veraltete Node.js Version
- Fehlende Security-Hinweise
- API-Links veraltet

### **Vollständigkeit: 6/10** 🟡

**Fehlt:**
- Deployment-Guide
- Troubleshooting
- FAQ
- Video-Tutorials (optional)
- Lösungs-Branches pro Einheit

### **Zugänglichkeit: 7/10** 🟡

**Gut:**
- Klare Sprache
- Strukturierte Navigation
- Prerequisites definiert

**Verbesserungen:**
- Mehr Visualisierungen (Diagramme)
- Code-Snippets mit Syntax-Highlighting
- Screenshots von erwarteten Ergebnissen


## ✅ Empfohlene Fixes - Priorisiert

### **Phase 1: KRITISCH (vor Veröffentlichung)**

1. **Template Dependencies synchronisieren**
   ```bash
   cd frontend-template
   npm install @vuelidate/core @vuelidate/validators
   npm install @fawmi/vue-google-maps material-design-lite
   npm install mitt suncalc
   npm install -D sass eslint-plugin-vue @vue/eslint-config-prettier prettier
   npm install -D vite-plugin-pwa
   ```

2. **MdlButton im Template vervollständigen**
   - Entweder Scaffolding mit TODOs
   - Oder komplette Lösung mit Kommentaren

3. **MdlInput-Starter im Template hinzufügen**
   ```vue
   <!-- frontend-template/src/components/MdlInput.vue -->
   <template>
     <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
       <!-- TODO: Implement input binding -->
       <!-- TODO: Add error handling -->
       <!-- TODO: Add label binding -->
     </div>
   </template>
   ```

4. **Security-Guide hinzufügen**
   - Neue Datei: `pgmon.wiki/Allgemeines/Security.md`
   - API-Key Management
   - Environment Variables
   - .gitignore Best Practices

5. **Node.js Version aktualisieren**
   ```json
   "volta": {
     "node": "20.11.0"
   }
   ```

6. **FH-spezifische Referenzen entfernen/generalisieren**
   - GitLab → GitHub/GitLab
   - Sheep Hosting → Netlify/Vercel
   - API-Links aktualisieren

### **Phase 2: WICHTIG (für besseres Lernerlebnis)**

7. **README-Templates erstellen**
   - `frontend-template/README.md` - Starter-Guide
   - `README-COMPLETE.md` - Finale Version als Referenz

8. **Lösungs-Branches erstellen**
   ```bash
   git checkout -b solution/einheit-1
   git checkout -b solution/einheit-2
   # etc.
   ```

9. **Dev-Diary Template**
   ```markdown
   frontend-template/dev-diary/
   ├── README.md (Anleitung)
   ├── einheit-1-template.md
   ├── einheit-2-template.md
   └── ...
   ```

10. **Troubleshooting-Guide**
    ```markdown
    pgmon.wiki/Allgemeines/Troubleshooting.md
    
    Häufige Probleme:
    - MDL Components werden nicht gerendert
    - Google Maps zeigt nicht an
    - Vuelidate Errors werden nicht angezeigt
    - Build-Fehler
    ```

11. **Code-Standards dokumentieren**
    ```markdown
    pgmon.wiki/Allgemeines/Code-Standards.md
    
    - Naming Conventions
    - Component Structure
    - Commit Message Format
    - Branch Strategy
    ```

### **Phase 3: NICE TO HAVE (polish)**

12. **Screenshots/Visualisierungen**
    - Erwartete Ergebnisse pro Einheit
    - Architektur-Diagramme
    - Component-Hierarchie

13. **Video-Walkthrough** (optional)
    - Setup-Video
    - Einheit 1 Walkthrough
    - Common Pitfalls

14. **Interaktive Beispiele**
    - CodeSandbox/StackBlitz Links
    - Live-Demos

15. **Quiz-Fragen** veröffentlichen
    - Einheit erwähnt Quiz, aber Fragen fehlen
    - Als Self-Assessment Tool


## 📋 Konkrete TODO-Liste für Dokumentation

```markdown
## Sofortige Änderungen (Vor Veröffentlichung)

### Template-Projekt
- [ ] Package.json Dependencies ergänzen (Vuelidate, Maps, MDL, etc.)
- [ ] MdlButton.vue mit Props/Scaffolding ausstatten
- [ ] MdlInput.vue Starter hinzufügen
- [ ] MdlCard.vue Starter hinzufügen
- [ ] .env.example erstellen
- [ ] .gitignore um .env erweitern
- [ ] README.md komplett neu schreiben (Starter-Guide)
- [ ] Node.js Version auf 20.x aktualisieren

### Wiki/Anleitungen
- [ ] Security.md Guide erstellen
- [ ] Troubleshooting.md erstellen
- [ ] FH-spezifische Referenzen entfernen
  - [ ] GitLab → generisch
  - [ ] Sheep Hosting → Netlify/Vercel
  - [ ] API Links prüfen/aktualisieren
- [ ] MDL-deprecated Warnung hinzufügen
- [ ] Google Maps Security-Hinweise ergänzen
- [ ] Dev Diary Format dokumentieren
- [ ] Deployment-Guide erstellen
- [ ] Node.js/Volta Version aktualisieren

### Haupt-Projekt
- [ ] API Key aus Code entfernen
- [ ] .env.example erstellen
- [ ] README.md aktualisieren (aus Review)
- [ ] LICENSE hinzufügen
- [ ] CONTRIBUTING.md erstellen

## Mittelfristige Verbesserungen

- [ ] Lösungs-Branches pro Einheit
- [ ] Code-Standards dokumentieren
- [ ] FAQ pro Einheit
- [ ] Screenshots der erwarteten Ergebnisse
- [ ] Architektur-Diagramme erstellen
- [ ] Self-Assessment Quiz veröffentlichen

## Langfristig (Optional)

- [ ] Video-Tutorials
- [ ] Interactive CodeSandbox Examples
- [ ] Community Discord/Forum
- [ ] Contribution Guidelines
- [ ] Advanced Topics (TypeScript Migration, etc.)
```


## 🎓 Spezifische Verbesserungsvorschläge pro Einheit

### **Einheit 1: Vue Button Component**

**Aktuell gut:**
- ✅ Klare Aufgabenstellung
- ✅ Requirements-Konzept-Umsetzung Struktur

**Verbesserungen:**
```markdown
## Lernziele (ergänzen)

Nach dieser Einheit kannst du:
- ✅ Props definieren und validieren
- ✅ Slots nutzen für flexible Content-Injection
- ✅ Computed Properties für dynamische Klassen
- ✅ Template Refs für DOM-Zugriff
- ✅ Component Lifecycle Hooks (mounted)
- ✅ Externe Libraries in Vue integrieren

## Erwartetes Ergebnis

Am Ende solltest du einen Button haben der so funktioniert:

\`\`\`vue
<MdlButton type="raised" color="primary" icon="add">
  Add Item
</MdlButton>
\`\`\`

**Screenshot:** [Bild des gerenderten Buttons]

## Häufige Fehler

1. **MDL upgradeElement wird nicht aufgerufen**
   - Symptom: Button hat kein Ripple-Effect
   - Lösung: In mounted() Hook aufrufen

2. **Props werden nicht validiert**
   - Symptom: Falsche Werte führen zu fehlerhaftem Rendering
   - Lösung: Validator-Functions nutzen

## Erweiterte Aufgabe (Optional)

Erstelle weitere MDL-Wrapper:
- MdlCheckbox
- MdlRadio
- MdlSwitch
```

### **Einheit 2: Google Maps**

**Verbesserungen:**
```markdown
## Security-Hinweise (HINZUFÜGEN!)

⚠️ **WICHTIG:** Bevor du mit Google Maps arbeitest:

1. **API-Key NIEMALS committen!**
2. **Environment Variables nutzen (.env)**
3. **Domain Restrictions setzen**
4. **Budget Alerts konfigurieren**

[Link zu Security-Guide]

## Mock-Daten für Entwicklung

Während du auf den API-Key wartest, nutze Mock-Daten:

\`\`\`javascript
// src/mock/sightings.js
export const mockSightings = [
  {
    "sighting-id": 1,
    "pokedex-id": 25,
    position: { lat: 48.213185, lng: 15.631745 }
  },
  // ...
];
\`\`\`

## Erwartetes Ergebnis

**Screenshot:** Map mit mehreren Pokemon-Markern

## Performance-Hinweis

Nutze Debounce für bounds_changed Event:
- Ohne Debounce: 100+ API Calls beim Pan/Zoom
- Mit Debounce (500ms): ~2-3 API Calls

## Troubleshooting

**Problem:** "Google Maps JavaScript API error: InvalidKeyMapError"
- **Lösung:** API-Key prüfen, ist Maps JavaScript API aktiviert?

**Problem:** Keine Pokemon werden angezeigt
- **Lösung:** Console-Log die API-Response, werden Daten geladen?
```

### **Einheit 3: Login & Registrierung**

**Verbesserungen:**
```markdown
## Vuelidate Best Practices

### Custom Validators erstellen

\`\`\`javascript
// Beispiel: Starke Passwort-Validierung
const strongPassword = helpers.withMessage(
  'Password must contain uppercase, lowercase, number and special char',
  (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value);
  }
);
\`\`\`

### Async Validators (Email verfügbar?)

\`\`\`javascript
const emailAvailable = helpers.withAsync(async (value) => {
  const response = await checkEmailAvailability(value);
  return response.available;
});
\`\`\`

## MdlInput Component Entwicklung

**Schritte:**
1. Props definieren (modelValue, label, type, required, error)
2. v-model Binding implementieren (emit update:modelValue)
3. Error Display aus Vuelidate
4. MDL upgradeElement in mounted()
5. Accessibility (aria-labels, aria-invalid)

## Erwartetes Ergebnis

**Screenshot:** Register-Formular mit Validierungs-Fehlern

## Testing

Teste verschiedene Szenarien:
- [ ] Leere Felder → Fehler angezeigt
- [ ] Ungültige Email → Fehler
- [ ] Passwort zu kurz → Fehler
- [ ] Passwörter stimmen nicht überein → Fehler
- [ ] Alle Felder korrekt → Erfolgreiche Registrierung
```

### **Einheit 4: Pinia Store**

**Verbesserungen:**
```markdown
## Store-Struktur Best Practices

### State Normalisierung

\`\`\`javascript
// ❌ Schlecht: Verschachtelte Arrays
state: {
  sightings: [
    { id: 1, pokedex: { id: 25, name: 'Pikachu' } }
  ]
}

// ✅ Gut: Normalisiert
state: {
  pokedex: {
    25: { id: 25, name: 'Pikachu' }
  },
  sightings: {
    1: { id: 1, pokedexId: 25 }
  }
}
\`\`\`

### Getters vs. Computed in Components

**Regel:** 
- Getters für **einfache** State-Zugriffe
- Computed in Components für **komplexe** Transformationen

### Actions Best Practices

\`\`\`javascript
// ✅ Guter Action-Name
async fetchSightings(bounds) { }

// ❌ Schlechter Action-Name
async getSightings(bounds) { }  // "get" suggeriert nur Getter
\`\`\`

## Testing Pinia Stores

\`\`\`javascript
import { setActivePinia, createPinia } from 'pinia';
import { useMainStore } from '@/stores';

describe('Main Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it('should set position', () => {
    const store = useMainStore();
    store.setPosition({ lat: 48, lng: 15 });
    expect(store.getPosition).toEqual({ lat: 48, lng: 15 });
  });
});
\`\`\`
```

### **Einheit 5: Auto-Login (localStorage)**

**Verbesserungen:**
```markdown
## localStorage Security

⚠️ **Wichtige Sicherheitshinweise:**

### XSS-Risiken

localStorage ist anfällig für XSS-Angriffe:
- Alle JavaScript-Code kann darauf zugreifen
- Für Production: HttpOnly Cookies bevorzugen

### Token-Expiration

\`\`\`javascript
// Token mit Ablaufdatum speichern
const tokenData = {
  token: authToken,
  expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24h
};
localStorage.setItem('auth', JSON.stringify(tokenData));

// Beim Laden prüfen
const data = JSON.parse(localStorage.getItem('auth'));
if (Date.now() > data.expiresAt) {
  // Token abgelaufen
  localStorage.removeItem('auth');
}
\`\`\`

### Auto-Logout bei Inaktivität

\`\`\`javascript
let inactivityTimer;

function resetTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(logout, 30 * 60 * 1000); // 30min
}

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);
\`\`\`

## Router Guards

\`\`\`javascript
router.beforeEach((to, from) => {
  const requiresAuth = to.meta.requires === 'auth';
  const isAuthenticated = store.getAuthToken;
  
  if (requiresAuth && !isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
});
\`\`\`

**Hinweis:** `redirect` Query-Parameter ermöglicht Umleitung nach Login!
```

### **Einheit 6: Tag/Nacht Map**

**Verbesserungen:**
```markdown
## SunCalc Integration

### Konzept

SunCalc berechnet basierend auf:
- Geografischer Position (lat/lng)
- Datum/Zeit
- Sonnenauf-/-untergangszeiten

### Memory Leak vermeiden!

⚠️ **WICHTIG:** setTimeout-Referenzen speichern:

\`\`\`javascript
// ❌ Schlecht: Keine Cleanup-Möglichkeit
setMapStyles() {
  window.setTimeout(
    () => this.mapId = 'day-style',
    sunriseTime - now
  );
}

// ✅ Gut: Referenzen speichern
setMapStyles() {
  this.sunriseTimer = window.setTimeout(
    () => this.mapId = 'day-style',
    sunriseTime - now
  );
}

unmounted() {
  clearTimeout(this.sunriseTimer);
  clearTimeout(this.sunsetTimer);
}
\`\`\`

### Map Style nicht neu erstellen!

\`\`\`javascript
// ❌ Schlecht: Map wird komplett neu geladen
<GMapMap :key="mapId" />

// ✅ Besser: Style dynamisch ändern
watch: {
  mapId(newId) {
    this.$refs.map.setMapTypeId(newId);
  }
}
\`\`\`

## Erweiterte Features (Optional)

- Smooth Transition zwischen Styles
- User-Preference (Dark Mode Toggle)
- Astronomische Dämmerung berücksichtigen
```


## 🎯 Zusammenfassung

### **Was funktioniert gut:**
- ✅ Didaktischer Aufbau (Inverted Classroom)
- ✅ Progressive Komplexität
- ✅ Realwelt-Projekt
- ✅ Teamwork-Focus
- ✅ Reflexion (Dev Diary)

### **Was MUSS gefixt werden:**
- 🔴 Template-Dependencies synchronisieren
- 🔴 Security-Guide hinzufügen
- 🔴 FH-Referenzen generalisieren
- 🔴 MdlButton/Input im Template vervollständigen
- 🔴 Node.js Version aktualisieren

### **Was das Lernerlebnis verbessert:**
- 🟡 Screenshots der Ergebnisse
- 🟡 Troubleshooting-Guide
- 🟡 Lösungs-Branches
- 🟡 Code-Standards dokumentieren
- 🟡 FAQ pro Einheit

### **Nice to Have:**
- ⚪ Video-Tutorials
- ⚪ Interactive Examples
- ⚪ Community-Plattform


## 📊 Finale Bewertung

| Aspekt | Score | Status |
|--------|-------|--------|
| Didaktische Qualität | 9/10 | ✅ Exzellent |
| Technische Korrektheit | 5/10 | 🔴 Fixes nötig |
| Vollständigkeit | 6/10 | 🟡 Verbesserbar |
| Synchronisation (Template ↔ Anleitung) | 4/10 | 🔴 Kritisch |
| Security-Awareness | 3/10 | 🔴 Fehlt größtenteils |
| Zugänglichkeit | 7/10 | 🟡 Gut, aber Luft nach oben |
| Praxisrelevanz | 8/10 | ✅ Sehr gut |

**Gesamt: 6/10** 🟡

**Fazit:** Die Anleitungen haben ein **exzellentes didaktisches Fundament**, aber **kritische technische Lücken** müssen geschlossen werden, bevor sie als öffentliche Lernressource dienen können. Nach Implementierung der **Phase 1 Fixes** wäre es ein **hervorragendes Vue 3 Lern-Tutorial**! 🎓

---

**Review erstellt von:** GitHub Copilot  
**Datum:** 5. Oktober 2025  
**Basis:** Wiki-Anleitungen (6 Einheiten) + Frontend-Template + Haupt-Projekt
