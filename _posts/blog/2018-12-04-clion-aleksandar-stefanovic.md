---
title: Kako i zašto koristiti IDE za projekat iz Računarske grafike
author: Aleksandar Stefanović
authorimg: aleksandar-stefanovic.jpg
layout: post
category: blog
comments: true
---
### {{ page.title }}

Projekat iz grafike je prvi projekat koji radimo nasamo, sa naših računara,
i prvi put da projekat nije samo vežbanje za test. Ovo napominjem jer su mnogi
ljudi davali argument da *žele da vežbaju u istom programu na kojem će raditi
test* (što je najčešće Gedit ili Kate), i to podržavam.

Međutim, ne treba po automatizmu raditi baš *sve* projekte sa kojima se 
susrećemo u osnovnom uređivaču teksta. Postoji više razloga za to, a neki od
najbitnijih su razlika u tome da li ćete na projektu nedeljno raditi 7 sati,
ili 10 sati (eto 3 sata nedeljeno više za učenje PPJ-a, nije li to sjajno?!),
a postoje i kozmetičke razlike, koje su vidljive u tome koliko vam je kose
ostalo na glavi nakon što ste je u besu svu počupali jer *glupi program ne radi
na ovom glupom mestu, a celog sam ga lepo namestio*...

Ali ozbiljno, jedno dobro razvojno okruženje nudi jako puno pogodnosti, 
među kojima su:

 * Jako dobra statička analiza, koja će vas upozoriti na probleme koje ste
prevideli, čak i pre nego što pokrenete kompilaciju.

 * Predviđanja, formatiranje i automatsko unošenje šablonskih konstrukcija:
Umesto što ručno pišemo neke očigledne stvari, pustimo da IDE ubrza taj proces,
kako bi se mi fokusirali na to *šta* pišemo, a ne i *kako* pišemo. Setite se samo kako
smo uz pomoć IntelliJIDEA unosili getter-e, setter-e i konstruktore u par koraka.

 * Debager koji zapravo nije komplikovan za korišćenje: jednim klikom 
kažemo IDE-u gde da pauzira sa izvršavanjem, i kada on stane, mi 
analiziramo podatke na bilo kom steku, na bilo kojoj niti. Ova funkcija mi je
nasamo spasla barem 50 niti kose svaki put kad naiđem na bag.

 * Ugrađena kontrola verzija (iliti git, u našem slučaju): Zamislite svet u
kojem ne morate da koristite terminal da biste koristili git. Zar to ne bi bilo
IDEalno?

* Automatski hrani ribice u vašem akvarijumu... okej, možda u nekoj budućoj verziji...

## Dobro, ubedio si me, koje razvojno okruženje da izaberem?

Ja lično koristim *CLion* za svoje C/C++ projekte. Razlozi su to što je ovo IDE
kompanije *JetBrains*, iste one koja pravi *IntelliJIDEA*, pa su i sama
okruženja jako slična međusobno: ako znate da koristite jedno, znate da
koristite i drugo (i analogno za *PyCharm* okruženjem za Python).

> Ostatak ovog članka će podrazumevati da ste se povinuli mom uticaju, i
odlučili za *CLion*, i slede instrukcije o tome kako da namestite vaš projekat
u njemu.

***

