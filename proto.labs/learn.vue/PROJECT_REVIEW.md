# PGMon+ Frontend - Ausführlicher Code Review Report

**Projekt:** PGMon+ (Pokémon Go Monitor)  
**Framework:** Vue 3 (Options API)  
**Build Tool:** Vite  
**Review Datum:** 5. Oktober 2025  
**Zweck:** Lernprojekt für Vue 3 Options API mit Material Design Lite

::: info
**About This Review**  
AI analysis (Oct 2025) of teaching material I created 2018-2024 for FH St. Pölten, migrated from Vue 1 → Vue 2 → Vue 3.  
The "issues" reflect teaching-focused code vs. production standards, framework evolution, and infrastructure from university network (API keys/URLs non-functional externally).  
Value: Shows how AI reviews real teaching code and the gap between teaching and production.
:::

## 🎯 Gesamtbewertung: **6/10** (Solide Basis mit erheblichem Verbesserungspotenzial)

**Stärken:**
- ✅ Gute Struktur und Organisation
- ✅ Konsistente Verwendung der Options API
- ✅ Funktionierende Custom Components für MDL
- ✅ PWA-Support implementiert
- ✅ Pinia State Management korrekt eingesetzt

**Hauptschwächen:**
- ❌ **KRITISCHE SICHERHEITSLÜCKEN** (API-Keys, keine Validierung)
- ❌ Fehlende Tests trotz Test-Setup
- ❌ Unvollständige Fehlerbehandlung
- ❌ Veraltete Dependencies
- ❌ Fehlende Dokumentation
- ❌ Accessibility-Probleme

## 👤 Experten-Reviews nach Persona

### 🔒 **Mikko Hyppönen** - Security Expert Perspective

> *"Als Cybersecurity-Experte bin ich alarmiert über die gravierenden Sicherheitslücken in diesem Projekt."*

#### **KRITISCHE Sicherheitsprobleme:**

1. **🚨 HARDCODED API KEY (CRITICAL)**
   ```javascript
   // src/main.js, Zeile 14-16
   app.use(VueGoogleMaps, {
     load: {
       key: "AIzbSyDZ6uQ8cTcVGfHZirOUbey1Fh3mlPKWoZU", // ❌ ÖFFENTLICHER API KEY!
     },
   });
   ```
   **Problem:** Google Maps API-Schlüssel ist im Source Code hart codiert und wird öffentlich verfügbar sein.
   
   **Konsequenzen:**
   - Missbrauch des API-Keys durch Dritte möglich
   - Potenzielle Kosten für den API-Besitzer
   - Quota-Erschöpfung durch böswillige Nutzung
   
   **Lösung:**
   - Umgebungsvariablen verwenden (`.env` Dateien)
   - Domain-Restrictions im Google Cloud Console setzen
   - API Key Rotation implementieren

2. **🚨 HARDCODED BACKEND URL**
   ```javascript
   // src/http/index.js, Zeile 7
   baseURL: "https://lbartner.media.fhstp.ac.at:4430/api",
   ```
   **Problem:** Backend-URL ist fest codiert und verweist auf einen spezifischen Server.
   
   **Lösung:** Umgebungsvariablen nutzen

3. **❌ LocalStorage für Auth-Token ohne Verschlüsselung**
   ```javascript
   // src/stores/index.js, Zeile 88
   localStorage.authToken = payload;
   ```
   **Probleme:**
   - Keine HttpOnly Cookies (XSS-Anfällig)
   - Kein Token-Refresh-Mechanismus
   - Token-Ablauf wird nicht validiert
   - Kein CSRF-Schutz
   
   **Empfehlung:** 
   - HttpOnly Cookies für Production verwenden
   - Token-Refresh-Logik implementieren
   - Token-Expiration prüfen

4. **❌ Fehlende Input-Sanitization**
   - Keine XSS-Protection bei User-Input
   - Vuelidate validiert nur Format, nicht Sicherheit
   - Potenzielle SQL-Injection über Backend möglich

5. **❌ Keine HTTPS-Erzwingung**
   - Keine automatische Umleitung zu HTTPS
   - Mixed Content möglich

6. **❌ Fehlende Security Headers**
   - Keine Content-Security-Policy (CSP)
   - Keine X-Frame-Options
   - Keine X-Content-Type-Options

#### **Notwendige Maßnahmen:**

```javascript
// 1. .env Datei erstellen
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_API_BASE_URL=http://localhost:4430/api

// 2. .env.example erstellen
VITE_GOOGLE_MAPS_API_KEY=
VITE_API_BASE_URL=

// 3. In .gitignore ergänzen
.env
.env.local
.env.*.local

// 4. Code anpassen
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  },
});

// 5. CSP Header in index.html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline' https://maps.googleapis.com; ...">
```

**Security Score: 2/10** 🔴

---

### 🎨 **Evan You** - Vue.js Creator Perspective

> *"Als Vue-Creator sehe ich hier gute Ansätze der Options API, aber auch einige Anti-Patterns."*

#### **Positive Aspekte:**

1. ✅ **Korrekte Options API Verwendung**
   - Konsistente Komponentenstruktur
   - Richtige Lifecycle-Hooks
   - Setup-Komposition für Stores

2. ✅ **Composition mit Options API**
   ```javascript
   setup() {
     const mainStore = useMainStore();
     return { mainStore };
   }
   ```
   Gute Mischung aus Options und Composition für Store-Zugriff

3. ✅ **Router Guards korrekt implementiert**

