

//Función para crear el header con la barra de busqueda

function searchBar(){

    //crear el header
    let header = document.createElement("header");
    header.style.display = "flex";
    header.style.position = "sticky";
    header.style.alignItems = "center";
    header.style.justifyContent = "center";
    header.style.border = "solid black 2px";
    header.style.height = "60px";
    header.style.padding = "10px";  

    //crear label barra de busqueda
    let labelSearchBar = document.createElement("label");
    labelSearchBar.textContent = "SEARCH BAR"; 
    labelSearchBar.style.fontSize = '20px';
    labelSearchBar.style.fontWeight = 'bold';
    labelSearchBar.style.padding = "25px";

    //crear el input
    let searchBar = document.createElement("input");
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute("placeholder", "Search Reddit UVG...");
    searchBar.style.padding = "5px";
    searchBar.style.width = "80%";

    header.appendChild(labelSearchBar);
    header.appendChild(searchBar);
    document.body.appendChild(header);

    //adicional, ver si puedo colocar un icono de lupa
}

//Función para crear un card post -> utilizar for

function createCardPost(){

}

//Función para crear el div contenedor post (contiene todos los posts)

function createPostContainer(){

    let postContainer = document.createElement("div");
    postContainer.style.display = "flex";
    postContainer.style.alignItems = "center";
    postContainer.style.justifyContent = "center";
    postContainer.style.border = "solid black 2px";
    postContainer.style.height = "100%";
    postContainer.style.padding = "10px"; 

    createCardPost();
    
    document.body.appendChild(postContainer);

}

//Función para redibujar y mostrar el post seleccionado

function showSelectedPost(){

}

//Funcinalida del botón para regresar -> si redibujo será volver a dibujar la pantalla principal

function showPosts(){

}

//Función crear el botón regresar

function createButton(){

}


//Función para div de agregar comentarios

function addComment(){

}

//Función para el div con la lista de comentarios -> utilizar un for para mostrarlos

function showComments(){

}

//empezar a llamar a mis funciones
searchBar();
createPostContainer();
