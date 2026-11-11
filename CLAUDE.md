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
- `pending`: prośby do Claude'a bez odpowiedzi (`id`, `typ`, `wish`/`hid`/`slot`, `t`).
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
- Spóźniona odpowiedź (GitHub w kolejce dłużej niż 4 min): prośba zostaje w `pending` w telefonie, `checkPending()` dociąga ją przy starcie, po powrocie do aplikacji i co 30 s; po 24 h prośba przepada.

## Nastrój trenera
Postęp = ćwiczenia z co najmniej jedną serią / wszystkie. Poniżej 1/3: obrzydzenie („Fuj.”), do 2/3: dezaprobata („Słabo.”), od 2/3: bicepsy („Prawie.”), komplet: papieros („Climax.”). Strzykawka pokazuje faktyczny postęp, pusta tylko przy komplecie.

## Gadka konia (`www/gadka.js`)
- Docinki losowane bez powtórek (ostatnie 8) według sytuacji: start (dni od ostatniego treningu: pierwszy, świeży 0–1, ok 2–4, leniwy 5–9, martwy 10+), nastrój w trakcie, zdarzenie po serii (rekord, mało/dużo powtórzeń, lżej/ciężej niż podpowiedź), przerwa od 4 min, trening ponad 90 min, ekran końca.
- Styl: zaczepnie i złośliwie, żarty z igieł i koksu, bez wulgaryzmów. Wspólny żart: leniwego wyprzedzi hydraulik; czasem hydraulik nuci piosenkę z kabaretu (ucięta przed końcem).
- **Reguła 21:** gdy w liczbach sytuacji pojawi się 21 (ciężar, powtórzenia, minuty, dni przerwy, liczba serii, dzień miesiąca), koń zawsze wtrąca skojarzenie z hydraulikiem. Ta sama reguła jest w zasadach dla modelu (aplikacja i workflow trenera).
- Nowe docinki dopisuj w `G` w `gadka.js`; zmienne w nawiasach: `{imie}`, `{dni}`, `{r}`, `{cel}`, `{kg}`, `{min}`.

## Otwarte
- Przegląd reguł ciężaru przez model raz w miesiącu, po 4–6 treningach w aplikacji (decyzja właściciela).