#### **Verbesserungspotenzial:**

1. **❌ Inkonsistente v-model Handhabung**
   ```javascript
   // MdlInput.vue - Zu komplex
   updateModelValue(value) {
     this.tmpValue = value;
     this.debouncedModelValue(value);
   },
   debouncedModelValue: debounce(function (value) {
     this.$emit("update:modelValue", value);
   }, 500),
   ```
   **Problem:** 
   - Verzögerte Updates können zu Race Conditions führen
   - `tmpValue` State ist redundant
   - Bei onBlur/onEnter wird tmpValue direkt emitted (inkonsistent)
   
   **Besserer Ansatz:**
   ```javascript
   updateModelValue(value) {
     this.$emit("update:modelValue", value); // Sofort emittieren
     this.debouncedAction(value); // Debounce nur für Side-Effects
   }
   ```

2. **❌ Memory Leak in GeoWatch**
   ```javascript
   // App.vue, Zeile 29
   this.GeoWatch = navigator.geolocation.watchPosition(...)
   
   // Zeile 63 - falscher Name!
   unmounted() {
     navigator.geolocation.clearWatch(this.geoWatch); // ❌ Case mismatch!
   }
   ```
   **Problem:** `GeoWatch` vs `geoWatch` - das Watch wird nie cleared!

3. **❌ Fehlende Error Boundaries**
   - Keine errorCaptured Hooks
   - App crasht bei Component-Fehlern

4. **❌ Ineffiziente Computed Properties**
   ```javascript
   // MapView.vue
   getPokemonName(sightingId) {
     const clickedPokeDexId = this.mainStore.getSightings.find(...)[...]
     return this.mainStore.getPokeDex.find(...).name;
   }
   ```
   **Problem:** Methode statt Computed - wird bei jedem Render neu ausgeführt
   
   **Besser:** Map als Computed Property erstellen

5. **❌ Router Navigation Pattern**
   ```vue
   <RouterLink custom :to="{ name: 'map' }" v-slot="{ navigate }">
     <MdlButton @click="navigate">Back to Map</MdlButton>
   </RouterLink>
   ```
   **Problem:** Unnötig komplex für einfache Navigation
   
   **Empfehlung:** 
   - Entweder normales RouterLink mit Styling
   - Oder Button mit `@click="$router.push({ name: 'map' })"`

6. **❌ KeepAlive ohne Max**
   ```vue
   <KeepAlive include="MapView">
     <Component :is="Component" />
   </KeepAlive>
   ```
   **Fehlt:** `max` Attribut - kann Memory-Probleme verursachen

7. **⚠️ Counter Store nicht genutzt**
   ```javascript
   // src/stores/counter.js existiert, wird aber nirgendwo verwendet
   ```

8. **⚠️ Ungenutzte Route-Komponenten**
   - `HelloWorld.vue`
   - `TheWelcome.vue`
   - `WelcomeItem.vue`
   Sollten entfernt oder dokumentiert werden (falls für Tutorial gedacht)

#### **Struktur-Empfehlungen:**

```javascript
// 1. Composables erstellen für wiederverwendbare Logik
// composables/useGeolocation.js
export function useGeolocation() {
  const position = ref({ lat: 0, lng: 0 });
  const error = ref(null);
  
  const watchId = navigator.geolocation.watchPosition(
    (pos) => { position.value = {...} },
    (err) => { error.value = err.message },
    options
  );
  
  onUnmounted(() => {
    navigator.geolocation.clearWatch(watchId);
  });
  
  return { position, error };
}

// 2. Pokemon-Logik auslagern
// composables/usePokemon.js
export function usePokemon() {
  const store = useMainStore();
  
  const getPokemonIcon = (pokedexId) => {
    const paddedId = pokedexId.toString().padStart(3, "0");
    return `/img/pokemon_icons/pokemon_icon_${paddedId}_00.png`;
  };
  
  const pokemonNameMap = computed(() => {
    return new Map(
      store.getPokeDex.map(p => [p['pokedex-id'], p.name])
    );
  });
  
  return { getPokemonIcon, pokemonNameMap };
}
```

**Vue Score: 6.5/10** 🟡

---

### ⚡ **Evan Bacon** - Performance & Build Expert Perspective

> *"Als Performance-Experte sehe ich unnötige Bottlenecks und nicht ausgeschöpftes Optimierungspotenzial."*

#### **Performance-Probleme:**

1. **❌ Fehlende Code-Splitting**
   ```javascript
   // router/index.js - Alle Views werden sofort geladen
   import MapView from "@/views/MapView.vue";
   import ListView from "@/views/ListView.vue";
   // ...
   ```
   **Problem:** Bundle-Größe unnötig groß
   
   **Lösung:**
   ```javascript
   const MapView = () => import("@/views/MapView.vue");
   const ListView = () => import("@/views/ListView.vue");
   ```

2. **❌ Material Design Lite komplett geladen**
   ```javascript
   import "material-design-lite/material";
   import "material-design-lite/dist/material.amber-blue.min.css";
   ```
   **Problem:** Komplette Library (~150KB) für nur wenige genutzte Components
   
   **Lösung:** Tree-shaking oder Custom Build

3. **❌ Keine Bildoptimierung**
   - 512 Pokemon-Icons ohne lazy loading
   - Keine WebP/AVIF-Formate
   - Keine Responsive Images

