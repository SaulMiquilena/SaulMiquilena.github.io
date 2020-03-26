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

async function load() {
	let data = null;
  	try {
  		const queryString = window.location.search;
  		const urlParams = new URLSearchParams(queryString);
  		const category = urlParams.get('categoria')

  		let response = await fetch(API_LOCATION + '/api/post_cat/' + category, miInit);
  		data = await response.json();
  	} catch(err) {
	    data = { status: 500 };
  	}						  								  	

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let mm_single = String(today.getMonth() + 1).padStart(1, '0') - 1; //January is 0!
	let month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	let month_text = month[mm_single];
	let yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;

	let for_post_html = ""; 
	
  	if (await data.status == 200) {
		let resultado = data.response;

		for (var i = 0; i < resultado.length; i++) {

			function loadImage(url) {
			    return new Promise((resolve, reject) => {
			      	let img = new Image();
			      	img.addEventListener('load', e => resolve(img));
			      	img.addEventListener('error', () => {
			        	reject(new Error(`Failed to load image's URL: ${url}`));
			      	});
			      	img.src = url;
			    });
			 }

			// load the image, and append it to the element id="image-holder"
			loadImage(resultado[i].imagen)
			    .then(img => { img.height = 180; img.width = 350; document.getElementById('image-holder').replaceWith(img) })
			    .catch(error => console.error(error));

			for_post_html += `<article class="post">
				<header>
					<div class="title">
						<h2><a href="single.html?post=` + resultado[i].id + `">` + resultado[i].titulo + `</a></h2>
						<p>` + resultado[i].subtitulo + `</p>
					</div>
					<div class="meta">
						<time class="published" datetime="`+ resultado[i].fecha_publicacion +`">`+ resultado[i].fecha_nombre +`</time>
						<a href="about.html" class="author"><span class="name">Maribel Smith</span><img src="images/logo.jpg" alt="Maribel Smith | Escritora Freelance" /></a>
					</div>
				</header>
				<div class="row">
					<div>
						<a href="single.html?post=` + resultado[i].id + `">
							<div id="image-holder">
								<img src="images/pic01.jpg" alt="" width="350" height="180" class="image loader_imagen"/>
							</div>
						</a>
					</div>
					<div style="width: 60vw">
						<p style="text-align: justify;">`+ resultado[i].previa +`</p>
						<li style="list-style: none;"><a href="single.html?post=` + resultado[i].id + `" class="button large">Continuar Leyendo</a></li>
					</div>
				</div>
				<footer>
					<ul class="actions"></ul>
					<ul class="stats">
						<li><a href="catalog.html?categoria=` + resultado[i].categoria + `">` + resultado[i].categoria + `</a></li>
					</ul>
				</footer>
			</article>`;
		}

		document.getElementById("all_posts").innerHTML = for_post_html;			
	} else if (await data.status == 400) {
		/*-- POSTS --*/
	  		for_post_html = `<article class="post">
				<header>
					<div class="title">
						<h2>Lo Sentimos...</h2>
						<p>`+ data.error +`</p>
					</div>
				</header>
			</article>`;

			 setTimeout(() => { document.getElementById("all_posts").innerHTML = for_post_html; }, 5000);
			
  	} else {
	  		for_post_html = `<article class="post">
			<header>
				<div class="title">
					<h2><a href="#">Magna sed adipiscing</a></h2>
					<p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
				</div>
				<div class="meta">
					<time class="published" datetime="`+ today +`">`+ dd + ' de ' + month_text + ' de ' + yyyy +`</time>
					<a href="#" class="author"><span class="name">Sin Autor</span><img src="images/avatar.jpg" alt="" /></a>
				</div>
			</header>
			<div class="row">
				<div>
					<span class="image"><img src="images/pic01.jpg" width="350" height="180" alt="" /></span>
				</div>
				<div style="width: 60vw">
					<p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>					
					<li style="list-style: none;"><a href="#" class="button large">Continuar Leyendo</a></li>
				</div>
			</div>
			<footer>
				<ul class="actions"></ul>
				<ul class="stats">
					<li><a href="#">Categoría</a></li>
				</ul>
			</footer>
		</article>`; 

  		document.getElementById("all_posts").innerHTML = for_post_html;
  	}

}

load();