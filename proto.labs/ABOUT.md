# Proto.labs: AI-Guided Prompt Engineering Experiments

## Der Meta-Prompt

Ich arbeite an einem **Meta-Prompt** – einem System-Prompt, der die Art und Weise steuert, wie ich mit AI arbeite.

Ich optimiere Priorisierungen im Prompt und füge manchmal neue Ideen/Konzepte hinzu.

**Ich verwende diesen Prompt seit Monaten. Immer. Für alles.**

---

## Experimente und Prompt-Entwicklungen

### Multi-Persona AI Review

**Code Review Prompt** (zusätzlich zum Meta-Prompt):

```
ich hab hier ein projekt, den frontend teil. der backend teil ist nicht verfügbar.
reviewe das projekt.
wähle dazu verschiedene personas (bekannte persönlichkeiten) die in genau den bereichen die du betrachtest profi sind.
zb: das framework, komponenten, security, usw. finde auch weitere perspektiven aus denen du es beleuchtest.

erstelle mir einen report im markdown format in welchem du eine generelle berwertung schreibst und darunter alle notwendigen verbesserungen auflistest.

es ist älter, es ist mit der options api geschrieben. absichtlich. es ist ein projekt zum lernen. es soll so viel wie möglich, so gut und klar zeigen. es verwendet absichtlich material design lite um zu lernen wie man komponenten schreibt. es verwendet noch nicht vite. die dependencies sind alle alt. 

ich möchte es public verfügbar machen und sicherstellen dass es auch gut ist.
zum vue lernen.
sei kritisch.
```

**Wiki/Guide Review Prompt** (auch zusätzlich zum Meta-Prompt):

```
hier habe ich jetzt noch die anleitung dazu reinkopiert. es gibt noch ein template projekt dazu.

bei der anleitung sind ein paar dinge drinnen die hier nicht passen. 
kannst du mir dazu auch noch eine beurteilung geben?
```

---

### Prompt-Debugging System

Ein Prompt, mit dem ich einen Prompt debuggen kann – das LLM loggt aktiv, was es verwendet.

---

### Automatisches Prompt-Loading System

Ein Prompt, mit dem das LLM selbständig, basierend auf der Anfrage, prüft ob es dazu einen passenden Prompt im Repo findet, ihn lädt und ausführt.

**Das System kann auch Dependencies handhaben.**

---

### Video Production System (Prompt-Based)

Ein prompt-basiertes Video-Produktions-System:

1. Es interviewed mich zum Konzept
2. Erstellt Slides
3. Schreibt das Script
4. Für NotebookLM habe ich einen Prompt, durch den ich meine Audio-Spur fürs Video bekomme

---

### XP Buddy (In Testing)

Noch Idee und Testing.

---

### Die Gemini-Challenge: Eine halbe Applikation zum Spaß

Ich habe Gemini von meinem Meta-Prompt erzählt und gefragt, was [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) eigentlich kann.

Um Gemini dann zu sagen: **Mein Prompt kann das auch alles.**

Gemini hat mir nicht geglaubt.

Dann haben wir einen Test arrangiert:

**Das Setup:**
- Gemini sagt mir, was ich meinem Prompt sagen soll
- Alle Fragen von meinem Prompt gebe ich an Gemini weiter
- In diesem Loop ist eine Applikation entstanden

**Was dabei herauskam:**
- Next.js + React
- Redis
- OAuth über Atlassian
- ASCII Mockups
- **Automatisches Debugging beim Implementieren** (Frontend + Backend)

Alles durch Prompt-Orchestrierung. Kein manuelles Coding.

---

### User Story System mit Realitäts-Check

Ich habe den Meta-Prompt auch zum **User Story Erstellen** geschrieben.

**Das Besondere:**

Wenn ich beim User Story Erstellen eine Story haben möchte, die nicht funktionieren wird – weil ich mir was einbilde, was mir das Dev Team nicht umsetzen wird...

**Beispiel:** Einen Button umfärben. Einfach so. Gegen die CI/Komponenten-Framework.

**Dann erstellt der Prompt mir eine Story für einen A/B-Test.**

Er erkennt den Konflikt, schlägt keine unrealistische Implementierung vor, sondern reframed das Problem in eine testbare Hypothese.

---

## Philosophie

Alle diese Experimente basieren auf der Idee, dass **Prompts programmierbar sind** – dass man komplexe Workflows durch sorgfältig komponierte Anweisungen orchestrieren kann.

Der Meta-Prompt ist das Fundament. Die einzelnen Prompts sind spezialisierte Module.

**Die Gemini-Challenge hat gezeigt:** Der Meta-Prompt kann nicht nur Code reviewen oder Videos planen – er kann auch vollständige Applikationen entwickeln, wenn man ihm die richtigen Fragen stellt.
