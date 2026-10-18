#!/usr/bin/env python3
"""Registriert GoogleService-Info.plist im Xcode-Projekt (App-Ziel, Ressourcen).

Aufruf:  python3 add_google_plist.py <ios/App/App> <project.pbxproj>
Die Datei muss bereits in <ios/App/App> liegen. Idempotent: laeuft mehrfach ohne Schaden.
"""
import os
import sys

NAME = "GoogleService-Info.plist"
FREF = "AAAA0000000000000000F0F0"
BUILD = "AAAA0000000000000000F0F1"


def insert_after(text, marker, addition):
    idx = text.find(marker)
    if idx == -1:
        sys.exit("FEHLER: Marker im Xcode-Projekt nicht gefunden:\n" + marker)
    end = text.find("\n", idx) + 1
    return text[:end] + addition + text[end:]


def main():
    if len(sys.argv) != 3:
        sys.exit("Aufruf: python3 add_google_plist.py <ios/App/App> <project.pbxproj>")
    app_dir = os.path.abspath(sys.argv[1])
    pbx_path = os.path.abspath(sys.argv[2])

    if not os.path.isfile(os.path.join(app_dir, NAME)):
        sys.exit("FEHLER: %s fehlt in %s" % (NAME, app_dir))

    with open(pbx_path, encoding="utf-8") as f:
        text = f.read()

    if NAME in text:
        print(NAME + " ist bereits im Xcode-Projekt registriert – nichts zu tun.")
        return

    text = insert_after(
        text,
        "/* Begin PBXBuildFile section */",
        "\t\t%s /* %s in Resources */ = {isa = PBXBuildFile; fileRef = %s /* %s */; };\n"
        % (BUILD, NAME, FREF, NAME),
    )
    text = insert_after(
        text,
        "/* Begin PBXFileReference section */",
        '\t\t%s /* %s */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; fileEncoding = 4; path = "%s"; sourceTree = "<group>"; };\n'
        % (FREF, NAME, NAME),
    )
    text = insert_after(
        text,
        "50B271D01FEDC1A000F3C39B /* public */,",
        "\t\t\t\t%s /* %s */,\n" % (FREF, NAME),
    )
    text = insert_after(
        text,
        "2FAD9763203C412B000D30F8 /* config.xml in Resources */,",
        "\t\t\t\t%s /* %s in Resources */,\n" % (BUILD, NAME),
    )

    with open(pbx_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(NAME + " wurde ins Xcode-Projekt eingetragen (Ziel: App, Ressourcen).")


if __name__ == "__main__":
    main()
