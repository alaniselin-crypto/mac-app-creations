# Roadmap

## Erledigt (vom User selbst)
- [x] Datenschutzerklärung in App Store Connect (User, 17.09.2026)
- [x] Abo-Preise ausgefüllt (kopiert von inumis)

## Offen

### Erneute Fehler v69 / DMG (18.10.2026)
- [x] iPhone-Paket geprüft: Google-Anbieter enthalten, aber GoogleService-Info.plist fehlt im Paket und im Xcode-Ziel; Plugin beendet Initialisierung bei fehlender Datei und kann dieselbe Anbieter-Meldung zeigen
- [ ] iPhone v70: Paket baut, das GoogleService-Info.plist auf dem iMac automatisch findet (Cursor-Ordner/Downloads/Desktop), nach ios/App/App kopiert, in das Xcode-Ziel einträgt (add_google_plist.py) und Xcode öffnet; User führt nur noch START-iPhone.command + Archive aus
- [x] Mac-Quellcode: quadratische Münzbilder wiederhergestellt, Banknoten unverändert; noch nicht in neuer DMG geliefert
- [ ] Neue Pakete erst nach Prüfung bereitstellen; echte Geräteprüfung bleibt erforderlich

### Geräteabgleich (18.10.2026)
- [x] Ursache im Quellcode eingegrenzt: kein laufender Cloud-Empfang; weitere mögliche Ursachen offen, tatsächliche Gerätedaten nicht zugänglich; SKU-Logik unverändert
- [x] Laufenden Cloud-Empfang und erneutes Lesen bei Rückkehr/Verbindung ergänzt; 3 Abgleich-Tests und 11 bestehende Schutztests bestanden (kein echter Gerätetest)
- [ ] Falsches Bild/Angaben mit Screenshots der drei Geräte vergleichen – benötigt Screenshots und Angabe, welche Münzversion richtig ist
- [ ] Aktualisierte Mac- und iPhone-Pakete bereitstellen – vorher verbleibende Ursache anhand Gerätedaten klären, vorhandene DMG/TestFlight enthalten diese Änderung noch nicht
- [ ] Korrektur auf iMac, MacBook Air und iPhone gemeinsam bestätigen – benötigt aktualisierte installierte Apps und Geräteprüfung

### Mac und iPhone (17.10.2026)
- [x] Mac-Quellcode geprüft; undefinierte Foto-Felder vor dem Cloud-Speichern entfernt (2 Tests bestanden), Anmeldedienst erreichbar
- [x] iPhone: fehlende Google-Anbieter-Konfiguration eingegrenzt; prepare:ios synchronisiert und prüft sie (3 Tests bestanden)
- [ ] Tatsächliche Mac-DMG und geräteübergreifende Synchronisierung testen – benötigt die verwendete DMG und einen Mac
- [ ] iPhone-Anmeldung im neuen TestFlight-Paket testen – benötigt neues Xcode-Archiv und Upload
- [x] iPhone-Paket v67 erstellt (17.10.2026): Build-Nummer 67 im Xcode-Projekt gesetzt, Web-Seiten frisch gebaut und synchronisiert, Google-Anbieter validiert; Numismatik-iPhone-v67.zip mit START-iPhone.command geliefert

### Windows-Punkte (User-Liste, 21.09.2026 – korrigiert und geprüft in v20)
- [x] SKU-Nummerierung nach vollständigem Cloud-Laden zuverlässig auf 00001 zurücksetzen
- [x] Analyse-Darstellung: störende Breitenregel entfernen und Diagramme sichtbar prüfen
- [x] Hauptfenster kleiner: 1120×760 (statt 1280×850)
- [x] Dashboard: Dollar-Symbol durch Münz-Symbol ersetzt, Beträge sind CHF
- [x] CSV- und Bildimport: Duplikate vor neuer SKU-Vergabe erkennen
- [x] Einstellungen oben rechts: Breitenbegrenzung reparieren und Menü sichtbar prüfen

### Fehlerliste des Users (17.09.2026)
- [ ] Eigene Felder anlegen/verwalten (Admin)
- [x] Einstellungen: Datensicherung & CSV Export/Import ohne Funktion (v11: iPhone nutzt natives Teilen-Menü via @capacitor/filesystem + share)
- [ ] Material und Legierung standardmässig leer
- [ ] Einstellungen: Anleitung und Hilfe
- [ ] Einstellungen-Fenster verschiebt sich links/rechts
- [ ] Hauptbildschirm verschiebt sich links/rechts
- [ ] Datenschutzerklärung ganz unten bei der Anmeldung
- [ ] Übersicht: mit welchen Diensten ist Numismatik verbunden (GitHub etc.)
- [ ] Konto löschen funktioniert nicht
- [ ] Wo werden Benutzerbilder gespeichert (Cloud?) – klären und anzeigen
- [x] Admin-eigene Felder, nur für Admin sichtbar (v10, Code MZ-ADMIN)
- [ ] KI-Bilderkennung: Felder automatisch ausfüllen
- [ ] Makro-Foto
- [ ] Druckansicht & Katalog-Export schöner darstellen (Bild IMG_5007)
- [x] Eigene Felder: neue Feldtypen «Checkbox» und «Dropdown» (mit eigenen Optionen) ergänzen – NICHT sofort als Version bauen, User sammelt noch (Bild image-26, 17.09.)
- [x] Münzbilder: KORREKTUR – runde Form BLEIBT (Quadrat-Wunsch zurückgezogen, 17.09.); Banknoten rechteckig (bestätigt)
- [x] Detailansicht: nur EIN Löschen-Button (aktuell 2x «Löschen», Bild image-36, 18.09.)
- [x] Klick auf goldenes App-Symbol → Infofenster mit «Numismatik.App» und Name «Alan Iselin» statt Logo-Download-Fenster (18.09.)
- [x] Schriftgrösse insgesamt etwas kleiner (Bild image-29, 17.09.)
- [x] CSV-Import-Bug: Backup mit 61 Münzen, nach Löschen nur 20 importiert – Import bricht/limitiert (17.09.)
- [ ] Weitere Bilder vom User abwarten

