(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

})(jQuery);

// PREVENT CONTEXT MENU FROM OPENING
document.addEventListener("contextmenu", function(evt){
  	evt.preventDefault();
}, false);

// PREVENT CLIPBOARD COPYING
document.addEventListener("copy", function(evt){
  	// Change the copied text if you want
  	evt.clipboardData.setData("text/plain", "Copying is not allowed on this webpage");
 
  	// Prevent the default copy action
  	evt.preventDefault();
}, false);

const API_LOCATION = 'https://saulmiquilena.com.ve';

var misCabeceras = new Headers({
								"Accept": "application/text",
				    			"Content-Type": "text/plain",
				    			"Access-Control-Allow-Origin": "*",
				    			"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwibWVzc2FnZSI6IkR1ZGUsIFdURiEiLCJpYXQiOjE1ODUxODQ4MDksImV4cCI6MTkwMDU0NDgwOX0.Mw8KoyYjdUpdbtR1gFm0g-sFyiTeYplvypS6UDsfh3Q"
				    		});

var miInit = { 	
				method: "GET",
				headers: misCabeceras
			};

async function load_categories() {
	let data_categoria = null;
	try {
		let response_categoria = await fetch(API_LOCATION + '/api/cat/', miInit);
		data_categoria = await response_categoria.json();
	} catch(err) {
	    data_categoria = { status: 500 };
	}

	let for_categoria_html = "";

	if (await data_categoria.status == 200) {
		/*-- CATEGORIAS --*/
		let categorias = data_categoria.response;
			
		for_categoria_html = `<li><a href="index.html">Inicio</a></li>
									<li><a href="about.html">Sobre mï</a></li>`;

		for (var i = 0; i < categorias.length; i++) { 			

	  		for_categoria_html += `<li>
		  								<a href="catalogo.html?categoria=` + categorias[i].nombre + `">` + categorias[i].nombre + `</a>
		  							</li>`;
		}

		document.getElementById("lista-catalogos").innerHTML = for_categoria_html;
		document.getElementById("lista-catalogos-menu").innerHTML = for_categoria_html;

	} else {
	 	/*-- CATEGORIAS --*/

		for_categoria_html = `<li><a href="index.html">Inicio</a></li>
									<li><a href="about.html">Sobre mï</a></li>`;

		document.getElementById("lista-catalogos").innerHTML = for_categoria_html;
		document.getElementById("lista-catalogos-menu").innerHTML = for_categoria_html;
	}
}

load_categories();