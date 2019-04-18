---
title: Programiranje danas 01 - Principiis Creaturae
author: Uroš Stegić
authorimg: uros-stegic.jpg
layout: post
category: blog
comments: true
---
## {{ page.title }}

<img style='width: 300px' class='img-fluid' alt='poster' src="{{site.baseurl}}/assets/img/blog/2019-04-05-programiranje-danas-01-uros-stegic/poster.jpg">

Programiranje za Veb je danas u warp brzini. Veliki udeo zadataka Veb developera je implementiranje UI komponenti sa jedne strane i obrada podataka u skladu sa zahtevima klijenta sa druge strane. Pored Veba, popularnost programiranja ugradnih uređaja (*eng. embedded systems*) i programiranje na platformama za pametne uređaje poput Android, iOS i MS Windows Phone je takođe na visokom nivou. Koliko god ove oblasti bile različite, osnovni principi razvoja su i dalje prisutni. Tri osnovna principa o kojima programer treba da razmišlja su:
- implementacija funkcionalnosti;
- optimizacija izvršavanja;
- obezbeđivanje održivosti koda.

Loše je postaviti pitanje koja od ovih komponenti je važnija, a koja manje važna. Ne postoji poredak među njima, nema linearne skale kojom bismo opisali njihovu relativnu važnost. Postoji samo jedno: dobar softver ispunjava sva tri principa, loš softver ne. Naravno, ne postoji jasna slika u kojoj meri su ovi zahtevi ispunjeni, te je sve stvar slobodne interpretacije.

