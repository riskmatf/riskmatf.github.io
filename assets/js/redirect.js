/*
 * Skripa treba uvek sajt da preusmerava na http://risk.matf.bg.ac.rs,
 * ovo je potrebno da bi ispravno radili komentari, jer su moguci samo na jednom domenu.
 * */

if(window.location.href.includes("http://risk.math.rs")) {
	window.location.replace("http://risk.matf.bg.ac.rs" + document.location.pathname);
}
