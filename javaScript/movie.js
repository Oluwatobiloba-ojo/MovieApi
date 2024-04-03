const header = document.getElementById("imageHolder");
let description_movie = header.querySelector("#description")
let image = document.getElementById("page").querySelector("img");
let title = document.getElementById("page").querySelector("h3");
let form = document.forms["search_Bar"]




form.addEventListener('submit', (e)=>{
   e.preventDefault();
   let default_movie = form.querySelector('input[type="text"]').value;
   let url = `https://api.themoviedb.org/3/search/movie?query=${default_movie}&include_adult=true&language=en-US&page=1`
   getMovie(url);
})



const getMovie = async(url)=>{
	try{
	let response = await fetch(url, {
						method : "GET",
						headers:{
								accept: 'application/json',
								Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmI4YTg3M2FmZWYwMjcxOWExMGQ0MjY5MTM2MDlmMiIsInN1YiI6IjY1ZWU0NjdjMGJjNTI5MDE2M2VmYTJjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U6RQslg4gHp4K8Qiu2TajaykjhkkdwXrLTdCmYDWySU'
								}
	})
	let data = await response.json();
    if (data.results.length != 0){
	displayImage(data.results[0]);
    }
}catch(error){
	console.log(error);
}
}


function displayImage(movie){
    let base_url = "https://image.tmdb.org/t/p/w500"
    let poster_url = `${base_url}${movie.backdrop_path}`
   let New_image = document.createElement("img")
   title.textContent = `Title : ${movie.title}`
   let description = createDescripton(movie);
   New_image.src = poster_url;
   New_image.alt = "spartacus";
   description_movie.innerHTML = description.innerHTML;
   image.src = New_image.src; 
}


function createDescripton(movie){
    const description_movie = document.createElement("div");
    description_movie.id = "description";
    let date_released  = document.createElement("p");
    date_released.textContent = `Date Released: ${movie.release_date}`;
    let overview = document.createElement("p");
    overview.textContent = `Overview : ${movie.overview}`;
    let language = document.createElement("p");
    language.textContent = `Language : ${movie.original_language}`;
    description_movie.appendChild(date_released);
    description_movie.appendChild(overview);
    description_movie.appendChild(language);
    return description_movie;
}

