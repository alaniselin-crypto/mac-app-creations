#!/bin/bash
# ============================================================
#  Numismatik-iPhone v70 – Vorbereitung fuer Xcode
#  Startet man per Doppelklick (bzw. "Trotzdem oeffnen").
#  Macht: Installation, Bau, Google-Datei einbinden, Xcode starten
# ============================================================
cd "$(dirname "$0")" || exit 1

PLIST_NAME="GoogleService-Info.plist"

pause_on_fail() {
  echo ""
  echo "Es ist ein Fehler aufgetreten (siehe oben)."
  echo "Mach am besten einen Screenshot und schick ihn an mich."
  read -n 1 -s -r -p "Beliebige Taste druecken zum Schliessen"
  exit 1
}

echo "=============================================="
echo "  Numismatik-iPhone v70 – Vorbereitung"
echo "=============================================="
echo ""

echo "Schritt 1/5: Programme installieren (dauert einige Minuten)..."
npm install --no-audit --no-fund || pause_on_fail
echo ""

echo "Schritt 2/5: App-Seiten bauen..."
npm run build:ios || pause_on_fail
echo ""

echo "Schritt 3/5: Google-Einstellungen pruefen..."
npm run prepare:ios || pause_on_fail
echo ""

echo "Schritt 4/5: Google-Datei einbinden..."
PLIST_SRC=""
if [ -f "ios/App/App/$PLIST_NAME" ]; then
  PLIST_SRC="ios/App/App/$PLIST_NAME"
else
  for d in \
    "$HOME/Meine Ablage/Projekte/Cursor" \
    "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Meine Ablage/Projekte/Cursor" \
    "$HOME/Library/Mobile Documents/com~apple~CloudDocs" \
    "$HOME/Downloads" "$HOME/Desktop" "$HOME/Documents"; do
    found=$(find "$d" -maxdepth 4 -name "$PLIST_NAME" -print -quit 2>/dev/null)
    if [ -n "$found" ]; then
      PLIST_SRC="$found"
      break
    fi
  done
fi
if [ -z "$PLIST_SRC" ]; then
  echo ""
  echo "Ich konnte die Datei $PLIST_NAME nicht automatisch finden."
  echo "=> ZIEHE die Datei jetzt einfach mit der Maus in dieses Fenster"
  echo "   und druecke danach die Enter-Taste."
  read -r PLIST_SRC
  PLIST_SRC="${PLIST_SRC//\'/}"
  PLIST_SRC="${PLIST_SRC//\"/}"
fi
if [ ! -f "$PLIST_SRC" ]; then
  echo "FEHLER: Datei nicht gefunden: $PLIST_SRC"
  pause_on_fail
fi
echo "Gefunden: $PLIST_SRC"
cp -f "$PLIST_SRC" "ios/App/App/$PLIST_NAME" || pause_on_fail
python3 scripts/add_google_plist.py ios/App/App ios/App/App.xcodeproj/project.pbxproj || pause_on_fail
echo ""
echo "Schritt 5/5: App-Seiten in Xcode synchronisieren..."
npx cap sync ios || pause_on_fail

echo ""
echo "=============================================="
echo "  FERTIG – Xcode wird geoeffnet..."
echo "=============================================="
echo ""
sleep 1
open "ios/App/App.xcodeproj"
echo "Jetzt in Xcode:"
echo "  1. Oben in der Kopfzeile links das Geraet auf  'Any iOS Device (arm64)'  stellen"
echo "  2. Oben im Menue:  Product -> Archive"
echo "  3. Im Fenster:  Distribute App -> App Store Connect -> Upload"
echo ""
read -n 1 -s -r -p "Beliebige Taste druecken zum Schliessen"
exit 0