*CLion* nije besplatan, zapravo je profesionalan alat i jako je skup (barem
iz naše, studentske, nekorporativne perspektive), ali je srećom besplatan u
okviru studentskog paketa koji *JetBrains* nudi svim studentima, uključujući i
nas (*jeej*). Možete 30 dana da koristite *CLion* besplatno, preuzimajući ga
[odavde](https://www.jetbrains.com/clion/), a ako se odlučite da ga koristite na duže vreme,
možete da ostvarite pravo na licencu pomoću [*JetBrains*
studentskog paketa](https://www.jetbrains.com/student/).

Nakon što ste instalirali *CLion* (a u korake instalacije neću zalaziti jer mogu da se nađu na
vebu), otvorite ga i uživajte u *artsy 
splash-screen-u*, a zatim možemo da pređemo na samo nameštanje:

![splash-screen]({{site.baseurl}}/assets/img/blog/2018-12-04-clion-aleksandar-stefanovic/splash.png)


# Za one koji već imaju postojeći projekat:

Izaberite opciju *Import Project from Sources*, i pronađite svoj projekat:

![project directory]({{site.baseurl}}/assets/img/blog/2018-12-04-clion-aleksandar-stefanovic/project_directory.png)

U narednom prozoru, izaberite sve izvorne datoteke vašeg projekta (najčešće će IDE sam da izabere
sve odgovarajuće datoteke).

Sada će se otvoriti glavni prozor okruženja. Još malo pa gotovo!

**Ako vas okruženje pita da li želite da dodate neke datoteke u Git, to odbijte!**

Otvorite `.gitignore` datoteku, i tamo dodajte ovih par linija:

```
# CLion internal files
/.idea

# Build directories
/build
/cmake-build-*
```

Ovim kažemo Git-u da prestane da nas smara sa internim i privremenim datotekama.

Potrebno je još srediti *build script*. *CLion* koristi *CMake*, koji radi kao
apstrakcija iznad samog *Makefile*-a, i omogućava da samo kažemo koje datoteke
su izvorne, i pustimo da *CMake* sam napravi odgovarajući *Makefile*. Ovo je najverovatnije poslednji put
da morate da ručno nameštate *build script*, jer će nakon toga *CLion* da to radi umesto vas.

Analogno tome što koristimo `-lGL -lGLU -lglut` kada koristimo *GCC*, sada ćemo
naglasiti da želimo da povežemo ove biblioteke. Otvorimo `CMakeLists.txt`
datoteku, i tamo dodajmo ove linije ***pre*** `add_executable`, tako da naša datoteka izgleda
nalik ovome:

```
cmake_minimum_required(VERSION 3.12)
project(RG123_moj_projekat C)

set(CMAKE_C_STANDARD 11)

link_libraries(GL)
link_libraries(GLU)
link_libraries(glut)

add_executable(RG123_moj_projekat main.c)
```

Pritisnite `Reload Changes` u traci iznad skripte, i to je to! 🎉

Nakon ovoga, ako ne nije podvukao neki problem, projekat će moći da se kompilira i pokrene pritiskom
na zeleno `Run` dugme:

![RUN]({{site.baseurl}}/assets/img/blog/2018-12-04-clion-aleksandar-stefanovic/RUN.png)

Prekočite naredni odeljak, do *Zaključka*...

***

# Za one koji još uvek nisu započeli svoj projekat:

Izaberite opciju *Check out from Version Control* i tu, naravno, izaberite *Git*.

Zatim, otvorite vaš projekat na GitHub-u, i pronađite adresu za kloniranje, koji se otkriva
pritiskom na zeleno dugme:

![github link]({{site.baseurl}}/assets/img/blog/2018-12-04-clion-aleksandar-stefanovic/github-link.png)

Tu adresu unesite u odgovarajuće polje CLion-a.

Zatim, izaberite "Log in to GitHub", jer ćete morati pre ili kasnije da se prijavite, pa je
najbolje da to uradite sada.

Nakon što se prijavite, i klonirate projekat, otvoriće vam se prozor okruženja 🎉

Međutim, čeka nas još malo posla:

**Ako vas okruženje pita da li želite da dodate neke datoteke u Git, to odbijte!**

Otvorite `.gitignore` datoteku, i tamo dodajte ovih par linija:

```
# CLion internal files
/.idea

# Build directories
/build
/cmake-build-*
```

Ovim kažemo Git-u da prestane da nas smara sa internim i privremenim datotekama.

Sada napravite osnovnu *C* datoteku u korenom direktorijumu (npr. `main.c`), koja može da ostane
prazna trenutno.

*CLion* koristi *CMake*, koji radi kao
apstrakcija iznad samog *Makefile*-a, i omogućava da samo kažemo koje datoteke
su izvorne, i pustimo da *CMake* sam napravi odgovarajući *Makefile*. Ovo je najverovatnije poslednji put
da morate da ručno nameštate *build script*, jer će nakon toga *CLion* da to radi umesto vas.

Napravite CMakeLists.txt u korenom direktorijumu, desnim klikom na koreni direktorijum (koji će se
zvati `RG123-moj-projekat`), i tu birajući "`New` > `File`". Ovaj put želimo da ubacimo u ovu datoteku u git, tako
da prihvatite to u prozoru koji je iskočio. Onda prekopirajte ovaj tekst, i ručno ga izmenite da ga
oblikujete prema vašem projektu:

```
cmake_minimum_required(VERSION 3.12)
# Ime vašeg projekta i jezik u kojem radite
project(RG123_moj_projekat C)

set(CMAKE_C_STANDARD 11)

link_libraries(GL)
link_libraries(GLU)
link_libraries(glut)
 
add_executable(RG123_moj_projekat main.c)
```

A ako koristite C++, datoteka treba da izgleda ovako:

```
cmake_minimum_required(VERSION 3.12)
# Ime vašeg projekta i jezik u kojem radite
project(RG123_moj_projekat CXX)

set(CMAKE_CXX_STANDARD 14)

link_libraries(GL)
link_libraries(GLU)
link_libraries(glut)

add_executable(RG123_moj_projekat main.cpp)
```


Zatim izaberite "Load CMake project" u traci iznad skripte. Ako je sve prošlo kako treba, moći ćete
da pokrenete kompilaciju pritiskom na `Run` dugme:

![RUN]({{site.baseurl}}/assets/img/blog/2018-12-04-clion-aleksandar-stefanovic/RUN.png)

***

# Zaključak

Ovde ću stati sa ovim člankom, što znači da ćete i dalje morati kroz terminal da koristite Git.
Ali ne klonite duhom! Naredni deo članka stiže, koji će do detalja objasniti kako da koristite
Git u *CLion*-u, a nakon toga možda usledi i neki članak o tome kako da iskoristite funkcionalnosti
*CLion*-a, e.g. debagovanje, automatsko preimenovanje, etc. 🙂

Pozdrav! 👋