### App Store
- [ ] Datenschutz-Seite veröffentlichen (auf Users Wort)
- [ ] Support-URL für Apple
- [ ] Bundle-ID von .test auf finalen Namen wechseln
- [ ] 3 Abo-Technik-Punkte: Server-Prüfung gegen doppelte/veraltete Käufe, Apple-Server-Meldungen, echter Testkauf
- [ ] Banknoten rechteckig darstellen (nicht im Kreis), Münzen quadratisch (Bild image-30, 17.09.)

- v10 gebaut (18.09.2026): /mnt/documents/Numismatik-App-v10.zip
- v11 gebaut (18.09.2026): Backup am iPhone repariert (Teilen-Menü), goldenes Münz-Logo oben links statt altem Symbol; iOS-Flow jetzt `npx cap sync ios` statt copy

- v22 (23.09.2026): SKU-Nummern werden nie wiederverwendet – geloeschte Nummer (z.B. 00009) bleibt frei, naechste neue Muenze bekommt 00010. Windows-Paket v22 geliefert.

### SKU-Korrektur v23 (23.09.2026)
- [x] Bestand einmalig ab 00001 neu nummerieren
- [x] Danach gelöschte SKU dauerhaft nie wieder vergeben
- [x] Beide Regeln gemeinsam prüfen und Windows-Paket liefern

### iPhone v23 (24.09.2026)
- [x] Quellcode v23 (SKU-Fixes) für iPhone bereitgestellt: ios/-Ordner neu erstellt (war in allen ZIPs verloren), StoreKit-Brücke neu geschrieben, Symbol + Kamera-Zulassung, Name „Numismatik"
- [x] Numismatik-App-v23-Quellcode.zip nach /mnt/documents/ geliefert
- [x] Xcode-Fehler „Cannot find MyViewController in scope“ korrigiert: MyViewController.swift und AppleStoreKit.swift im App-Ziel eingebunden
- [x] Terminal-Befehle (npm install/build:ios/cap sync) überflüssig gemacht: v23-Fertig.zip enthält gebaute App-Seiten direkt im ios/App/Public — User öffnet nur noch Xcode
- [ ] User: Xcode öffnen (ios → App → App.xcodeproj) → Team wählen → Any iOS Device (arm64) → Product → Archive → Distribute App → Upload
- [ ] Nach Upload: neue Screenshots 02/03 (CHF NaN) ersetzen

### Mac-DMG (18.10.2026)
- [x] Mac-ZIP aus v67-Quellcode gebaut (Numismatik-Mac.zip im Dateien-Bereich)
- [x] DMG-Bau auf iMac blieb beim Signieren haengen → neue Mac-ZIPs mit Installieren.command und Muenz-Symbol (Apple-Chip + Intel, 18.10.2026)
- [x] Echte DMG für Apple-Chip ohne Mac erstellt (Numismatik-Mac-Apple-Chip.dmg, Grundsignatur, 18.10.2026)
- [ ] User: DMG auf dem iMac öffnen, App in Programme ziehen, Start + Anmeldung testen

### Abgleich v68 (18.10.2026)
- [x] Ursache: Münzen blieben still nur lokal (Upload fehlgeschlagen, z. B. Fotos zu gross); Testmünzen-Knopf entfernt
- [x] Fotos werden für die Cloud automatisch verkleinert; Hinweis + Knopf «Jetzt in die Cloud senden»
- [x] Numismatik-Mac-v68.dmg und Numismatik-iPhone-v68.zip geliefert
- [ ] User: v68 auf MacBook Air + iMac installieren, auf dem Air «Jetzt in die Cloud senden»; iPhone v68 via Xcode hochladen

### iPhone v69 (18.10.2026)
- [x] Xcode-Fehler «Cannot find MyViewController» dauerhaft korrigiert (SceneDelegate nutzt CAPBridgeViewController) und Paket v69 gebaut (Numismatik-iPhone-v69.zip, Build-Nummer 69, Google-Anbieter + Web-Assets enthalten)
- [ ] User: v69 entpacken, START-iPhone.command, Xcode → Team → Any iOS Device → Archive → Upload
