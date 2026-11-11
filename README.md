# KONIE KUJĄ

<img src="ikona/ikona-512.png" width="96" alt="Ikona: strzykawka">

Dziennik treningu na Androida dla kilku kolegów z siłowni. *Chcesz urosnąć? A boisz się igieł?*

## Instalacja na telefonie
1. Na telefonie otwórz stronę **Releases** tego repo i pobierz `konie-kuja.apk` z najnowszego wydania.
2. Otwórz pobrany plik. Android zapyta o zgodę na instalację z przeglądarki: zezwól.
3. Przy pierwszym uruchomieniu wpisz imię.

Aktualizacja: zainstaluj nowy plik na stary. Historia zostaje. Wyjątek: wersje 0.1.1–0.1.4 miały przypadkowy podpis; z nich trzeba raz odinstalować aplikację (najpierw ⋯ → Kopia historii).

## Co robi (wersja 0.1)
- 4 zestawy: PUSH 1, PULL, PUSH 2, NOGI. Kolejny w cyklu podświetlony na czerwono.
- Ciężar na dziś liczony z historii i przerwy (reguły niżej), zawsze do zmiany przyciskami −/+.
- Zapis serii, zamiana ćwiczenia na alternatywę, własne alternatywy.
- Postęp treningu jako strzykawka: im więcej ćwiczeń, tym głębiej wciśnięty tłok.
- Koniec treningu: „Climax.”, trener koń zapala papierosa.
- Historia i rekordy.
- „Przebuduj”: wpisujesz, na co masz ochotę (np. „klata i biceps, bez nóg, bark boli”), aplikacja składa trening. Bez klucza: skrypt w telefonie (rdzenie słów, negacja, ból). Z kluczem Gemini: „Zapytaj trenera” wysyła życzenie do modelu.
- Kopia historii jako tekst do skopiowania i wgrania na innym telefonie.

Wszystkie dane są tylko w telefonie. Z internetem łączy się tylko „Zapytaj trenera”, i tylko gdy w telefonie jest klucz.

## Trener na modelu (opcjonalnie)
1. Klucz: aistudio.google.com → Get API key → Create API key. Nie włączaj płatności, wtedy klucz nic nie kosztuje (darmowy poziom, limity w AI Studio).
2. W aplikacji: ⋯ → Klucz modelu → wklej → Zapisz i sprawdź. Aplikacja sama wybiera model Flash.
3. Klucz nigdy nie trafia do repo. Do Google idą: życzenie, lista ćwiczeń planu i nazwy ćwiczeń z 4 ostatnich treningów, bez imienia i ciężarów. Na darmowym poziomie Google może używać tych treści do ulepszania usług.
4. Błąd, brak internetu albo limit: zostaje lista ze skryptu.

## Ciężar na dziś
| Dni od ostatniego razu | Ciężar |
|---|---|
| do 10 | ten sam; +2,5 kg (hantle +2 kg) tylko po 3+ treningach i komplecie powtórzeń |
| 11–21 | ten sam |
| 22–42 | −10% |
| 43–90 | −15% |
| ponad 90 | −25% |

## Budowa
GitHub Actions (`.github/workflows/apk.yml`) buduje APK przy każdej zmianie w `www/` na `main` i publikuje go w Releases. Ręcznie: zakładka Actions → „Buduj APK” → Run workflow.

Lokalnie: `npm install`, `npx cap add android`, `cd android && ./gradlew assembleDebug` (wymaga JDK 21 i Android SDK).

## Plan
Plan domyślny jest w `www/plan.js`. Własny plan wgrywa się w aplikacji: ⋯ → Wgraj nowy plan.

## Podpis
`podpis/debug.keystore` to klucz debug Androida (hasło `android`) trzymany w repo, żeby każda wersja miała ten sam podpis i aktualizacja nie wymagała odinstalowania. Workflow wpisuje go wprost do `build.gradle` i po budowie sprawdza odcisk SHA-256 w APK; inny podpis zatrzymuje wydanie. To aplikacja dla znajomych, nie dla sklepu.

## Ikona
Strzykawka jak pasek postępu w aplikacji. Pliki PNG w `ikona/res/` (wszystkie gęstości Androida), generator `ikona/generuj.js` (Playwright). Workflow kopiuje je do projektu Androida przed budową.

## Licencje
Fonty: `www/fonts/LICENCJE.md`.
