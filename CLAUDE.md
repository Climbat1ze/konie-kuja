# KONIE KUJĄ

Dziennik treningu siłowego na Androida (APK) dla właściciela i kilku kolegów. Ton: żart z koksu i trener koń z kreskówki w stylu Painta. Repo jest publiczne.

## Zasady pracy
- Rozmowa i pliki po polsku. Teksty w aplikacji krótkie, rubaszne, bez wulgaryzmów.
- **Poufność (repo publiczne):** w kodzie, commitach i plikach nie ma imion, historii treningów, notatek zdrowotnych, nazw prywatnych repo ani kluczy. Historia i kopie żyją tylko w telefonie i w prywatnym repo właściciela.
- **Klucze:** klucz Gemini i token GitHub tylko w telefonie (⋯ → Trener (model)). Token Claude'a tylko w sekretach prywatnego repo. Nic z tego nie trafia tutaj.
- Każda zmiana w `www/`, `ikona/`, `package.json` lub workflow na `main` buduje nowe APK i wydanie. Commit = wydanie dla kolegów: przed pushem test w przeglądarce (Playwright, `www/index.html` przez lokalny serwer).
- Aktualizacja blokowana na Samsungu: przyczyną był Auto Blocker (Ustawienia → Zabezpieczenia i prywatność), potrafi włączyć się sam. Na czas aktualizacji wyłączyć.
- Nie zmieniaj `podpis/debug.keystore`: inny klucz = koledzy muszą odinstalować aplikację i tracą historię.

## Budowa
- `www/`: cała aplikacja (HTML, CSS, JS bez bibliotek), `plan.js` plan domyślny, `wersja.js` numer wersji (wpisuje go workflow).
- Capacitor 7.4.4 opakowuje `www/` w APK. `CapacitorHttp` włączony (zapytania natywne, bez CORS).
- `.github/workflows/apk.yml`: `cap add android`, ikona z `ikona/res`, podpis z `podpis/debug.keystore` wpisany do `build.gradle`, versionCode = numer przebiegu, kontrola odcisku SHA-256, wydanie `v0.1.N` w Releases.

## Dane w telefonie (localStorage `kk.v1`)
- `historia[]`: `{id, data, typ, serie: {idĆwiczenia: [{kg, r}]}, min, notatki?, ocena?}`. Seria zapisuje się pod ćwiczeniem faktycznie zrobionym (po zamianie: `ALT:<nazwa>` albo id z planu).
- `aktywny`: trening w toku (serie z polem `ex`, zamiany, notatki).
- `alternatywy`, `altInfo` (zamienniki od trenera), `ai` (Gemini), `claude` (repo i token GitHub), `kopia` (data ostatniej kopii).
- Aktualizacja APK na starą wersję zachowuje dane. Po odinstalowaniu: ⋯ → Przywróć kopię z repo albo Wgraj kopię.

## Reguły ciężaru na dziś (`suggest()`)
| Dni od ostatniego razu | Ciężar |
|---|---|
| do 10 | ten sam; +2,5 kg (hantle +2) tylko po 3+ treningach i komplecie powtórzeń |
| 11–21 | ten sam |
| 22–42 | −10% |
| 43–90 | −15% |
| ponad 90 | −25% |
Ciężar od trenera (ocena) to tylko podpowiedź, ucięty do +5% najcięższej serii. Decyzja zawsze należy do użytkownika (przyciski −/+).

## Trener (model)
- **Bez modelu:** „Przebuduj” to skrypt: rdzenie słów → partie, negacja („bez”, „nie”, „oprócz”) i ból wykluczają partię.
- **Claude (pierwszeństwo):** telefon zapisuje `prosby/<id>.json` w prywatnym repo; tam workflow odpowiada plikiem `odpowiedzi/<id>.json` (Claude na subskrypcji, bez narzędzi, limit dzienny). Typy prośby: `trening` (Przebuduj), `ocena` (ekran końca), `zamiana` (Zamień). Notatki idą tylko do Claude'a.
- **Gemini (zapas):** klucz w telefonie, wywołanie wprost, bez notatek (darmowy poziom może używać treści).
- Odpowiedź modelu zawsze sprawdzana z planem: nieznane id odpada.

## Nastrój trenera
Postęp = ćwiczenia z co najmniej jedną serią / wszystkie. Poniżej 1/3: obrzydzenie („Fuj.”), do 2/3: dezaprobata („Słabo.”), od 2/3: bicepsy („Prawie.”), komplet: papieros („Climax.”). Strzykawka pokazuje faktyczny postęp, pusta tylko przy komplecie.

## Otwarte
- Przegląd reguł ciężaru przez model raz w miesiącu, po 4–6 treningach w aplikacji (decyzja właściciela).