4. **❌ Map-Probleme**
   ```javascript
   // MapView.vue - Map wird bei jedem MapId-Wechsel neu erstellt
   :key="options.mapId"
   ```
   **Problem:** Kompletter Map-Rebuild statt Style-Update
   
   **Besser:** Map-Style dynamisch ändern ohne Rebuild

5. **❌ Ineffiziente Sichtings-Filterung**
   ```javascript
   // http/index.js, Zeile 86
   const sightingsWithPokeDex = response?.data?.filter(
     (entry) => entry["pokedex-id"],
   );
   ```
   **Problem:** Filterung im Frontend - sollte Backend-Aufgabe sein

6. **⚠️ Window-Timeout ohne Cleanup**
   ```javascript
   // stores/index.js, Zeile 119-130
   setMapStyles() {
     window.setTimeout(
       () => (this.mapId = "78649de0061d5eb1"),
       this.getSunrise - new Date(now),
     );
     // Keine Referenzen gespeichert - kann nicht abgebrochen werden
   }
   ```
   **Problem:** Timeouts überleben Component-Lifecycle

7. **❌ Fehlende Vite-Optimierungen**
   ```javascript
   // vite.config.js fehlt:
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           'vendor-vue': ['vue', 'vue-router', 'pinia'],
           'vendor-maps': ['@fawmi/vue-google-maps'],
           'vendor-mdl': ['material-design-lite'],
         }
       }
     },
     chunkSizeWarningLimit: 1000
   }
   ```

#### **Empfohlene Optimierungen:**

```javascript
// 1. Lazy Loading für Routes
const router = createRouter({
  routes: [
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/MapView.vue'),
    },
    // ...
  ]
});

// 2. Virtual Scrolling für Pokemon-Liste
// Nutze vue-virtual-scroller für große Listen

// 3. Image Lazy Loading
<img 
  :src="getPokemonIcon(pokemon['pokedex-id'])" 
  loading="lazy"
  decoding="async"
/>

// 4. Debounce/Throttle konsolidieren
// Globale Utility-Funktionen mit WeakMap für Cleanup

// 5. PWA Optimierungen
workbox: {
  globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/maps\.googleapis\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-maps-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 86400, // 1 day
        },
      },
    },
  ],
}
```

**Performance Score: 5/10** 🟡

---

### ♿ **Léonie Watson** - Accessibility Expert Perspective

> *"Als Accessibility-Expertin und Screen-Reader-Nutzerin sehe ich erhebliche Barrieren."*

#### **Kritische Accessibility-Probleme:**

1. **❌ Keine Landmark-Regions**
   ```html
   <!-- App.vue fehlt semantisches HTML -->
   <div class="mdl-layout__container">
     <div class="mdl-layout">
       <header> <!-- ✅ OK -->
       <div class="mdl-layout__drawer"> <!-- ❌ Sollte <nav> sein -->
       <main> <!-- ✅ OK -->
   ```

2. **❌ Fehlende ARIA-Labels**
   ```vue
   <!-- MapView.vue - Google Map ohne Labels -->
   <GMapMap :center="..." :zoom="..." />
   <!-- Fehlt: aria-label="Interactive map showing Pokemon sightings" -->
   
   <!-- App.vue - Icon-Buttons ohne Labels -->
   <MdlButton type="icon" icon="account_circle" />
   <!-- Fehlt: aria-label="User account" -->
   ```

3. **❌ Fokus-Management**
   - Kein Fokus-Trap in Modals
   - Keine Skip-Links
   - FAB-Button nicht keyboard-accessible als RouterLink

4. **❌ Fehlende Alt-Texte**
   ```vue
   <!-- AddView.vue, Zeile 60 -->
   <img :src="this.getPokemonIcon(pokemon['pokedex-id'])" />
   <!-- Fehlt: :alt="pokemon.name" -->
   ```

5. **❌ Formular-Accessibility**
   ```vue
   <!-- MdlInput.vue - Label-for-ID Binding funktioniert -->
   <input :id="label" />
   <label :for="label">{{ label }}</label>
   ```
   ✅ Grundsätzlich OK, ABER:
   
   **Probleme:**
   - Keine aria-describedby für Fehler
   - Keine aria-invalid bei Fehlern
   - Keine Live-Region für Fehleränderungen

6. **❌ Farbkontrast nicht geprüft**
   - Material Design Lite Farben müssen validiert werden
   - Besonders für amber-blue Theme

7. **❌ Keine Reduced Motion Unterstützung**
   ```css
   /* Fehlt in allen Komponenten: */
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

#### **Empfohlene Fixes:**

```vue
<!-- 1. MdlInput.vue verbessern -->
<template>
  <div
    class="mdl-textfield mdl-js-textfield"
    :class="{
      'is-invalid': !!errorMessage,
      'is-dirty': !!modelValue,
    }"
  >
    <input
      class="mdl-textfield__input"
      :type="type"
      :id="inputId"
      :value="modelValue"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? `${inputId}-error` : undefined"
      :aria-required="required"
      @input="updateModelValue($event.target.value)"
    />
    <label class="mdl-textfield__label" :for="inputId">
      {{ combinedLabel }}
    </label>
    <span 
      v-if="errorMessage"
      :id="`${inputId}-error`"
      class="mdl-textfield__error" 
      role="alert"
      aria-live="polite"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputId: `input-${Math.random().toString(36).substr(2, 9)}`,
    };
  },
};
</script>

<!-- 2. Map mit Accessibility -->
<GMapMap
  :center="mainStore.getPosition"
  :zoom="zoom"
  :options="options"
  @bounds_changed="boundsChanged"
  :key="options.mapId"
  role="application"
  aria-label="Interactive map showing Pokemon sightings in your area"
