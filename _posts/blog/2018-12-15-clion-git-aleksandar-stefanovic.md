---
title: Kako koristiti Git uz CLion
author: Aleksandar Stefanović
authorimg: aleksandar-stefanovic.jpg
layout: post
category: blog
comments: true
---
### {{ page.title }}

<img alt='Banner' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/banner.png">


U prošlom članku smo se bavili time kako da namestimo razvojno okruženje za projekat iz Grafike,
ali nismo naučili kako da koristimo Git u okruženju, što je značajan deo projekta, s obzirom na
to da bi trebalo da podnosimo izveštaje na nedeljnom nivou i budemo redovni...

Okruženje nam pruža mogućnost da iskoristimo sve funkcionalnosti Git-a dostupne iz terminala, ali
takođe i da neke od tih stvari vizualizujemo, što je jako korisno za one koji po prvi put koriste
git i čini im se da su stvari van kontrole kada ga koriste iz terminala.

Okej, pre nego što počnemo sa korišćenjem *Git*-a u razvojnom okruženju, trebalo bi da utvrdimo par
principa u vezi korišćenja samog *Git*-a:

## Pojedinačni commit-ovi treba da budu mali.

Trebalo bi da uključuju samo jednu smislenu celinu izmene. Na primer, ako sam u mom projektu dodao
osvetljenje, i dodao tajmer, to treba da budu da odvojena commit-a. Zašto?

* Zato što je izmena preglednija. Kada pregledam svoje izmene pre nego što napravim commit,
mogu lakše da vidim tačno kakve izmene na kodu zahteva promena, umesto da više stvari bude
isprepleteno međusobno, i da nije jasno da li je neka izmena vezana za jednu ili drugu celinu.
Ovo je posebno bitno kada se doprinosi na tuđim projektima, jer kada neko ko nije upućen u to šta tačno želite da postignete gleda vaš kod, može lako da utvrdi zašto je nešto dodato.

* Zato što se tako vrši bolja kontrola nad revizijama projekta. Na primer, dodao sam neki
algoritam u svoj projekat, za koji sam kasnije zaključio da ima bagove, i želim da odbacim taj
commit. Ako sam u tom commit-u uradio još par drugih stvari, moram ih sve odbaciti, a to ne želim.

* Čini pronalaženje bagova lakšim. Hajde da kažemo da ste primetili da imate bag u kodu, ali ne
znate tačno u kom commit-u se pojavio. Ako su commit-ovi minimalni, iseckani i sitni, prolaskom kroz
komitove i testirajući ih dok god je bag prisutan, možete tačno prepoznati u kom commit-u se bag
javio.

## Commit mora da bude potpuno funckionalan.

Nema svrhe da polu-pečeni commit završi u repozitorijumu. Ako je izmena velika, treba podeliti u
manje celine. Ako je izmena mala, a program je nefunkcionalan, onda treba doraditi izmenu pre nego što se commit-uje.

## Koristiti grane za promene koje zahtevaju više od jednog commit-a

Ako je neka promena velika, odnosno, sastoji se iz više delova i ne može biti opisana jednim
commit-om, onda sve te commit-ove treba izdvojiti u zasebnu granu, i na kraju spojiti sa `master`
granom. Ovo je malo kompleksnija tema, i neću zalaziti u to u ovom članku, jer je za početnike
dovoljno da sve rade na podrazumevanoj grani.

## Priveremene i izvršive datoteke ne treba da budu deo commit-a.

Izvršive datoteke ne treba da uđu u commit, zato što je svrha repozitorijuma otvorenog koda to da
se izvorni kod preuzme i kompilira na sistemu na kojem se izvršava. Ako hoćemo da podelimo izvršivu
datoteku preko GitHub-a, to možemo uraditi kroz *Releases* odeljak, ali to je neka druga priča.

Poenta je, ovakve datoteke ne treba da slučajno "zalutaju" u naš commit.

