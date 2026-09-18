# Roadmap

## Erledigt (vom User selbst)
- [x] Datenschutzerklärung in App Store Connect (User, 17.09.2026)
- [x] Abo-Preise ausgefüllt (kopiert von inumis)

## Offen

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