/>

<!-- 3. Icon Buttons mit Labels -->
<MdlButton 
  type="icon" 
  icon="account_circle"
  aria-label="Open user account settings"
/>

<!-- 4. Skip Links hinzufügen -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<!-- 5. Pokemon Images -->
<img 
  :src="getPokemonIcon(pokemon['pokedex-id'])" 
  :alt="`${pokemon.name} icon`"
  loading="lazy"
/>

<!-- 6. Live Region für Notifications -->
<div 
  role="status" 
  aria-live="polite" 
  aria-atomic="true"
  class="sr-only"
>
  {{ statusMessage }}
</div>
```

**Accessibility Score: 3/10** 🔴

---

### 🧪 **Kent C. Dodds** - Testing Expert Perspective

> *"Als Testing-Verfechter bin ich enttäuscht: Test-Setup vorhanden, aber keine einzige Test!"*

#### **Test-Situation:**

**Vorhanden:**
- ✅ Vitest konfiguriert
- ✅ @vue/test-utils installiert
- ✅ @pinia/testing vorhanden
- ✅ jsdom für Browser-API-Simulation
- ✅ Test-Ordner erstellt (`__tests__/`)

**Fehlt:**
- ❌ **KEINE EINZIGE TEST-DATEI!**
- ❌ Keine Unit Tests
- ❌ Keine Integration Tests
- ❌ Keine E2E Tests
- ❌ Keine Coverage-Konfiguration

#### **Kritische Testfälle die fehlen:**

1. **Store Tests**
   ```javascript
   // tests/stores/main.spec.js (FEHLT)
   describe('Main Store', () => {
     it('should set position correctly', () => {
       const store = useMainStore();
       store.setPosition({ lat: 48.2, lng: 15.6 });
       expect(store.getPosition).toEqual({ lat: 48.2, lng: 15.6 });
     });
     
     it('should handle failed userLoad by clearing token', async () => {
       // Mock failed request
       // Verify token is cleared
     });
     
     it('should filter sightings without pokedex-id', async () => {
       // Critical business logic!
     });
   });
   ```

2. **Component Tests**
   ```javascript
   // tests/components/MdlInput.spec.js (FEHLT)
   describe('MdlInput', () => {
     it('should emit update:modelValue on input', async () => {
       const wrapper = mount(MdlInput, {
         props: { label: 'Test', modelValue: '' }
       });
       
       await wrapper.find('input').setValue('test');
       expect(wrapper.emitted('update:modelValue')).toBeTruthy();
     });
     
     it('should display validation errors', () => {
       const error = [{ $message: 'Required field' }];
       const wrapper = mount(MdlInput, {
         props: { label: 'Test', error }
       });
       
       expect(wrapper.text()).toContain('Required field');
     });
     
     it('should debounce input updates', async () => {
       // Critical: Test debounce logic
     });
   });
   ```

3. **View Tests**
   ```javascript
   // tests/views/LoginView.spec.js (FEHLT)
   describe('LoginView', () => {
     it('should validate form before submit', async () => {
       // Test Vuelidate integration
     });
     
     it('should call userLogin on valid submit', async () => {
       // Test store interaction
     });
   });
   ```

4. **Router Tests**
   ```javascript
   // tests/router/guards.spec.js (FEHLT)
   describe('Router Guards', () => {
     it('should redirect to login when accessing auth route without token', () => {
       // Critical security test!
     });
     
     it('should redirect to home when accessing guest route with token', () => {
       // Test guard logic
     });
   });
   ```

5. **Utility Tests**
   ```javascript
   // tests/tools/index.spec.js (FEHLT)
   describe('Utilities', () => {
     it('should debounce function calls', async () => {
       vi.useFakeTimers();
       const fn = vi.fn();
       const debounced = debounce(fn, 500);
       
       debounced();
       debounced();
       debounced();
       
       expect(fn).not.toHaveBeenCalled();
       vi.advanceTimersByTime(500);
       expect(fn).toHaveBeenCalledOnce();
     });
     
     it('should throttle function calls correctly', async () => {
       // Test throttle implementation
     });
   });
   ```

#### **Empfohlenes Test-Setup:**

```javascript
// vitest.config.js erweitern
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/main.js',
        '**/*.spec.js',
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
    setupFiles: ['./tests/setup.js'],
  },
});

// tests/setup.js erstellen
import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock Material Design Lite
global.componentHandler = {
  upgradeElement: vi.fn(),
};

global.MaterialTextfield = {
  prototype: {
    checkValidity: vi.fn(),
  },
};

// Mock Geolocation
global.navigator.geolocation = {
  watchPosition: vi.fn(),
  clearWatch: vi.fn(),
};

