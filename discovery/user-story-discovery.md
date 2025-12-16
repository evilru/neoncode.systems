# User Story: GitHub Repo Reviews mit WSPL-generiertem Prompt

Datum: 2024-11-30
Cynefin-Klassifikation: Complex

Als WSPL-Entwickler
Möchte ich GitHub Trending Repos mit einem von der WSPL Engine generierten Prompt reviewen
Und die Reviews als Markdown auf meiner Website veröffentlichen
Um die Wirksamkeit des WSPL-Konzepts zu validieren
Und durch qualitativ hochwertige, aktuelle Content-Reviews organische Sichtbarkeit zu erlangen

Business Value: 
- Proof of Concept für WSPL-generierte Prompts
- SEO-optimierter Content durch wöchentliche Reviews trending Projekte
- Persönliche Sichtbarkeit in der Developer-Community
- Kontinuierliches Lernen über Prompt-Qualität und Engine-Fähigkeiten

MVP-Scope: 2-3 Test-Reviews zur initialen Validierung, danach direkter Produktiv-Einsatz

## Akzeptanzkriterien

**Szenario: Review wird erfolgreich generiert**
Angenommen ich habe ein GitHub Trending Projekt ausgewählt
Und eine User Story für den Review erstellt
Und die WSPL Engine hat daraus einen Prompt generiert
Wenn ich den Prompt mit der Auriga Engine auf das Projekt anwende
Dann wird ein vollständiger Review als Markdown-Datei generiert
Und der Review ist lesbar und strukturiert

**Szenario: Review nutzt Personas als Experten**
Angenommen der generierte Prompt wird ausgeführt
Wenn die Auriga Engine das Projekt analysiert
Dann werden passende Personas (bekannte Persönlichkeiten) als Experten gewählt
Und diese Personas reviewen aus ihrer jeweiligen Expertise-Perspektive

**Szenario: Review ist ausgewogen und konstruktiv**
Angenommen der Review ist vollständig generiert
Wenn ich den Inhalt prüfe
Dann enthält der Review sowohl positive Aspekte als auch Verbesserungspotenziale
Und der Ton ist konstruktiv und respektvoll gegenüber den Maintainern
Und Findings sind als Entwicklungschancen formuliert

**Szenario: Output ist website-ready**
Angenommen der Review ist generiert
Wenn ich die Markdown-Datei betrachte
Dann ist das Format für die Website-Veröffentlichung geeignet
Und enthält relevante Metadaten (Datum, Commit-Hash, Projekt-Link)
Und ist für die Zielgruppe (Developer-Community) ansprechend formatiert

---

## Discovery-Session

*🎭 Aktive Personas: Sherlock Holmes (Analytiker, Mustererkenner), Dr. John Watson (Praktiker, Dokumentar)*
*📍 Ort: 221B Baker Street, London – Wohnzimmer mit Kamin, Regen draußen*

### Erkenntnisse aus der Entdeckung

**Kontext:**
- Nutzer hat prinzipien- und feldbasiertes Konzept entwickelt (WSPL-System)
- LLMs nutzen dieses Konzept zum Schreiben von Prompts
- Hypothese: LLMs funktionieren damit besser
- Auriga Engine = Teil dieses Systems (systemischer Coach & Requirements Engineer)
- Test-Setup: User Story für GitHub Repo Reviews schreiben → WSPL Engine generiert daraus Prompt → Testen, wie gut dieser spezielle Prompt funktioniert
- Prompts unterscheiden sich von normalen Prompts
- Ziel: Funktionsweise der WSPL-generierten Prompts evaluieren

**Existierender Prompt als Referenz:**
- Nutzer hat bereits funktionierenden Prompt für GitHub Repo Reviews
- Dieser Prompt dient als Quelle/Basis für die Story
- Review-Funktion: Trending GitHub Repos analysieren, ausgewogene Bewertung, konstruktives Feedback, Personas als Experten, Report in Markdown mit Template

**Motivation & Zielgruppe:**
- Persönliche Sichtbarkeit durch Teilen der Ergebnisse
- Nachweis der Wirksamkeit des WSPL-Konzepts
- Zielgruppe: Öffentlichkeit (potenzielle Nutzer, Community, Interessierte)
- SEO-Content durch regelmäßige, qualitativ hochwertige Reviews aktueller Projekte

**Business Value:**
- Wöchentliche Review-Serie (1x/Woche)
- Output-Evaluation: Qualität der generierten Reviews
- Prompt-Capabilities: Fähigkeiten der Auriga Engine verstehen
- Lernen & Tracking: Kontinuierliche Verbesserung durch Beobachtung
- Organische Sichtbarkeit: Aktuelle, relevante Reviews ziehen Traffic an
- SEO-Effekt: Content zu trending Projekten

**Scope:**
- Einfache Story gewünscht (kein komplexes Szenario)

### Constraints (Randbedingungen)

**WSPL-Konzept als Rahmen:**
- LLM erhält "Bühne" statt Einschränkungen
- System profitiert automatisch von LLM-Verbesserungen
- Keine rigide Struktur, die Innovation begrenzt

**Technischer Workflow:**
- Manueller Prozess in VS Code (lokal)
- Projekt-Auswahl: Erstes größeres Projekt aus GitHub Weekly Trending Liste
- Kein automatisiertes Deployment

### Nicht-funktionale Anforderungen (NFRs)

**Usability:**
- Review muss ohne weitere Bearbeitung auf Website veröffentlichbar sein
- Format-Freiheit für die Engine (kein starres Template)

**Wartbarkeit:**
- System soll von LLM-Verbesserungen automatisch profitieren
- Keine aufwändigen Anpassungen bei Modellupdates

**Performance:**
- Wöchentlicher Rhythmus (1 Review/Woche) muss praktikabel sein
- Manuelle Durchführung darf nicht zu zeitintensiv sein

### Key Insights

**Kern-Philosophie:**
- WSPL als "ermöglichendes Framework" statt restriktives Regelwerk
- LLM-Skalierbarkeit: System wird besser, wenn LLMs besser werden
- Pragmatischer Ansatz: 2-3 Tests, dann direkter Einsatz
- Kontinuierliche Evolution statt perfektionierter Vorab-Planung

**Technischer Workflow:**
- Manueller Prozess in VS Code (lokal)
- Projekt-Auswahl: Erstes größeres Projekt aus GitHub Weekly Trending Liste
- Tools: VS Code + WSPL Engine + Auriga Engine

**Output & Veröffentlichung:**
- Veröffentlichung auf eigener Website
- Format: Markdown-Datei
- Kein vorgegebenes Format – Erwartung: Auriga Engine erzeugt passendes Format

**MVP-Scope:**
- 2-3 Test-Reviews zur Validierung
- Bei zufriedenstellendem Ergebnis: Direkter Einsatz ohne weitere Iteration
- Weitere Optimierung erfolgt später bei Bedarf

### Implementierungs-Hinweise

**Review-Inhalt (aus Referenz-Prompt):**
- Projekt-Verständnis: Tooling, Dependencies, Configuration
- Ausgewogene Perspektive: Was funktioniert gut + Verbesserungspotenziale
- Konstruktiver Ton: Findings als Chancen, nicht Fehler
- Personas: Experten für Framework, Security, Architektur etc.
- Markdown-Report mit Metadaten

**Workflow-Schritte:**
1. User Story für Review erstellen (mit Auriga Engine)
2. WSPL Engine generiert Prompt aus Story
3. Prompt auf ausgewähltes Trending Repo anwenden
4. Generiertes Markdown auf Website veröffentlichen
5. Nach 2-3 Tests: Entscheidung über Produktiv-Einsatz
