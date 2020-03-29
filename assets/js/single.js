async function load() {
	let data = null;
  	try {
  		const queryString = window.location.search;
  		const urlParams = new URLSearchParams(queryString);
  		const post_id = urlParams.get('post')

  		let response = await fetch(API_LOCATION + '/api/post/' + post_id, miInit);
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
						<a href="about.html" class="author"><span class="name">Maribel Smith</span><img src="assets/images/logo.jpg" alt="Maribel Smith | Escritora" /></a>
					</div>
				</header>
				<a href="single.html?post=` + resultado[i].id + `" class="image featured">
					<div id="image-holder">
						<img src="assets/images/pic01.jpg" alt="" class="loader_imagen"/>
					</div>
				</a>
				<p style="text-align: justify;">`+ resultado[i].articulo +`</p>
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
  		/*-- POSTS --*/
	  		for_post_html = `<article class="post">
			<header>
				<div class="title">
					<h2><a href="javascript:void(0)">Magna sed adipiscing</a></h2>
					<p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
				</div>
				<div class="meta">
					<time class="published" datetime="`+ today +`">`+ dd + ' de ' + month_text + ' de ' + yyyy +`</time>
					<a href="javascript:void(0)" class="author"><span class="name">Sin Autor</span><img src="assets/images/avatar.jpg" alt="" /></a>
				</div>
			</header>
			<span class="image featured"><img src="assets/images/pic01.jpg" alt="" /></span>
			<p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
			<p>Nunc quis dui scelerisque, scelerisque urna ut, dapibus orci. Sed vitae condimentum lectus, ut imperdiet quam. Maecenas in justo ut nulla aliquam sodales vel at ligula. Sed blandit diam odio, sed fringilla lectus molestie sit amet. Praesent eu tortor viverra lorem mattis pulvinar feugiat in turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ullamcorper tellus sit amet mattis dignissim. Phasellus ut metus ligula. Curabitur nec leo turpis. Ut gravida purus quis erat pretium, sed pellentesque massa elementum. Fusce vestibulum porta augue, at mattis justo. Integer sed sapien fringilla, dapibus risus id, faucibus ante. Pellentesque mattis nunc sit amet tortor pellentesque, non placerat neque viverra. </p>
			<footer>
				<ul class="stats">
					<li><a href="javascript:void(0)">Categoría</a></li>
				</ul>
			</footer>
		</article>`; 

  		document.getElementById("all_posts").innerHTML = for_post_html;
  	}

}

load();