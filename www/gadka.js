/* Gadka trenera konia: docinki według sytuacji, losowane bez powtórek.
   Reguła 21: gdy w liczbach sytuacji pojawi się 21 (ciężar, powtórzenia, minuty, dni, serie, dzień miesiąca),
   koń zawsze wtrąca skojarzenie z hydraulikiem. Inside joke: leniwego wyprzedzi hydraulik. */
(function(){
const PIOSENKA="„Jestem hydraulikiem, mam narzędzi kupę, gdy ładnie poprosisz, wsadzę ci je w…”";
const G={
  pierwszy:["Nowy koń w stajni? Zobaczymy, czy kopyta wytrzymają.","Pierwszy raz? Spokojnie, igieł na start nie dajemy.","Witaj w stajni, {imie}. Tu się kuje, nie gada."],
  swiezy:["Wczoraj byłeś i dziś znowu? Podejrzane. Co bierzesz?","Dzień po dniu? Szanuję. Ale mocz i tak sprawdzę.","Znowu ty? Kopyta jeszcze ciepłe, a już po więcej."],
  ok:["{dni} dni przerwy. Mięśnie urosły. W twojej głowie.","Kopyta wypoczęte, wymówek brak.","Chcesz urosnąć? A boisz się igieł?","Spoć się dla mnie, siłaczu.","Kto nie kuje, ten nie rośnie."],
  leniwy:["{dni} dni przerwy. Hydraulik w tym czasie zrobił trzy treningi i wymienił syfon.","Jeszcze kilka dni i wyprzedzi cię hydraulik. Ten z kabaretu.","{dni} dni? Gdzie byłeś, u weterynarza?","Podkowy zardzewiały, {imie}. Przez {dni} dni."],
  martwy:["{dni} dni. Myślałem, że oddali cię do rzeźni.","Hydraulik cię już wyprzedził. Teraz goni cię jego pomocnik.","Przy takiej przerwie pomogłyby tylko igły. Żartuję. Chyba.","{dni} dni bez treningu. Nawet koń pociągowy by się wstydził."],
  fuj:["Fuj. I to ma być rozgrzewka?","Patrzę i mi się odechciewa.","Igieł się boisz, a ciężaru też?","Rozgrzewasz się czy rozpakowujesz?","Mój dziadek ciągnął wóz z węglem szybciej.","Tak to i hydraulik potrafi. Po robocie."],
  meh:["No. Dalej. Bez zachwytów.","Połowa to jeszcze nie trening.","Połowa konia to tylko zad. Rób dalej.","Chcesz urosnąć? A boisz się igieł?","Hydraulik by już skończył i wystawił fakturę."],
  flex:["Spoć się dla mnie, siłaczu.","Jeszcze jedna. Koń by zrobił.","Podkowy same się nie przybiją.","No proszę, kopyto drgnęło.","Pot widzę. Jeszcze trochę i uwierzę.","Teraz gadasz jak koń. Jeszcze nie wyglądasz."],
  smoke:["Wciśnięte do dna. Kończ i zapalamy.","Komplet. Daj ognia."],
  malo:["{r} powtórzeń przy planie {cel}? Igły by pomogły, wiem.","Mniej niż w planie. Hydraulik by dokręcił.","{r}? Koń liczył do {cel}. Koń jest rozczarowany."],
  duzo:["{r} powtórzeń? Za lekko dałeś, cwaniaku. Dołóż.","{r}? Przy takim zapasie hańbą jest nie dołożyć."],
  lzej:["Ująłeś z ciężaru. Boisz się igieł czy sztangi?","Lżej niż radziłem. Koń widzi, koń pamięta.","{kg} kg? Tyle to ja noszę w jukach na spacer."],
  ciezej:["Więcej niż radziłem. Odważny albo głupi, zobaczymy przy następnej serii.","{kg} kg? Pokaż ręce, szukam śladów po igłach."],
  rekord:["Rekord? Podejrzane. Pokaż ręce, szukam śladów po igłach.","Nowy rekord. Koń dumny, ale głośno tego nie powie.","Rekord. Hydraulik może tylko pomarzyć."],
  przerwa:["{min} minut przerwy. Hydraulik w tym czasie przepchał dwa zlewy.","Kawa? Telefon? Seria sama się nie zrobi.","Halo, {imie}. Sztanga tęskni."],
  dlugo:["{min} minut? To już nie trening, to przeprowadzka.","Siedzisz tu {min} minut. Koń zaczyna płacić za stajnię."],
  h21:["21! Hydraulik przyjechał. Dwadzieścia jeden złotych za dojazd, robota osobno.","21? Hydraulik wita. Rury przetkane, teraz twoja kolej.","Dwadzieścia jeden. Słyszysz? Hydraulik nuci: "+PIOSENKA+" Dalej nie śpiewam.","21 to numer hydraulika. Zadzwoń, jak skończysz serię.","21. Hydraulik zostawił klucz francuski. Dla ciebie, na rozgrzewkę."],
  koniec:{fuj:["Koń się brzydzi. Tyle to on robi na rozgrzewkę.","Fuj. Hydraulik zrobił więcej przy jednym kranie."],meh:["Koń patrzy z politowaniem. Połowa to nie trening.","Pół roboty. Hydraulik też bierze za całość."],flex:["Papieros zostaje w paczce. Koń czeka na komplet.","Prawie. Prawie robi wielką różnicę, pyta hydraulik."],smoke:["Podkuty na cztery kopyta.","Komplet. Koń zapala i milczy z szacunkiem."]}
};
const ostatnie=[];
function los(pula,vars){
  const wolne=pula.filter(t=>!ostatnie.includes(t));const t=(wolne.length?wolne:pula)[Math.floor(Math.random()*(wolne.length?wolne:pula).length)];
  ostatnie.push(t);if(ostatnie.length>8)ostatnie.shift();
  return t.replace(/\{(\w+)\}/g,(_,k)=>vars&&vars[k]!=null?vars[k]:"");
}
/* 21 w którejkolwiek liczbie sytuacji (także 21,5 kg). */
function ma21(...liczby){return liczby.some(x=>x!=null&&x!==""&&Math.floor(Math.abs(+x))===21)}
function powiedz(syt,vars){vars=vars||{};
  if(ma21(...(vars.liczby||[])))return los(G.h21,vars);
  if(Math.random()<0.06&&["ok","swiezy","leniwy","fuj","meh","flex"].includes(syt))return "Hydraulik nuci: "+PIOSENKA+" Ty nie nucisz, ty kujesz.";
  const pula=syt.startsWith("koniec:")?G.koniec[syt.slice(7)]:G[syt];
  return los(pula||G.ok,vars);
}
window.KK_GADKA={powiedz,ma21,PIOSENKA,G};
})();