// Mock localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
```

**Testing Score: 0/10** 🔴

---

### 📚 **Sarah Drasner** - Documentation & DX Expert Perspective

> *"Als Developer Experience-Expertin sehe ich viel Potenzial, aber die Dokumentation lässt zu wünschen übrig."*

#### **Dokumentations-Mängel:**

1. **❌ README.md ist generisch**
   ```markdown
   # pgmon
   
   This template should help get you started developing with Vue 3 in Vite.
   ```
   **Problem:** Keine projekt-spezifischen Informationen!
   
   **Sollte enthalten:**
   - Projekt-Beschreibung
   - Lernziele
   - Setup-Anleitung (inkl. Google Maps API Key)
   - Architektur-Übersicht
   - Komponenten-Dokumentation
   - Bekannte Limitierungen
   - Roadmap

2. **❌ Keine Code-Kommentare**
   ```javascript
   // Kaum erklärende Kommentare im Code
   // TODOs sind vorhanden aber nicht strukturiert
   ```

3. **❌ Keine Component Documentation**
   - Props nicht dokumentiert
   - Events nicht dokumentiert
   - Slots nicht dokumentiert
   - Keine Usage-Examples

4. **❌ Keine API-Dokumentation**
   - http/index.js hat Funktionen ohne JSDoc
   - Store Actions ohne Beschreibung

5. **❌ Fehlende LICENSE**
   - Kein License-File
   - Wichtig für öffentliches Projekt!

6. **❌ Keine CONTRIBUTING.md**
   - Als Lernprojekt wichtig für Beitragende

#### **Empfohlene Dokumentation:**

```markdown
<!-- README.md -->
# 🎮 PGMon+ - Pokémon Go Monitor

Ein Vue 3 Lernprojekt zur Demonstration der **Options API** mit Material Design Lite.

## 📚 Lernziele

Dieses Projekt demonstriert:
- ✅ Vue 3 Options API
- ✅ Vue Router mit Navigation Guards
- ✅ Pinia State Management
- ✅ Custom Component-Entwicklung (MDL-Wrapper)
- ✅ Form Validation mit Vuelidate
- ✅ Geolocation API Integration
- ✅ Google Maps Integration
- ✅ Axios HTTP Client
- ✅ PWA mit Vite-Plugin

## 🚀 Setup

### Voraussetzungen

