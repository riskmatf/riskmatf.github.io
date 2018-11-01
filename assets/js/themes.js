console.log("themejs");
let body = document.querySelector('body');
let css = document.querySelector("#ccss");
body.addEventListener('keypress', (e) => {
	console.table(e);
	switch(e.key) {
	case "1":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/minty/bootstrap.min.css");
		break;
	case "2":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/sandstone/bootstrap.min.css");
		break;
	case "3":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/superhero/bootstrap.min.css");
		break;
	case "4":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/lux/bootstrap.min.css");
		break;
	case "5":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/cyborg/bootstrap.min.css");
		break;
	case "6":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/sketchy/bootstrap.min.css");
		break;
	case "7":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/solar/bootstrap.min.css");
		break;
	case "8":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/united/bootstrap.min.css");
		break;
	case "9":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/litera/bootstrap.min.css");
		break;
	case "0":
		css.setAttribute("href", "https://stackpath.bootstrapcdn.com/bootswatch/4.1.3/journal/bootstrap.min.css");
		break;
	default:
		console.log("batman nananananan");
	}	

});
