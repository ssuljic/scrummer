[trello]: https://trello.com/b/Q5qdqq5B/scrum-management-tool
[ejasarevic]: https://github.com/ejasarevic
[ssuljic]: https://github.com/ssuljic
[mirhazec]: https://github.com/mirhazec
[zulicn]: https://github.com/zulicn

[Trello board][trello]

# Scrummer

Scrummer is a tool intended to help managing scrum projects, for both teams and individuals.

It will provide functionalities such as managing the sprint board, tracking status of tickets, managing the product backlog etc.

The technology stack consists of Ruby on Rails, AngularJS, PostgreSQL and will be deployed on Heroku platform (link will be available later).

###Modules of application are:

## 1. Login and registration module
1. Korisnik na raspolaganju ima opciju da se prijavi ukoliko već posjeduje account, ili da kreira novi account (nalog).
2. Prilikom registracije korisnika, potrebno je unijeti: Ime i prezime korisnika, korisničko ime (username) vidljivo u aplikaciji, šifru, kao i e-mail adresu.
3. U aplikaciji je osigurano da ne postoje dva korisnika sa istim korisničkim imenom, kao i ispravnost korisničkih podataka. 
4. Korisničke šifre se čuvaju u bazi u hashiranom obliku, te se na taj način osigurava privatnost korisnika.
5. U slučaju da korisnik zaboravi šifru, može odabrati opciju da mu se pošalje nova šifra na e-mail koji je unio prilikom registracije.
6. Korisnik koji nije prošao proces registracije ne može se prijaviti na sistem.

## 2. User management module
1. U aplikaciji postoje dva tipa registrovanih korisnika: Project manager i basic user (developer).
2. Project manager posjeduje opciju za kreiranjem novog projekta, kao i sprintova unutar pojedinog projekta. Project manager može dodjeljivati korisnike za rad na pojedinim ticketima, vršiti izmjene projektu, kao i pojedinačnim ticketima.
3. Basic user (developer) je zadužen za rad na jednom ili više ticketa. Prilikom rada na ticketu korisnik može evidentirati utrošeno vrijeme na tom ticketu, ostavljati komentare, kao i prebacivati ticketi iz jednog stanja u drugo.
4. Korisnici imaju mogućnost izmjene ličnih podataka (korisničko ime, šifra, e-mail)

## 3. Project management module
1. U okviru ovog modula, korisnici imaju mogućnost kreiranja novog projekta ili izmjene/brisanja nekog od postojećih projekata. 
2. Prilikom kreiranja novog projekta, potrebno je unijeti naziv projekta, te opcionalno korisnike koji su zaduženi za rad na projektu. Korisnike je moguće i naknadno dodati za rad na projektu.
3. Prilikom izmjene postojećeg projekta, moguće je mijenjati tickete (taskove) unutar projekta, kao i korisnike koji rade na projektu.

## 4. Ticket management module
1. Ticket predstavlja osnovnu jedinicu rada na projektu.
2. U aplikaciji postoji više tipova ticketa: Razvoj nove funkcionalnosti, ispravka bug-a postojeće funkcionalnosti, izmjena (redesign).
3. Prilikom kreiranja novog ticketa moguće je unijeti naziv ticketa, procijenjeno vrijeme trajanja za rad na ticketu, korisnike koji su zaduženi za rad na ticketu, kao i dodatni komentar vezan za sam ticket. Jedino je polje koje predstavlja naziv ticketa obavezno, ostala polja su opcionalna.
4. Ukoliko postoje ticketi koji pripadaju istoj funkcionalnosti, oni se mogu grupisati u user-stories, te je na taj način omogućena bolja preglednost i upravljanje projektom.
5. Svaki ticket se može nalaziti u 3 faze: To-do (ticket je napravljen, ali rad na ticketu još nije započeo), In-Progress (jedan ili više korisnika trenutno rade na ticketu) i Done (rad na ticketu je završen).
6. Prilikom rada na ticketu moguće je evidentirati vrijeme potrošeno na rad na ticketu, kao i ostavljati komentare vezane za ticket.
7. U aplikaciji je osigurano da ne postoje 2 ticketa sa istim nazivom unutar istog projekta.

## 5. Board module
1. Board module omogućava korisnicima pregled i upravljanje ticketima koji su dodijeljeni njemu.
2. Korisniku se prikazuju ticketi raspoređeni u tri grupe: To-Do, Active i Done. U To-Do grupi se nalaze ticketi koji su dodijeljeni korisniku, ali korisnik još nije započeo rad na njima. Active grupa sadrži tickete na kojima korisnik trenutno radi, dok se u Done grupi nalaze ticketi koje je korisnik završio. Na ovaj način korisnik ima uvid u svoj cjelokupan rad, kao i mogućnost upravljanja pojedinim ticketima (prebacivanje iz jednog stanja u drugo, evidentiranje rada ostavljanje komentara i sl.)

## 6. News feed module
1. News feed module predstavlja početnu stranicu aplikacije na kojoj su prikazana posljednje izmjene na projektu ili 
obavijesti za korisnika.
2. Izmjene su prikazane na način da se vidi vrijeme izmjene, vrsta izmjene, kao i korisnik koji je izvršio izmjenu na projektu. Izmjene su vidljive svim korisnicima koji rade na projektu, dok obavijesti mogu biti vezane za sve korisnike na projektu, ili za tačno određenog korisnika.
3. Korisnik ima mogućnost pregleda svake od izmjena koja je prikazana u news feed-u, kao i različitih vrsta obavijesti.

## 7. Backlog module
1. Da bi se omogućio uvid u historiju rada na projektu, aplikacija posjeduje i backlog modul. U ovom modulu se evidentiraju sve promjene vezane na projektu (kreiranje projekta, izmjena vezana za projekat ili pojedinu aktivnost unutar njega, itd.).
2. U okviru ovog modula je moguće dobiti informaciju o ukupnom broju kreiranih aktivnosti unutar projekta, vremenu rada na projektu, broju korisnika koji rade na projektu, broju završenih i nezavršenih aktivnosti u projektu, itd.



Contributors:
* [Eman Jasarevic][ejasarevic]
* [Sadzid Suljic][ssuljic]
* [Mirha Zec][mirhazec]
* [Nejra Zulic][zulicn]
