async function load() {
	let data = null;
  	try {
  		let response = await fetch(API_LOCATION + '/api/posts/2', miInit);
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
	
  	if (await data.status == 200) {
		let resultado = data.response;

		for (var i = 0; i < resultado.length; i++) {

			// load the image, and append it to the element id="image-holder"
			loadImage(resultado[i].imagen)
			    .then(img => document.getElementById('image-holder').replaceWith(img))
			    .catch(error => console.error(error));

			for_post_html += `<article class="post ` + resultado[i].categoria + `">
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
				<a href="single.html?post=` + resultado[i].id + `" class="image featured">
					<div id="image-holder">
						<img src="images/pic01.jpg" width="829" height="338" alt="" class="loader_imagen"/>
					</div>
				</a>
				<p style="text-align: justify;">`+ resultado[i].previa +`</p>
				<footer>
					<ul class="actions">
						<li><a href="single.html?post=` + resultado[i].id + `" class="button large">Continuar Leyendo</a></li>
					</ul>
					<ul class="stats">
						<li><a href="catalog.html?categoria=` + resultado[i].categoria + `">` + resultado[i].categoria + `</a></li>
					</ul>
				</footer>
			</article>`;
		}

		document.getElementById("all_posts").innerHTML = for_post_html;								
  	} else {
  		/*-- POSTS --*/
  		for_post_html = `<article class="post">
			<header>
				<div class="title">
					<h2><a href="javascript:void(0)">Magna sed adipiscing</a></h2>
					<p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
				</div>
				<div class="meta">
					<time class="published" datetime="`+ today +`">`+ dd + ' de ' + month_text + ' de ' + yyyy +`</time>
					<a href="javascript:void(0)" class="author"><span class="name">Sin Autor</span><img src="images/avatar.jpg" alt="" /></a>
				</div>
			</header>
			<a href="single.html" class="image featured"><img src="images/pic01.jpg" alt="" /></a>
			<p style="text-align: justify;">Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
			<footer>
				<ul class="actions">
					<li><a href="javascript:void(0)" class="button large">Continuar Leyendo</a></li>
				</ul>
				<ul class="stats">
						<li><a href="javascript:void(0)">Categoría</a></li>
					</ul>
			</footer>
		</article>`; 

  		document.getElementById("all_posts").innerHTML = for_post_html;
  	}


  	let data_lista = null;
  	try {
  		let response_lista = await fetch(API_LOCATION + '/api/posts/5', miInit);
  		data_lista = await response_lista.json();
  	} catch(err) {
	    data_lista = { status: 500 };
  	}

  	let for_post_list_html = "";

  	if (await data_lista.status == 200) {
  		/*-- POST LIST --*/
		let lista = data_lista.response;
		
		for (var i = 0; i < lista.length; i++) {

			// load the image, and append it to the element id="image-holder-list"
			loadImage(lista[i].imagen)
			    .then(img => { img.height = 64; img.width = 64; document.getElementById('image-holder-list').replaceWith(img) })
			    .catch(error => console.error(error));		    

	  		for_post_list_html += `<li>
									<article>
										<header>
											<div class="row">
												<h3><a href="single.html?post=` + lista[i].id + `">` + lista[i].titulo + `</a></h3>
											</div>
											<div class="row">
												<p>` + lista[i].categoria + `</p>
											</div>
										</header>
										<a href="single.html?post=` + lista[i].id + `" class="image">											
											<div id="image-holder-list">
												<img src="images/pic08.jpg"alt="" class="loader_imagen"/>
											</div>
										</a>
									</article>
								</li>`;
		}

		document.getElementById("posts_list").innerHTML = for_post_list_html;
  	} else {
  	 	/*-- POST LIST --*/

  		for_post_list_html = `<li>
								<article>
									<header>
										<div class="row">
											<h3><a href="javascript:void(0)">Lorem ipsum fermentum ut nisl vitae</a></h3>
										</div>
										<div class="row">
											<p>Sin Categoría</p>
										</div>
									</header>
									<a href="javascript:void(0)" class="image"><img src="images/pic11.jpg" alt="" /></a>
								</article>
							</li>`;

		document.getElementById("posts_list").innerHTML = for_post_list_html;
  	}

}

load();