Srećom, u [prošlom članku](http://risk.matf.bg.ac.rs/blog/clion-aleksandar-stefanovic.html) smo
uredili našu `.gitignore` datoteku, tako da budu ignorisane generisane (kompilirane) datoteke.

# Tok rada
<small>U nedostatku boljeg prevoda za "workflow"</small>

Između dva commit-a, tok rada bi trebao da izgleda ovako:

1. Prave se izmene nad datotekama
2. Proverava se da li program ispravno radi.
3. Pregleda se izmenjeni kod i proverava se da li je svaka linija na mestu.
4. Izmenjeni kod se commit-uje (i push-uje).

# Kako sve ovo uraditi u CLion-u

Ako ste dostigli do ovog dela u članku, čestitam, prošli ste dosadniji deo. Sada ćemo raditi sa
CLion-om, a sve što radimo će takođe biti primenjivo za *IntelliJIDEA*, *PhpStorm*, *PyCharm*, etc.

## 1. Izmene na datotekama

Dok se piše kod, CLion obeležava gde su promene, u odnosu na trenutnu verziju iz repozitorijuma:

<img alt='Obeležene promene' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/gutter.png">

<small>Ovde vidimo da je obojeno zelenom bojom, što znači da je izmena potpuno novi kod.</small>

Ako kliknemo na obojeni deo sa strane, možemo da uporedimo i manipulišemo tom izmenom:

<img alt='Izmena' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/change.png">

Na primer, ovde može da se vidi da je, u odnosu na verziju u repozitorijumu, reč `vector`
zamenjena sa reči `set`. Na ovaj način možemo brzo da pregledamo našu izmenu, i da se, na primer,
podsetimo šta je bilo na tom mestu pre izmene. Takođe možemo da, klikom na "strelicu povratka"
vratimo tu liniju koda na pređašnje stanje.

## 2. Proverava ispravnosti

Ovo nije vezano specifično za *CLion* ili *Git*: pokrenite program i proverite da li sve radi.

## 3. Pregled izmenjenog koda

Postoji više načina da u okviru okruženja pregledate sve promene. Jedan od njih je da otvorite
`Version Control` odeljak (pomoću menija u donjem-levom ćošku):

<img alt='Izmena' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/version_control.png">

Odatle, možete da pregledate sve izmene koristeći `Show Diff` opciju:

<img alt='Show diff' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/show_diff.png">

Ta opcija otvara prozor u kojem se uporednim prikazom pregledaju izmene:

<img alt='Diff' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/diff.png">

Da se pređe na narednu izmenjenu datoteku, bira se `Compare Next File` opcija:

<img alt='Next file' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/next_file.png">

## 4. Commit izmenjenog koda

Kada se izmena pregleda, i po potrebi sredi, commit-uje se pritiskom na dugme `Commit`:

<img alt='Commit' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/commit.png">

To otvara prozor u kojem alternativno mogu da se pregledaju izmene, ali ja ne volim da koristim taj
prozor za pregledanje izmena, jer je manje udobno nego u nezavisnom prozoru...

Osim pregledanja izmena, u ovom prozoru se piše poruka commit-a:

<img alt='Commit dialog' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/commit_dialog.png">

Uredna commit poruka u prvoj liniji sadrži naslov poruke, zatim sledi
jedna prazna linija, a nakon toga ide (opcioni) detaljni opis poruke. Takođe je preporuka da nijedna
linija ne prelazi 80 karaktera (naznačeno vertikalnom linijom), da bi se pravilno prikazala u `git diff` prikazu.

Nakon što napišemo poruku koja dobro opisuje izmenu, možemo da commit-ujemo:

Da bi ujedno uradili commit i push, možemo da izaberemo ovu prečicu:

<img alt='Commit and push' class='img-fluid' src="{{site.baseurl}}/assets/img/blog/2018-12-15-clion-git-aleksandar-stefanovic/commit_and_push.png">

Nakon toga, naša izmena je u GitHub repozitorijumu!

# Zaključak

Ovo je osnovno korišćenje Git-a u okviru CLion-a. Postoji još mnogo stvari koje mogu da se postignu
u okviru okruženja što se tiče kontrole verzija, ali sam hteo da dam samo suštinske funkcije, a
ostalo možete sami da istražite, kako se upoznajete sa vašim okruženjem.