---
title: CMake alat za kreiranje projektnih fajlova iz izvornog koda (C++)
author: Nikola Ajzenhamer
authorimg: nikola-ajzenhamer.png
layout: post
category: blog
comments: true
---
# CMake alat za kreiranje projektnih fajlova iz izvornog koda (C++)
Veliki broj projekata koji su napisani u programskom jeziku C++ pišu se sa ciljem izvršavanja na različitim operativnim sistemima. Da bi se izvorni kod ovakvih aplikacija uspešno kompilirao za odgovarajući sistem, potrebno je izvršiti određeni skup operacija za svaki sistem zasebno. U tu svrhu, koriste se različiti sistemi za prevođenje, kao što su [sistem zasnovan na Makefile datotekama](https://en.wikipedia.org/wiki/Makefile) za Unix-zasnovane operativne sisteme ili [Visual Studio alat za razvoj](https://visualstudio.microsoft.com/) za Windows operativne sisteme. 

Međutim, problem koji se sada javlja jeste što je za svaki ovakav sistem za prevođenje (a ponekad i za svaku verziju sistema) potrebno čuvati datoteke specifične za njega, kako bi se prevođenje moglo izvršiti. Na primer, za prvi spomenuti sistem potrebno je imati datoteke pod nazivom `Makefile` u projektnom direktorijumu, odnosno, za Visual Studio alat je potrebno imati razne `.sln` i `.vcproj` datoteke između ostalog. Očigledno, čuvanje ovih datoteka na sistemu za kontrolu verzija predstavlja problem jer dovodi do brzog zagađenja projektnog direktorijuma "nepotrebnim" datotekama. [CMake](https://cmake.org/) alat o kojem će biti reči u ovom članku pokušava da reši pomenute probleme tako što definiše jedan sistem, koji neće zagađivati projekat u velikoj meri, a koji služi za generisanje datoteka za pomenute sisteme za prevođenje.

## Opis C++ projekta

Napravićemo aplikaciju koja učitava JPEG fotografije u boji i od njih konstruiše crno-bele fotografije. Za ovaj zadatak ćemo koristiti neke module [biblioteke stb](https://github.com/nothings/stb/), naime `stb_image` i `stb_image_write`. Naša aplikacija će zapravo samo koristiti funkcije iz ovih biblioteka, ali poenta jeste u tome da naučimo da povezujemo biblioteke "trećih lica" (engl. _third-party_) sa našim aplikacijama, a ne da obrađujemo slike :) Struktura našeg projektnog direktorijuma sa opisima direktorijuma izgleda ovako:
```
cmake-tutorial/                 # Koren projektnog direktorijuma
    bin/                        # Izvorni kod aplikacije
    build/                      # Datoteke za prevođenje
    resources/                  # Resursi za testiranje rada aplikacije
        leaves.jpeg
        CMakeLists.txt          # Uputstvo za instaliranje resursa
    src/                        # Izvorni kod aplikacije
        app.cpp
    thirdparty/                 # Izvorni kod biblioteka trećih lica
        include/
            stb_image.h
            stb_image_write.h
        source/
            stb_image.cpp
            stb_image_write.cpp
        CMakeLists.txt          # Uputstvo za kreiranje biblioteke trećih lica
    CMakeLists.txt              # Uputstvo za kreiranje aplikacije
    build.sh                    # Skript za lakše kreiranje za Linux
```

Kao što vidimo, skoro sve datoteke koje se nalaze u projektnom direktorijumu sadrže ili izvorni kod ili nekakve resurse za pokretanje aplikacije. Jedine datoteke koje ne sadrže izvorni kod su tri `CMakeLists.txt` datoteke (i jedan skript za pokretanje CMake alata za Linux radi automatizacije procesa), koje nam svakako ne đubre projekat niti smetaju sa radom. U nastavku teksta ćemo podrazumevati Windows kao operativni sistem na kojem radimo, dok ćemo Linux specifičnosti navesti samo prvi put u zagradama. Dodatno, klikom na svaku od komandi ili promenljivih u tekstu moguće je pronaći zvaničnu dokumentaciju za datu komandu ili promenljivu.

## Pisanje CMakeLists.txt datoteka

Kako CMake funkcioniše? Sistem kojim CMake rukovodi se zasniva na datotekama čiji su nazivi `CMakeLists.txt`. Za svaki modul projekta se definiše po jedna datoteka ovog naziva u kojoj se nalaze direktive, napisane na specijalnom skript jeziku koji CMake razume, kojima se opisuje na koji način se generiše izvršni kod od izvornog koda. Ovaj skript jezik omogućava pisanje najrazličitijih direktiva, ali mi ćemo u ovom članku prikazati samo najosnovnije.

Da bismo naučili kako da pišemo `CMakeLists.txt` datoteke, potrebno je da razumemo koji je naš finalni cilj za opisani projekat. Ono što želimo da uradimo jeste da: 
- kreiramo biblioteku `stb_image.lib` (za Linux je `libstb_image.a`) od datoteka `stb_image.cpp` i `stb_image_write.cpp`
- kreiramo aplikaciju `app.exe` (za Linux je `app`) od datoteke `app.cpp`
- kreiramo direktorijum `bin` koji će sadržati kreiranu biblioteku i aplikaciju, kao i neophodne resurse za testiranje rada aplikacije (što je u našem slučaju datoteka `leaves.jpeg`)

### Kreiranje biblioteka

Za početak, kreirajmo `CMakeLists.txt` datoteku u kojoj ćemo definisati pravila za kreiranje biblioteke `stb_image`. Svaka `CMakeLists.txt` datoteka mora započeti deklaracijom najmanje verzije CMake alata koja se zahteva, što se vrši pozivom komande [`cmake_minimum_required`](https://cmake.org/cmake/help/v3.10/command/cmake_minimum_required.html). Mi ćemo koristiti verziju 3.10, dakle, pišemo

```
cmake_minimum_required(VERSION 3.10)
```

Kada kreiramo bilo biblioteku, bilo aplikaciju, mi specifikujemo novi projekat koji se kreira na osnovu nekih izvornih datoteka. Da bismo to specifikovali u CMake jeziku, koristimo poziv komande [`project`](https://cmake.org/cmake/help/v3.10/command/project.html) kojoj prosleđujemo naziv novog projekta. Često naziv biblioteke, odnosno, aplikacije koju pravimo odgovara nazivu projekta, te ćemo mi ovaj projekat kreirati pomoću

```
project(stb_image)
```

Ova komanda proizvodi razne bočne efekte, između kojih je i kreiranje promenljive [`PROJECT_NAME`](https://cmake.org/cmake/help/v3.10/variable/PROJECT_NAME.html) koja sadrži naziv projekta koji smo prosledili, što će nam biti korisno u nastavku. Da bismo pristupili vrednosti nekoj postavljenoj promenljivoj, potrebno je naziv promenljive uokviriti između `${` i `}`, na primer:

```
${PROJECT_NAME}
```

Nakon što smo kreirali projekat, možemo specifikovati direktorijume koji sadrže zaglavlja izvornog koda pozivom komande [`include_directories`](https://cmake.org/cmake/help/v3.10/command/include_directories.html). Kako smo mi razdvojili izvorni kod u direktorijum `source`, a zaglavlja u `include`, onda je potrebno da pozovemo ovu komandu da bismo ispravno mogli da učitamo zaglavlja:

```
include_directories(include/)
```

Sada možemo da definišemo novu biblioteku, što se vrši pozivom komande [`add_library`](https://cmake.org/cmake/help/v3.10/command/add_library.html). Ova komanda prima nekoliko argumenata:
1. Naziv biblioteke koja se pravi
    - Za nas će ova vrednost biti sadržana u promenljivoj `PROJECT_NAME`. 
1. Tip biblioteke
    - Mi se odlučujemo za statičku biblioteku (ključna reč `STATIC`), a možemo kreirati biblioteku koja se učitava dinamički (ključna reč `SHARED`) ili modul (ključna reč `MODULE`).
1. Jedna izvorna datoteka ili više njih

Kreiranje biblioteke se može izvršiti narednim pozivom:

```
add_library(${PROJECT_NAME} STATIC source/stb_image.cpp source/stb_image_write.cpp)
```

Ukoliko želimo da izdvojimo spisak datoteka izvornog koda u posebnu promenljivu, to možemo da uradimo pozivom komande [`set`](https://cmake.org/cmake/help/v3.10/command/set.html). Ova komanda će kreirati promenljivu čiji je naziv prvi argument, a čija je vrednost drugi argument. Prethodni poziv komande je ekvivalentan narednim dvama pozivima:

```
set(STB_SOURCES source/stb_image.cpp 
                source/stb_image_write.cpp)

add_library(${PROJECT_NAME} STATIC ${STB_SOURCES})
```

Time smo završili kreiranje biblioteke `stb_image`. Ono što smo dodatno obezbedili jeste da sada bilo koja aplikacija koja želi da koristi ovu biblioteku može to učiniti tako što samo učita `CMakeLists.txt` datoteku koju smo upravo kreirali. Time smo modulirali ne samo naš kod, već i sistem za učitavanje biblioteka od kojih naša aplikacija zavisi - svaki modul se brine samo sa sebe. U nastavku ćemo videti kako možemo da iskoristimo kreiranu `CMakeLists.txt` datoteku.

### Kreiranje aplikacije

Naša aplikacija `app` zavisi od biblioteke `stb_image`. Postoji nekoliko koraka koje je potrebno učiniti da bismo ispravno kreirali zavisnost između ova dva modula. Za početak, kreirajmo novi projekat:

```
cmake_minimum_required (VERSION 3.10)
project(app)
```

S obzirom da je potrebno da zaglavlja biblioteke `stb_image` budu vidljiva u izvornom kodu naše aplikacije, potrebno ih je uključiti:

```
include_directories(thirdparty/include/)
```

Da bismo rekli CMake sistemu da obradi `CMakeLists.txt` datoteku koja se nalazi u direktorijumu `thirdparty`, a samim tim i delom kreirali zavisnost između modula, potrebno je da pozovemo komandu [`add_subdirectory`](https://cmake.org/cmake/help/v3.10/command/add_subdirectory.html), kojoj prosleđujemo naziv direktorijuma koji sadrži `CMakeLists.txt` datoteku koja će se obraditi. Pozivom komande

```
add_subdirectory(thirdparty/)
```

CMake sistem će obraditi `CMakeLists.txt` datoteku u poddirektorijumu `thirdparty`, čime će se kreirati biblioteka `stb_image` na osnovu pravila koje smo pisali u prethodnoj sekciji.

Kreiranje nove izvršne aplikacije se vrši pomoću komande [`add_executable`](https://cmake.org/cmake/help/v3.10/command/add_executable.html), koja ima sličan smisao kao komanda `add_library`, samo što se kreira izvršna datoteka, te nema argument kojim se specifikuje tip aplikacije (kao što je to bio drugi argument u slučaju komande `add_library`). Kreiranje aplikacije `app` se može izvršiti komandom:

```
add_executable(${PROJECT_NAME} src/app.cpp)
```

Konačno, da bismo finalizirali povezivanje biblioteke `stb_image` sa aplikacijom `app`, potrebno je da pozovemo komandu [`target_link_libraries`](https://cmake.org/cmake/help/v3.10/command/target_link_libraries.html). Ova komanda ima različite varijante, a najjednostavnija ima dva argumenta:
1. Naziv izvršne aplikacije za koju se vezuje biblioteka
2. Naziv biblioteke koja se vezuje

Tako se vezivanje biblioteke `stb_image` i aplikacije `app` može izvršiti komandom:

```
target_link_libraries(${PROJECT_NAME} stb_image)
```

Time smo završili definisanje pravila za kreiranje izvršne aplikacije koja zavisi od biblioteke. U nastavku ćemo pričati kako se napisana pravila pokreću u CMake sistemu i kako se generišu aplikacija i biblioteka od ovih pravila. Pre toga, dopunimo napisane `CMakeLists.txt` datoteke nekim dodatnim instrukcijama.

### Instaliranje

Nakon što se projektni fajlovi generišu i uspešno se izvorni kod kompilira u izvršni kod, jedna česta akcija koja se izvršava jeste instaliranje izvršnih fajlova, odnosno, specifikovanje koje su datoteke potrebne korisniku da pokrene aplikaciju i smeštanje tih datoteka u odgovarajući direktorijum na sistemu. Kao što smo rekli na početku, mi želimo da se izvršna aplikacija i biblioteka nađu u poddirektorijumu `bin` našeg projektnog direktorijuma, kao i da se sadržaj `leaves.jpeg` nađe u istom direktorijumu. 

Da bismo ovo omogućili, potrebno je da navedemo odgovarajuća pravila pomoću komande [`install`](https://cmake.org/cmake/help/v3.10/command/install.html). Ova jedna komanda nudi pregršt mogućnosti za precizno definisanje šta se izvozi i na koji način. Mi ćemo prikazati neke jednostavne upotrebe komande, a u dokumentaciji je moguće pronaći više primera sa detaljnim opisima.

(Odabrani) Argumenti ove komande su:
1. Tip datoteka koji se izvozi
    - Za izvršne datoteke i biblioteke koristićemo ključnu reč `TARGETS`, dok ćemo za obične datoteke koristiti ključnu reč `FILES`
1. Naziv jedne datoteke ili više njih na koje se pravilo odnosi
1. Ključna reč `DESTINATION`
1. Naziv direktorijuma u kojem će biti smeštene datoteke na koje se pravilo odnosi. Ovaj direktorijum zapravo predstavlja relativnu putanju u odnosu na poddirektorijum zadat u promenljivoj [`CMAKE_INSTALL_PREFIX`](https://cmake.org/cmake/help/v3.10/variable/CMAKE_INSTALL_PREFIX.html#variable:CMAKE_INSTALL_PREFIX).

Sada možemo da instaliramo aplikaciju `app` tako što dodamo narednu komandu na kraj `CMakeLists.txt` datoteke u korenom direktorijumu projekta:

```
install (TARGETS ${PROJECT_NAME} DESTINATION bin)
```

dok se za instaliranje biblioteke `stb_image` može iskoristiti identična komanda, sa razlikom da se ovoga puta smešta na kraju `thirdparty/CMakeLists.txt` datoteke. Za instaliranje datoteke `resources/leaves.jpeg`, napravićemo novu `CMakeLists.txt` datoteku u direktorijumu `resources`, koja će imati naredni sadržaj:

```
cmake_minimum_required(VERSION 3.10)

install (FILES "leaves.jpeg" DESTINATION bin)
```

Naravno, da bi ova datoteka bila obrađena od strane CMake sistema, potrebno je da je uključimo u korenoj `CMakeLists.txt` datoteci:

```
add_subdirectory(resources/)
```

### Dodatne specifikacije

#### Izvršavanje određenih akcija u zavisnosti od operativnog sistema

Ukoliko želimo, možemo određena pravila definisati samo za određene operativne sisteme. Na primer, neke biblioteke se na Linux sistemima pridružuju linkeru na jedan, dok se na Mac OSX sistemima pridružuju na drugi način. Da bismo ispitali koji je sistem u pitanju, možemo kombinovati pozive komandi [`if`](https://cmake.org/cmake/help/v3.10/command/if.html), [`elseif`](https://cmake.org/cmake/help/v3.10/command/if.html) i [`else`](https://cmake.org/cmake/help/v3.10/command/if.html) (potrebno je u svakom slučaju navesti i komandu [`endif`](https://cmake.org/cmake/help/v3.10/command/if.html) kao u narednom primeru), sa specijalnim promenljivama [`WIN32`](https://cmake.org/cmake/help/v3.10/variable/WIN32.html), [`UNIX`](https://cmake.org/cmake/help/v3.10/variable/UNIX.html) i [`APPLE`](https://cmake.org/cmake/help/v3.10/variable/APPLE.html). Na primer:

```
if(UNIX AND NOT APPLE)
    message(STATUS "Building on a Linux system...")
    # For easier distinguishing between Linux and Apple later in the code
    set(LINUX TRUE)
elseif(UNIX AND APPLE)
	message(STATUS "Building on a Mac OS X system...")
elseif(WIN32)
	message(STATUS "Building on a Windows system...")
else()
	message(FATAL_ERROR "Unknown building system...")
endif()
```

#### Biranje C++ standarda

S obzirom da naša aplikacija koristi deo [`filesystem` standardne biblioteke jezika C++](https://en.cppreference.com/w/cpp/filesystem) koji je dostupan od verzije C++17, potrebno je da specifikujemo da želimo da koristimo upravo tu verziju standarda. Za to je potrebno postaviti odgovarajuće svojstvo za našu aplikaciju, što se može izvršiti pomoću komande [`set_property`](https://cmake.org/cmake/help/v3.10/command/set_property.html). Nakon argumenata `TARGET`, naziva aplikacije/biblioteke i `PROPERTY` sledi naziv svojstva koji želimo da postavimo, kao i odgovarajuća vrednost. Specifikacija standarda C++17 se može izvršiti na sledeći način:

```
set_property(TARGET ${PROJECT_NAME} PROPERTY CXX_STANDARD 17)
```

Međutim, na Linux sistemu ovo nije dovoljno ukoliko se koristi `gcc-8` (odnosno, `g++-8`) kompilator. Zbog načina na koji kompilator radi, potrebno je navesti dodatne zastavice pri kompiliranju i linkovanju aplikacije, što se može uraditi postavljanjem promenljive `CMAKE_CXX_STANDARD_LIBRARIES`:

```
if (UNIX AND NOT APPLE)
	set(CMAKE_CXX_STANDARD_LIBRARIES "-std=c++17 -lstdc++fs")
endif()
```

## Pokretanje CMake sistema

Kada se CMake sistem instalira na Windows sistemu, dobija se aplikacija `cmake-gui.exe`, koja daje grafičko okruženje za komforan rad sa CMake sistemom. Na UNIX-zasnovanim sistemima ova aplikacija nije dostupna, te je potrebno raditi iz konzolne linije (naravno, postoje razni drugi, nezvanični grafički alati za UNIX sisteme, ali o njima neće biti reči).

### Windows sistemi

Kao što smo rekli, za pokretanje CMake sistema koristićemo alat `cmake-gui.exe` koji izgleda kao na narednoj slici kada se pokrene:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmakegui1.png)

Prvo je potrebno da specifikujemo koreni direktorijum projekta, odnosno, direktorijum koji sadrži korenu `CMakeLists.txt` datoteku, kao i direktorijum gde želimo da se nalaze projektne datoteke koje će CMake alat generisati:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmakegui2.png)

Nakon toga je potrebno odabrati dugme `Configure`. Ukoliko drugi direktorijum ne postoji, CMake će nas pitati da li želimo da ga kreiramo, za šta je potrebno odabrati opciju `Yes`:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmakegui3.png)

Nakon toga, potrebno je da navedemo za koji sistem želimo da CMake generiše projektne datoteke. S obzirom da koristimo Visual Studio 2017 u ovom članku, odabraćemo opciju `Visual Studio 15 2017 Win64` i odabraćemo opciju `Finish`:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmakegui4.png)

Nakon toga završetka opcije `Configure`, možemo da vidimo izlaz iz CMake sistema i vidimo ukoliko je došlo do neke greške.

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmakegui5.png)

Takođe, možemo izmeniti pozdrazumevanu vrednost za promenljivu `CMAKE_INSTALL_PREFIX`, što će za nas biti koreni direktorijum projekta:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmakegui6.png)

Nakon toga je potrebno odabrati dugme `Generate`.

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmakegui7.png)

Ukoliko je sve prošlo kako treba, biranjem dugmeta `Open Project` biće nam otvoren projekat u alatu Visual Studio 2017:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/vs1.png)

Sada možemo iz glavnog menija odabrati opciju `Build > Build Solution`:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/vs2.png)

U izlazu možemo videti ukoliko je kompiliranje prošlo uspešno:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/vs3.png)

Da bismo instalirali projekat, potrebno je da iz `Solution Explorer` prozora odaberemo projekat `INSTALL`, a zatim da iz glavnog menija odaberemo opciju `Build > Build INSTALL`:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/vs4.png)

Ukoliko je sve prošlo kako treba, projekat je uspešno instaliran:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/vs5.png)

Ukoliko želimo da pokrenemo aplikaciju iz Visual Studio alata umesto iz Windows Explorer ili Command Prompt aplikacija, potrebno je da postavimo projekat `app` za početni projekat. To je moguće uraditi odabiranjem projekta `app` iz `Solution Explorer` prozora, a zatim iz glavnog menija biranjem opcije `Project > Set as StartUp Project`:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/vs6.png)

Nakon toga se aplikacija pokreće biranjem dugmeta `Local Windows Debugger` ili skraćenicom `F5`. Primer izvršavanja programa je dat u nastavku:

![](https://github.com/theikeofficial/cmake-tutorial/raw/master/tutorial/cmd.png)

### UNIX sistemi (Linux slučaj)

Za automatizaciju procesa pokretanja CMake sistema na Linux sistemima, kreiraćemo `build.sh` skriptu koja će pokretati potrebne komande. Za početak, specifikujmo koje alate želimo da koristimo za kompiliranje. Pošto nam je neophodan standard C++17 i `filesystem` biblioteka, koristićemo `gcc-8` i `g++-8` alate:

```
export CC=/usr/bin/gcc-8
export CXX=/usr/bin/g++-8
```

Pre svakog pokretanja CMake sistema i sistema za prevođenje, želimo da obezbedimo čist projektni direktorijum, te ćemo obrisati `bin` i `build` poddirektorijume i kreirati novi `build` direktorijum:

```
rm -Rf build bin
mkdir build 
```

Zatim ćemo se pozicionirati u direktorijum `build` da bismo iz njega pokrenuli CMake sistem. Ovo radimo da bismo upravo u tom direktorijumu generisali sve projektne fajlove i time izbegli zagađivanje projektnog direktorijuma:

```
cd build
cmake .. -DCMAKE_INSTALL_PREFIX="../" -G "Unix Makefiles"
```

Argument alata `cmake` je direktorijum koji sadrži korenu `CMakeLists.txt` datoteku od koje počinje rad CMake sistema. Dodatnim argumentom `-DCMAKE_INSTALL_PREFIX=<...>` možemo specifikovati vrednost promenljive `CMAKE_INSTALL_PREFIX` koju će CMake sistem uzeti u obzir pri instaliranju projekta, dok se argumentom `-G "Unix Makefiles"` definiše da želimo da koristimo sistem zasnovan na `Makefile` datotekama kao sistem za prevođenje izvornog koda. Nakon ove komande, CMake sistem je za nas generisao potrebne `Makefile` datoteke, te je jednostavno potrebno pozvali alat `make` čime će se izvršiti kompiliranje. Dodatno, pozivamo `make install` da bi se izvršilo instaliranje projekta i vraćamo se u koreni direktorijum:

```
make
make install
cd ..
```

## Završna reč

Sistem CMake predstavlja veoma moćan alat za upravljanje sistemima za prevođenje na najrazličitijim platformama za projekte napisane u programskom jeziku C++. Na ovom jednostavnom primeru smo videli osnovnu paradigmu na kojoj se CMake zasniva; dalji razvoj ove aplikacije se jednostavno može proširiti dodavanjem novih modula i njihovim vezivanjem za glavnu aplikaciju. Naravno, ovo što smo videli u ovom članku je tek mali deo mogućnosti koje CMake sistem nudi, ali dovoljno da čitaoce zainteresuje da uvrste CMake sistem u svoje svakodnevne projekte, kao i da samostalno istražuju naprednije mogućnosti ovog sistema.

Celokupan izvorni kod koji je korišćen za kreiranje aplikacije je dostupan na [GitHub repozitorijumu projekta](https://github.com/theikeofficial/cmake-tutorial).