- Node.js 18+
- Google Maps API Key ([Hier erstellen](https://developers.google.com/maps))

### Installation

1. Repository klonen
   ```bash
   git clone <repo-url>
   cd frontend-referenz
   ```

2. Dependencies installieren
   ```bash
   npm install
   ```

3. Umgebungsvariablen konfigurieren
   ```bash
   cp .env.example .env
   # .env bearbeiten und API Keys eintragen
   ```

4. Development Server starten
   ```bash
   npm run dev
   ```

## 🏗️ Architektur

### Ordnerstruktur

```
src/
├── components/     # Wiederverwendbare UI-Komponenten (MDL-Wrapper)
├── views/          # Seiten-Komponenten (Router-Views)
├── stores/         # Pinia Stores
├── router/         # Vue Router Konfiguration
├── http/           # Axios HTTP Client & API-Aufrufe
├── tools/          # Utility-Funktionen
└── assets/         # Statische Assets
```

### State Management

**Main Store** (`stores/index.js`)
- Position Management (Geolocation)
- User Authentication
- Pokemon Data (Pokedex, Sightings)
- Map Styling (Day/Night)

### Custom Components

#### `<MdlInput>`
Wrapped Material Design Lite Input mit Vue v-model Support.

**Props:**
- `modelValue: String` - Aktueller Wert
- `label: String` - Label-Text
- `type: String` - Input-Typ (text, email, password)
- `required: Boolean` - Pflichtfeld
- `error: Array` - Vuelidate Fehler-Array

**Events:**
- `update:modelValue` - Emit bei Wertänderung (debounced)

**Usage:**
```vue
<MdlInput
  v-model="email"
  label="E-Mail"
  type="email"
  required
  :error="v$.email.$errors"
/>
```

## 🔧 Konfiguration

### Google Maps API

1. API Key im [Google Cloud Console](https://console.cloud.google.com/) erstellen
2. Folgende APIs aktivieren:
   - Maps JavaScript API
   - Geocoding API
3. Domain-Restrictions setzen für Production

### Backend

Dieses Frontend benötigt ein Backend (nicht in diesem Repo).
API-Endpunkte siehe `src/http/index.js`.

## 🧪 Testing

```bash
npm run test:unit
```

**Hinweis:** Tests sind noch in Entwicklung.

## 📱 PWA

Das Projekt ist als PWA konfiguriert mit:
- Service Worker (Auto-Update)
- Offline-Support
- App-Icons für alle Plattformen

## 🤝 Contributing

Contributions sind willkommen! Bitte:
1. Fork erstellen
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## 📝 License

MIT License - siehe ```LICENSE``` Datei.

## 🙏 Credits

- Pokémon Icons: [Pokémon Company](https://www.pokemon.com)
- Material Design Lite: [Google](https://getmdl.io/)
- Vue.js: [Evan You & Team](https://vuejs.org/)

## ⚠️ Disclaimer

Dies ist ein **Lernprojekt**. Für Production-Use sind weitere Security-
Maßnahmen erforderlich (siehe SECURITY.md).

```javascript
// Component Documentation Example
/**
 * MdlButton - Material Design Lite Button Wrapper
 * 
 * @component
 * @example
 * <MdlButton type="raised" color="primary" @click="submit">
 *   Submit
 * </MdlButton>
 */
export default {
  name: 'MdlButton',
  props: {
    /**
     * Button icon name (Material Icons)
     * @type {String}
     */
    icon: String,
    
    /**
     * Disabled state
     * @type {Boolean}
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    
    /**
     * Button color scheme
     * @type {'primary'|'colored'|'accent'}
     * @default undefined
     */
    color: {
      type: String,
      validator: (value) => ['primary', 'colored', 'accent'].includes(value),
    },
    
    /**
     * Button type/style
     * @type {'raised'|'fab'|'mini-fab'|'icon'}
     * @default undefined
     */
    type: {
      type: String,
      validator: (value) => ['raised', 'fab', 'mini-fab', 'icon'].includes(value),
    },
  },
  // ...
};
```

**Documentation Score: 2/10** 🔴

---

### 🎯 **Addy Osmani** - Code Quality & Architecture Expert

> *"Als Chrome DevTools Engineer betrachte ich Code-Qualität und Wartbarkeit."*

#### **Code Quality Issues:**

1. **❌ Inkonsistente Namenskonventionen**
   ```javascript
   // Mischung aus snake_case und kebab-case
   "pokedex-id"      // kebab-case
   "sighting-id"     // kebab-case
   pokedex_id        // snake_case (in addSighting)
   
   // Inkonsistent!
   ```

2. **❌ Magic Numbers & Strings**
   ```javascript
   // Keine Konstanten
   timeout: 27000,              // Warum 27 Sekunden?
   maximumAge: 30000,           // Warum 30 Sekunden?
   this.debouncedModelValue(value, 500);  // Warum 500ms?
   throttle(function (coordinates) {...}, 15000);  // Warum 15s?
   
   // Besser:
   const GEOLOCATION_TIMEOUT = 27_000;
   const GEOLOCATION_MAX_AGE = 30_000;
   const INPUT_DEBOUNCE_DELAY = 500;
   const POSITION_THROTTLE_DELAY = 15_000;
   ```

3. **❌ Fehlende Error-Typen**
   ```javascript
   // http/index.js, Zeile 26
   function (error) {
     emitter.emit("api-error", error);
     return Promise.reject(error);
   }
   ```
   **Problem:** Keine Unterscheidung zwischen Error-Typen
   - 401 → Token abgelaufen
   - 403 → Keine Berechtigung
   - 404 → Nicht gefunden
   - 500 → Server-Fehler
   
   Sollten unterschiedlich behandelt werden!

4. **❌ Tight Coupling**
   ```javascript
   // Komponenten sind fest an MainStore gekoppelt
   // Schwierig zu testen und wiederzuverwenden
   ```

5. **❌ Fehlende Abstraktions-Layer**
   - API-Calls direkt in Store-Actions
   - Store-Zugriff direkt in Components
   - Keine Service-Layer

6. **⚠️ Commented Code**
   ```javascript
   // http/index.js hat viele auskommentierte Mock-Returns
   // return {
   //   data: {
   //     "auth-token": "..."
   //   }
   // };
   ```
   **Empfehlung:** In separates Mock-File auslagern oder löschen

7. **❌ Fehlende TypeScript**
   - Keine Type-Safety
   - Props ohne PropTypes-Validation teilweise
   - Fehleranfällig bei Refactoring

#### **Architektur-Empfehlungen:**

```javascript
// 1. Constants File erstellen
// src/constants/index.js
export const GEOLOCATION = {
  TIMEOUT: 27_000,
  MAX_AGE: 30_000,
  HIGH_ACCURACY: true,
};

export const DEBOUNCE_DELAYS = {
  INPUT: 500,
  BOUNDS_CHANGED: 500,
};

export const THROTTLE_DELAYS = {
  POSITION_UPDATE: 15_000,
};

export const MAP_STYLES = {
  DAY: '78649de0061d5eb1',
  NIGHT: 'eee5bb9f54be27b7',
};

export const API_KEYS = {
  POKEDEX_ID: 'pokedex-id',
  SIGHTING_ID: 'sighting-id',
  AUTH_TOKEN: 'auth-token',
};

// 2. API Service Layer
// src/services/api/index.js
class ApiService {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
    this.setupInterceptors();
  }
  
  setupInterceptors() {
    this.client.interceptors.request.use(this.handleRequest);
    this.client.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }
  
  handleError(error) {
    const { response } = error;
    
    switch (response?.status) {
      case 401:
        // Token abgelaufen
        emitter.emit('auth:expired');
        break;
      case 403:
        emitter.emit('auth:forbidden');
        break;
      case 404:
        emitter.emit('api:not-found', error);
        break;
      case 500:
        emitter.emit('api:server-error', error);
        break;
      default:
        emitter.emit('api:error', error);
    }
    
    return Promise.reject(error);
  }
}

export const apiService = new ApiService(
  import.meta.env.VITE_API_BASE_URL
);

// 3. Domain Services
// src/services/pokemon.js
export class PokemonService {
  static getIcon(pokedexId) {
    const paddedId = String(pokedexId).padStart(3, '0');
    return `/img/pokemon_icons/pokemon_icon_${paddedId}_00.png`;
  }
  
  static normalizeSightings(sightings) {
    return sightings.filter(s => s[API_KEYS.POKEDEX_ID]);
  }
}

// 4. Composables für Business Logic
// src/composables/useAuth.js
export function useAuth() {
  const store = useMainStore();
  const router = useRouter();
  
  const login = async (credentials) => {
    try {
      await store.userLogin(credentials);
      router.push({ name: 'home' });
    } catch (error) {
      // Handle error
    }
  };
  
  const logout = async () => {
    await store.userLogout();
    router.push({ name: 'login' });
  };
  
  return {
    isLoggedIn: computed(() => store.getLoggedIn),
    user: computed(() => ({
      name: store.getUserName,
      email: store.getUserEmail,
    })),
    login,
    logout,
  };
}
```

**Code Quality Score: 4/10** 🟡

---

### 🔐 **Troy Hunt** - Web Security & Best Practices

> *"Als haveibeenpwned-Creator sehe ich kritische Sicherheitslücken."*

#### **Zusätzliche Security-Bedenken:**

1. **❌ Keine Rate Limiting**
   - Login/Register ohne Client-Side Rate Limiting
   - Brute-Force-Angriffe möglich

2. **❌ Password-Handling**
   ```javascript
   // RegisterView.vue - Passwort wird im Klartext gesendet
   this.mainStore.userRegister({
     name: this.name,
     email: this.email,
     password: this.password, // ❌ Klartext
   });
   ```
   **Hinweis:** MUSS über HTTPS! Im Code nicht ersichtlich ob erzwungen.

3. **❌ Keine Password-Strength-Validation**
   ```javascript
   minLength: minLength(8), // Zu schwach!
   ```
   **Empfehlung:**
   - Mindestens 12 Zeichen
   - Complexity-Check (Zahlen, Sonderzeichen, Groß/Klein)
   - Common-Password-Check

4. **❌ Email-Validation zu simpel**
   ```javascript
   email: email, // Vuelidate email-Validator ist basic
   ```
   Akzeptiert invalide Emails wie `test@test`

5. **❌ Keine Session-Timeout**
   - Token lebt ewig im localStorage
   - Keine Auto-Logout bei Inaktivität

6. **❌ Fehlende Content Security Policy**
   ```html
   <!-- index.html - Keine CSP -->
   ```

7. **❌ Externe Ressourcen ohne SRI**
   ```html
   <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
   <!-- Fehlt: integrity="" crossorigin="" -->
   ```

#### **Security Checklist:**

```javascript
// 1. Password Strength Validator
// src/validators/password.js
import { helpers } from '@vuelidate/validators';

export const strongPassword = helpers.withMessage(
  'Password must contain at least one uppercase, lowercase, number and special character',
  (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecial;
  }
);

export const notCommonPassword = helpers.withMessage(
  'This password is too common',
  (value) => {
    const commonPasswords = ['password', '12345678', 'qwerty', ...];
    return !commonPasswords.includes(value.toLowerCase());
  }
);

// 2. CSP Header
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://maps.googleapis.com https://maps.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https://maps.googleapis.com https://maps.gstatic.com;
  connect-src 'self' https://maps.googleapis.com https://YOUR-API-DOMAIN.com;
">

// 3. Rate Limiting Helper
// src/utils/rateLimiter.js
export class RateLimiter {
  constructor(maxAttempts, windowMs) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }
  
  isAllowed(key) {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Filter alte Versuche
    const recentAttempts = userAttempts.filter(
      time => now - time < this.windowMs
    );
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }
}

// Usage
const loginLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15min

// 4. Secure Token Storage
// src/utils/secureStorage.js
export const secureStorage = {
  setToken(token) {
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24h
    const data = { token, expiresAt };
    localStorage.setItem('auth', JSON.stringify(data));
  },
  
  getToken() {
    const data = JSON.parse(localStorage.getItem('auth') || '{}');
    
    if (!data.token) return null;
    
    if (Date.now() > data.expiresAt) {
      this.clearToken();
      return null;
    }
    
    return data.token;
  },
  
  clearToken() {
    localStorage.removeItem('auth');
  },
};

// 5. Auto-Logout bei Inaktivität
// src/utils/autoLogout.js
export class AutoLogout {
  constructor(timeoutMinutes, onTimeout) {
    this.timeout = timeoutMinutes * 60 * 1000;
    this.onTimeout = onTimeout;
    this.timerId = null;
    
    this.events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    this.resetTimer = this.resetTimer.bind(this);
    
    this.start();
  }
  
  start() {
    this.events.forEach(event => {
      document.addEventListener(event, this.resetTimer);
    });
    this.resetTimer();
  }
  
  resetTimer() {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(this.onTimeout, this.timeout);
  }
  
  stop() {
    clearTimeout(this.timerId);
    this.events.forEach(event => {
      document.removeEventListener(event, this.resetTimer);
    });
  }
}
```

**Security Score: 2/10** 🔴


## 📊 Zusammenfassung aller Scores

| Kategorie | Expert | Score | Status |
|-----------|--------|-------|--------|
| Security | Mikko Hyppönen | 2/10 | 🔴 Kritisch |
| Vue.js Best Practices | Evan You | 6.5/10 | 🟡 Verbesserungsbedarf |
| Performance | Evan Bacon | 5/10 | 🟡 Verbesserungsbedarf |
| Accessibility | Léonie Watson | 3/10 | 🔴 Kritisch |
| Testing | Kent C. Dodds | 0/10 | 🔴 Kritisch |
| Documentation | Sarah Drasner | 2/10 | 🔴 Kritisch |
| Code Quality | Addy Osmani | 4/10 | 🟡 Verbesserungsbedarf |
| Web Security | Troy Hunt | 2/10 | 🔴 Kritisch |

**Gesamtscore: 3.1/10** 🔴


## 🚨 KRITISCHE Fixes (MUST vor Veröffentlichung)

### ⚡ **Prio 1 - Security (SOFORT)**

1. **Google Maps API Key aus Code entfernen**
   - `.env` Setup implementieren
   - `.env.example` erstellen
   - Domain-Restrictions im Google Cloud Console setzen

2. **Backend URL konfigurierbar machen**
   - Umgebungsvariable verwenden

3. **localStorage Security verbessern**
   - Token-Expiration implementieren
   - Auto-Logout bei Inaktivität

4. **CSP Header hinzufügen**

5. **Memory Leak fixen**
   ```javascript
   // App.vue - Case mismatch!
   data() {
     return {
       geoWatch: undefined, // ✅ Kleingeschrieben
     };
   },
   methods: {
     setPosition() {
       this.geoWatch = navigator.geolocation.watchPosition(...); // ✅ Kleingeschrieben
     }
   },
   unmounted() {
     navigator.geolocation.clearWatch(this.geoWatch); // ✅ Funktioniert jetzt
   }
   ```

### ⚡ **Prio 2 - Funktionalität (VOR Veröffentlichung)**

6. **README.md komplett neu schreiben**
   - Setup-Anleitung
   - Lernziele erklären
   - Architektur dokumentieren

7. **LICENSE hinzufügen**
   - MIT License empfohlen für Lernprojekte

8. **Basic Tests schreiben**
   - Mindestens Store-Tests
   - Component-Tests für MdlInput, MdlButton
   - Router-Guard-Tests

9. **Accessibility Basics**
   - ARIA-Labels für Icon-Buttons
   - Alt-Texte für Pokemon-Bilder
   - Input-Aria-Attribute

10. **Code-Splitting implementieren**
    ```javascript
    const MapView = () => import("@/views/MapView.vue");
    ```

### ⚡ **Prio 3 - Polish (NICE TO HAVE)**

11. **Performance-Optimierungen**
    - Image lazy loading
    - Virtual scrolling für Pokemon-Liste
    - Vite build optimization

12. **Error Boundaries**
    ```javascript
    errorCaptured(err, instance, info) {
      console.error('Error captured:', err, info);
      emitter.emit('app-error', err.message);
      return false;
    }
    ```

13. **Constants auslagern**
    - Magic numbers eliminieren
    - Konsistente Namenskonventionen

14. **JSDoc-Kommentare**
    - Alle Komponenten dokumentieren
    - Props/Events/Slots beschreiben


## ✅ Positive Aspekte (beibehalten!)

1. ✅ **Klare Projekt-Struktur**
2. ✅ **Konsistente Options API Nutzung**
3. ✅ **Saubere Komponenten-Komposition**
4. ✅ **Gute MDL-Component-Wrapper**
5. ✅ **PWA-Setup funktional**
6. ✅ **Router-Guards korrekt implementiert**
7. ✅ **Vuelidate-Integration gelungen**


## 🎓 Lernwert-Bewertung

**Als Lernprojekt: 7/10** 🟡

**Stärken:**
- Zeigt Options API sehr gut
- Custom Components sind lehrreich
- State Management gut demonstriert
- Router-Konzepte klar

**Verbesserungen für Lernwert:**
- Mehr Code-Kommentare mit Erklärungen
- Schritt-für-Schritt-Guide im README
- Tests als Lernbeispiele
- Common Pitfalls dokumentieren


## 📋 Priorisierte TODO-Liste

```markdown
## Phase 1: Production-Ready (KRITISCH)
- [ ] API Keys in .env auslagern
- [ ] .env.example erstellen
- [ ] .gitignore um .env erweitern
- [ ] geoWatch Memory Leak fixen
- [ ] README.md komplett überarbeiten
- [ ] LICENSE-Datei hinzufügen (MIT)
- [ ] CSP Header implementieren
- [ ] Token-Expiration implementieren
- [ ] ARIA-Labels für alle Icon-Buttons
- [ ] Alt-Texte für alle Images

## Phase 2: Quality Improvements (WICHTIG)
- [ ] Code-Splitting für alle Routes
- [ ] Basic Test Suite schreiben
  - [ ] Store Tests
  - [ ] Component Tests
  - [ ] Router Tests
- [ ] Error Boundaries implementieren
- [ ] Constants-Datei erstellen
- [ ] JSDoc für alle Komponenten
- [ ] Accessibility Audit durchführen
- [ ] Password-Strength-Validator
- [ ] Rate-Limiting für Login

## Phase 3: Polish (NICE TO HAVE)
- [ ] Performance-Audit (Lighthouse)
- [ ] Image-Optimization
- [ ] Virtual Scrolling
- [ ] Auto-Logout bei Inaktivität
- [ ] Service Layer abstrahieren
- [ ] Composables erstellen
- [ ] E2E Tests mit Playwright
- [ ] TypeScript Migration evaluieren
- [ ] Internationalization (i18n)
- [ ] Dark Mode Support
```


## 🎯 Empfehlung

**Für öffentliche Veröffentlichung:**

**JA, ABER** erst nach Implementierung von **mindestens Phase 1** der TODO-Liste.

Die **kritischen Sicherheitslücken** (API Keys, Memory Leaks) müssen zwingend behoben werden. Die **Dokumentation** muss erheblich verbessert werden, um als Lernressource zu funktionieren.

**Nach den Fixes:**
- Sehr gutes Lernprojekt für Vue 3 Options API ✅
- Zeigt real-world Patterns ✅
- Demonstriert Component-Entwicklung ✅
- Gute Basis für Erweiterungen ✅

**Nächste Schritte:**
1. Phase 1 komplett abarbeiten
2. Projekt auf GitHub veröffentlichen
3. Community-Feedback einholen
4. Phase 2 basierend auf Feedback
5. Blog-Post über Learnings schreiben

---

**Review erstellt von:** GitHub Copilot  
**Basis:** 8 Expert-Perspektiven  
**Datum:** 5. Oktober 2025