- [Programiranje danas: Principiis Creaturae](#programiranje-danas--principiis-creaturae)
    - [Rađanje](#raanje)
    - [Adolescencija](#adolescencija)
    - [Zrelost](#zrelost)
    - [Smrt](#smrt)
- [Zaključak](#zakljuak)

### Rađanje
Sve počinje jednom for-petljom. Osnovna komponenta svakog softvera je definitivno - programski kôd. Pisali nešto iz hobija, za klijenta ili iz nekog trećeg razloga, postojaće uvek neka specifikacija, neki skup zahteva koje softver treba da ispunjava. To je upravo ono što ga definiše. U slučaju razvoja Veb platforme (npr. Veb sajt za aukcije) to mogu biti registracija korisnika, postavljanje aukcije, licitiranje na aukcijama itd. Kako bi platforma oživela, moramo implementirati sve zahtevane funkcionalnosti ili makar većinu.

Najčešće nećemo razvijati sisteme od nule tako što ćemo lemiti tranzistore na ploču. Nivoi apstrakcije su danas na malo višem nivou: [procesor](https://en.wikipedia.org/wiki/Central_processing_unit) -> [operativni sistem](https://en.wikipedia.org/wiki/Operating_system) -> [programski jezik](https://en.wikipedia.org/wiki/Programming_language) -> [radni okvir](https://en.wikipedia.org/wiki/Software_framework). Kada je u pitanju Veb, imamo čitav sijaset radnih okvira čiji izbor je van dometa ovog članka. Neki od njih su [Symfony](https://en.wikipedia.org/wiki/Symfony), [Spring](https://en.wikipedia.org/wiki/Spring_Framework), [Express](https://en.wikipedia.org/wiki/Express.js), [React](https://en.wikipedia.org/wiki/React_\(JavaScript_library\)) i drugi. Kod desktop aplikacija imamo [Qt](https://en.wikipedia.org/wiki/Qt_(software)), [GTK](https://en.wikipedia.org/wiki/GTK) i ostale. [Android SDK](https://en.wikipedia.org/wiki/Android_software_development#SDK) je tu da pokrije razvoj za Android platformu.

**Potrebna znanja:** `programiranje`, `radni okvir`

### Adolescencija
Tokom pravljenja prvih koraka definitivno nije potrebno razmišljati o resursima koje naš softver koristi. Čest problem koji sam primetio u praksi je baš preterano "inženjerisanje" u ranim fazama razvoja (*eng. overengineering*). U najvećem broju slučajeva je sasvim dovoljno početi lenjim pristupom: prototip sa osnovnim funkcionalnostima zgotoviti na što je moguće naivniji i brži način. Tek kada se naziru konture krajnjeg rešenja, kada se dobar deo ideja materijalizuje kroz kod, u tom trenutku valja razmišljati o optimizaciji.

U zavisnosti od platforme koja će pokretati naš softver, razni vidovi optimizacije su mogući. Po mom, krajnje nepopularnom mišljenju, postoje samo dva vida optimizacije: potrebna i nepotrebna optimizacija. Da, postoji nepotrebna optimizacija! Kao i ostalim materijalnim stvarima, svima nama je dodeljeno konačno mnogo vremena kojim raspolažemo. Da li želimo to vreme trošiti na smanjivanje vremena izvršavanja softvera sa 0.9s na 15ms ako znamo da se taj softver pokreće jednom dnevno i svoj rezultat upisuje u bazu čiji se sadržaj čita jednom mesečno? Ako projekat razvijate za sebe - dosadiće vam. Ako ste plaćeni za razvoj tog softvera, klijenta će zanimati utrošak vremena.

Razni su razlozi za optimizaciju upotrebe radne memorije, potrošnje struje, toplote koja se emituje radom našeg uređaja ili broja I/O operacija. Kod desktop aplikacija uglavnom želimo da optimizujemo RAM memoriju ili vreme izvršavanja softvera. U industrijskim primenama češće želimo optimizovati broj I/O operacija, kako bismo produžili životni vek hard diskova ili radnu temperaturu uređaja u nadi da smanjimo potrebu za skupim sistemima hlađenja (zamislimo ugradni uređaj koji ćemo ugraditi u automobil gde nije jednostavno obezbediti dodatno hladjenje).

Pre nego što se bilo šta krene menjati u softveru, potrebno je ustanoviti konkretnu metriku čiju vrednost optimizujemo. Teško je popraviti bilo šta ako nemamo neku vrednost, neki broj koji nam je pokazatelj da li idemo u dobrom ili lošem smeru. Kada napišemo kôd koji meri parametar optimizacije, tada postepeno možemo menjati komponentu po komponentu softvera i konstantno pratiti učinak tih promena. Ovakvim **postepenim** promenama, vremenom će se postići željene performanse. Sada je pravi momenat za prvo testiranje softvera u produkcijskom okruženju, dakle daleko od udobne fotelje i bezbednog okruženja koje je podešeno baš kako nama odgovara. Produkcija je nemilosrdna! Produkcija ne prašta!

**Potrebna znanja:** `programiranje`, `radni okvir`, `algoritmi`, `okruženje izvršavanja`

### Zrelost
Vremenom, kôd je porastao, softver je optimizovan, ali mukama nije došao kraj. Zahvaljujući obimu zahteva i vremenu koje je uloženo, došlo je do bagova i do novih zahteva sa kojima se ne možemo sami obračunati. Potrebno je proširiti tim. Ako se do sada nismo bavili arhitekturom softvera velika je šansa da je trenutno stanje koda krajnje kritično. Kratak rok za isporuku sada uzima svoj danak. Pošto ništa od koda nije dokumentovano, sada novi kolega umesto da pročita, on pita nas šta je funkcija `main_util` koja prima pet argumenata, ima 430 linija koda, trostruku for petlju, gomilu if naredbi i promenljive koje su dobile nazive po nordijskim bogovima.

Često je u praksi razvoj prototipa jedna stvar, a razvoj produkcijskog softvera sasvim druga. Nakon razvoja prototipa se stvori slika o tome kako je ovaj softver trebalo dizajnirati i želja da se projekat započne od nule samo raste. Ova želja nije neprirodna i ne treba je zanemariti. Možda deluje neisplativo početi projekat iznova, ali ako je u pitanju dugoročan projekat onda je to baš ono što treba uraditi. Isplativije je potrošiti još mesec ili dva na ponovno implementiranje svih zahteva iz specifikacije, ali ovog puta nad zdravom arhitekturom, nego provesti narednih pet godina prepakujući frankenštajnovo čudovište iz kutije u omot.

Drugi način promene arhitekture je dinamičko menjane poznatije pod popularnim nazivom **refaktorisanje**. Koliko god da neko pazi uvek će biti prostora za poboljšavanje arhitekture i uvek je i neophodno poboljšavati arhitekturu. Za kvalitetan i održiv razvoj je zapravo i najbolje naizmenično programirati i refaktorisati. U fazi programiranja ne treba razmišljati o dizajnu. Na ovaj način se zahtevi brže ostvaruju i lakše se obraća pažnja na optimizaciju. U fazi refaktorisanja ne treba razmišljati o optimalnosti ili tačnosti rešenja. Time je lakše fokusirati se na kvalitet arhitekture. Naravno, pri refaktorisanju treba paziti da se ne naruše trenutne funkcionalnosti i ne stvore novi bagovi. Ovom cilju znatno pomažu alati za testiranje softvera, ali o tome nećemo sada.

Zdravom arhitekturom, kodom koji je dobro dokumentovan i pokriven testovima dobijamo mnogo. Lakše je implementirati nove funkcionalnosti. Smanjujemo mogućnost za nastanak bagova, a i ove što su već tu ćemo lakše pronaći i ispraviti. Novi članovi tima će se lakše snaći u dobro organizovanom kodu, jer ćemo ipak pre pronaći pekaru u centru grada kada imamo Google mape nego zakopano blago u prašumi za koje smo načuli da možda postoji.

Postoji još jedan odraz zrelosti pored arhitekture. Praćenje rada sistema nije retka potreba koliko deluje. Pomoćni alati za logovanje su česta stvar u razvoju serverske strane Veb aplikacija. Avioni poseduju čuvene crne kutije sa razlogom. Kada pustimo naš softver u rad nakon što smo optimizovali njegovo izvršavanje više ne moramo da obraćamo pažnju na njega. Ipak, nakon nekoliko dana/nedelja/meseci/godina ćemo zaboraviti detalje, previdećmo nešto i bag će se pojaviti. Ne mora biti bag i pitanju, može biti i neadekvatna upotreba softvera ili bilo šta drugo što zarad čega ćemo morati da pregledamo šta se tačno desilo i na koji način. Implementacijom sopstvenog sistema praćenja (npr. kroz obrasce [Dekorater](https://en.wikipedia.org/wiki/Decorator_pattern) ili [Fasada](https://en.wikipedia.org/wiki/Facade_pattern)) možemo svaku važnu akciju koju korisnik izvrši zapisati u tekstualni fajl sa vremenom pokretanja i nekim bitnim podacima u vezi te konkretne akcije.

**Potrebna znanja:** `programiranje`, `radni okvir`, `algoritmi`, `okruženje izvršavanja`, `dizajniranje softvera`, `razvoj testova`

### Smrt
Ipak, projekti ne traju večno. Nakon nekog vremena se obustave i razvoj i uopšte korišćenje softvera. Njegovo arhiviranje je krajnje jednostavno. Međutim, nije loše sačuvati izvorni kôd jer možda baš neka njegova komponenta može biti iskorišćena u drugim projektima. Možda će nekome drugom baš taj projekat značiti. Možda će njegovo vaskrsenje neko skupo platiti. Kako god bilo, konačan pregled i dopuna dokumentacije je uvek korisna stvar.

## Zaključak
Kada pišemo softver, ne treba izostavljati nijedan od ovih principa. Ipak, nećemo uvek imati vremena da se deteljno pozabavimo njima. Ali avaj, ne treba plakati za prosutim mlekom! Retko ko će reći, ali istina je da je sasvim ok pisati loš kod. Sve je to proces učenja i sticanja iskustva. Nekada ćete dobiti kritiku, nekada nećete. Nije ni važno uvek biti pedantan, ali kada to nismo, tada je bitno primetiti grešku i zapamtiti je. Nekad u budućnosti, na nekom sasvim novom projektu ćemo se setiti te greške i nećemo je ponoviti. Bolji programer se ne postaje samo čitanjem knjiga i učenjem već i sticanjem iskustva, a greške su sastavni deo tog procesa!

Srećno programiranje!

Uroš Stegić
