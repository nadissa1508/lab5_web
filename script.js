

//Función para crear el header con la barra de busqueda

function searchBar(){

    //crear el header
    let header = document.createElement("header");
    header.id = "header";
    header.style.display = "flex";
    header.style.position = "sticky";
    header.style.alignItems = "center";
    header.style.justifyContent = "center";
    header.style.height = "60px";
    header.style.padding = "10px";  
    header.style.backgroundColor = "#fc667f";


    //crear label barra de busqueda
    let labelSearchBar = document.createElement("label");
    labelSearchBar.id = "labelSearchBar";
    labelSearchBar.textContent = "SEARCH BAR"; 
    labelSearchBar.style.fontSize = '20px';
    labelSearchBar.style.fontWeight = 'bold';
    labelSearchBar.style.color = 'white';
    labelSearchBar.style.padding = "25px";

    //crear el input
    let searchBar = document.createElement("input");
    searchBar.id = "searchBar";
    searchBar.setAttribute("type", "text");
    searchBar.setAttribute("placeholder", "Search Reddit UVG...");
    searchBar.style.padding = "5px";
    searchBar.style.border = 'none';
    searchBar.style.width = "80%";
    searchBar.style.height = "35px";
    searchBar.style.borderRadius = '20px';
    searchBar.style.backgroundColor = '#fef4f5';
    searchBar.style.textIndent = "15px";

    header.appendChild(labelSearchBar);
    header.appendChild(searchBar);
    document.body.appendChild(header);

    //adicional, ver si puedo colocar un icono de lupa
}

//Función para crear el div contenedor post (contiene todos los posts)

function createPostContainer(){
    
    let postContainer = document.createElement("div");
    postContainer.id = "postContainer";
    postContainer.style.display = "flex";
    postContainer.style.flexDirection = "column";
    postContainer.style.alignItems = "center";
    postContainer.style.justifyContent = "center";
    document.body.appendChild(postContainer);
    fetchPosts();

}

//Función para crear un card post -> utilizar for
function fetchPosts() {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=10')
        .then(response => response.json())
        .then(data => {
            const postContainer = document.getElementById('postContainer');
            postContainer.innerHTML = '';

            // Mezclar aleatoriamente y tomar 10 elementos
            let dataFiltered = data.sort(() => Math.random() - 0.5).slice(0, 10);
            
            dataFiltered.forEach(character => {
                let cardElement = document.createElement('div');
                //estilo de la card
                cardElement.style.width = '85%';
                cardElement.style.height = '350px';
                cardElement.style.margin = '10px 0';
                cardElement.style.padding = '20px';
                cardElement.style.borderRadius = '20px';
                cardElement.style.display = 'flex';
                cardElement.style.flexDirection = 'row';
                cardElement.style.alignItems = 'center';
                cardElement.style.boxShadow = '6px 6px 6px rgba(0, 0, 0, 0.1)';
                cardElement.style.backgroundColor = "#fbc2c8";

                let textContainer = document.createElement("div");
                textContainer.id = "textContainer";
                textContainer.style.padding = "40px";
                textContainer.style.display = 'flex';
                textContainer.style.flexDirection = 'column';
                textContainer.style.alignItems = 'flex-start'; 
                textContainer.style.width = '60%';

                //titulo
                let title = document.createElement('h1');
                title.textContent = character.character;
                title.style.color = '#884154';

                //descripcion
                let description = document.createElement('p');
                description.textContent = character.quote;

                //imagen
                let image = document.createElement('img');
                image.src = character.image;
                image.alt = character.character;
                image.style.width = '150px';
                image.style.padding = '30px';
                image.style.borderRadius = '5px';
                image.style.objectFit = 'cover';

                //boton para seleccionar el post
                let button = document.createElement('button');
                button.id = 'seeMoreButton';
                button.textContent = 'Ver más';
                button.style.marginTop = "10px";
                button.style.padding = "5px 10px";
                button.style.backgroundColor = "#007bff";
                button.style.color = "white";
                button.style.borderRadius = "5px";
                button.style.cursor = "pointer";

                button.addEventListener("click", () => showSelectedPost(character));

                //agregamos todo el texto a su contenedor
                textContainer.appendChild(title);
                textContainer.appendChild(description);
                textContainer.appendChild(button);

                //agregamos los elementos a la card
                cardElement.appendChild(textContainer);
                cardElement.appendChild(image);

                //agregarmos la card al contenedor
                postContainer.appendChild(cardElement);
            });
        })
        .catch(error => console.error('Error fetching characters:', error));
}

//Funcionalidad del botón para regresar -> si redibujo será volver a dibujar la pantalla principal
function showPosts(){
    let infoPostContainer = document.getElementById('infoPostContainer');
    infoPostContainer.remove();
    let addCommentContainer = document.getElementById('addCommentContainer');
    addCommentContainer.remove();
    let showCommentsContainer = document.getElementById('showCommentsContainer');
    showCommentsContainer.remove();
    let backButton = document.getElementById('goBackButton');
    backButton.remove();
    searchBar();
    createPostContainer();
}

//Función crear el botón regresar

function goBackButton(){
    let button = document.createElement('button');
    button.id = 'goBackButton';
    button.textContent = 'Regresar';
    button.style.marginTop = "10px";
    button.style.padding = "5px 10px";
    button.style.backgroundColor = "#fc667f";
    button.style.color = "#ffffff";
    button.style.cursor = "pointer";
    button.style.width = '150px';
    button.style.height = '50px';
    button.style.borderRadius = "30px";
    button.style.fontWeight = 'bold';
    button.style.fontSize = '16px';
    button.style.border = "none";

    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#fc667f";
        button.style.color = "white";
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#fbc2c8";
        button.style.color = "#884154";
    });

    
    button.addEventListener("click", () => 
        showPosts()
    );
    document.body.appendChild(button);
}


//Función para redibujar y mostrar el post seleccionado
function showSelectedPost(character){
    //eliminar contenedores de la pagina
    let postContainer = document.getElementById('postContainer');
    postContainer.remove();
    let header = document.getElementById('header');
    header.remove();
    
    //agregar boton para regresar
    goBackButton();

    //contenedor info post
    let infoPostContainer = document.createElement("div");
    infoPostContainer.id = "infoPostContainer";
    infoPostContainer.style.width = '100%';
    infoPostContainer.style.height = '350px';
    infoPostContainer.style.padding = '20px';
    infoPostContainer.style.borderRadius = '20px';
    infoPostContainer.style.display = 'flex';
    infoPostContainer.style.flexDirection = 'row';
    infoPostContainer.style.alignContent = 'flex-start';
    infoPostContainer.style.justifyContent = 'center';
    infoPostContainer.style.margin = '20px 0';
    infoPostContainer.style.backgroundColor = '#fef4f5';

    let textContainer = document.createElement("div");
    textContainer.id = "textContainer";
    textContainer.style.padding = "40px";
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';
    textContainer.style.alignContent= 'flex-start'; 
    textContainer.style.width = '60%';

    //agregar elementos del post, ver si se puede hacer una función que generalice esto

    //titulo
    let title = document.createElement('h1');
    title.textContent = character.character;

    //descripcion
    let description = document.createElement('p');
    description.textContent = character.quote;

    //imagen
    let image = document.createElement('img');
    image.src = character.image;
    image.alt = character.character;
    image.style.width = '150px';
    image.style.padding = '30px';
    image.style.borderRadius = '5px';
    image.style.objectFit = 'cover';

    textContainer.appendChild(title);
    textContainer.appendChild(description);

    //agregar los elementos del post al contenedor
    infoPostContainer.appendChild(textContainer);
    infoPostContainer.appendChild(image);

    //agregar el contenedor del post al body

    document.body.appendChild(infoPostContainer);

    //contenedor add comment
    addComment();

    //contenedor para los comentarios, aca deberia de mandar como parametro el id del post
    showComments();
}

//Función para div de agregar comentarios

function addComment(){
    //contenedor
    let addCommentContainer = document.createElement("div");
    addCommentContainer.id = "addCommentContainer";
    addCommentContainer.style.width = '89%';
    addCommentContainer.style.height = '100px';
    addCommentContainer.style.display = "flex";
    addCommentContainer.style.alignItems = "center";
    addCommentContainer.style.justifyContent = "space-around";
    addCommentContainer.style.margin = '20px auto';
    addCommentContainer.style.border = '3px solid #fbc2c8';
    addCommentContainer.style.padding = "10px";  
    addCommentContainer.style.borderRadius = "30px";


    // input
    let input = document.createElement("input");
    input.id = "inputComment";
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Agregar comentario...");
    input.style.padding = "25px";
    input.style.width = "80%";
    input.style.border = 'none';
    input.style.borderRadius = '40px';
    input.style.backgroundColor = '#fef4f5';
    input.style.textIndent = "10px";


    //boton
    let button = document.createElement('button');
    button.id = 'addCommentButton';
    button.textContent = 'Comentar';
    button.style.padding = '5px 10px';
    button.style.width = '150px';
    button.style.height = '50px';
    button.style.color = '#ffffff';
    button.style.backgroundColor = '#fc667f';
    button.style.borderRadius = "30px";
    button.style.cursor = 'pointer';
    button.style.fontWeight = 'bold';
    button.style.fontSize = '16px';
    button.style.border = "none";

    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#fc667f";
        button.style.color = "white";
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#fbc2c8";
        button.style.color = "#884154";
    });
    

    //agregar elementos al container
    addCommentContainer.appendChild(input);
    addCommentContainer.appendChild(button);

    //agregar el container al body
    document.body.appendChild(addCommentContainer);    

}

//Función para el div con la lista de comentarios -> utilizar un for para mostrarlos

function showComments(id){
    let showCommentsContainer = document.createElement("div");
    showCommentsContainer.id = "showCommentsContainer";
    showCommentsContainer.style.width = '90%';
    showCommentsContainer.style.height = '100%';
    showCommentsContainer.style.display = "flex";
    showCommentsContainer.style.flexDirection = "column"; 
    showCommentsContainer.style.alignItems = "center"; 
    showCommentsContainer.style.justifyContent = "center";
    showCommentsContainer.style.margin = "20px auto";
    showCommentsContainer.style.gap = "10px";
    showCommentsContainer.style.border = '3px solid #fbc2c8';
    showCommentsContainer.style.borderRadius = '30px';

    let titleComments = document.createElement("h1");
    titleComments.textContent = "Comentarios";
    titleComments.style.color = '#884154';
    titleComments.style.alignContent = "left";
    titleComments.style.textAlign = "left";


    showCommentsContainer.appendChild(titleComments);
    
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count=5')
        .then(response => response.json())
        .then(data => {
            
            // Mezclar aleatoriamente y tomar 10 elementos
            let dataFiltered = data.sort(() => Math.random() - 0.5).slice(0, 5);
            
            dataFiltered.forEach(character => {
                let cardElement = document.createElement('div');
                //estilo de la card
                cardElement.style.width = '85%';
                cardElement.style.height = '60px';
                cardElement.style.margin = '10px 0';
                cardElement.style.padding = '10px';
                cardElement.style.borderRadius = '20px';
                cardElement.style.display = 'flex';
                cardElement.style.flexDirection = 'row';
                cardElement.style.alignItems = 'center';
                cardElement.style.boxShadow = '6px 6px 6px rgba(0, 0, 0, 0.1)';
                cardElement.style.backgroundColor = "#ffcbd1";

                //usuario
                let user = document.createElement('h3');
                user.textContent = character.character;
                user.style.padding = '10px';
                user.style.color = '#884154';

                //comentario
                let comment = document.createElement('p');
                comment.textContent = character.quote;
                comment.style.padding = '10px';

                //agregamos los elementos a la card
                cardElement.appendChild(user);
                cardElement.appendChild(comment);

                //agregarmos la card al contenedor
                showCommentsContainer.appendChild(cardElement);
            });
        })
        .catch(error => console.error('Error fetching characters:', error));

    document.body.appendChild(showCommentsContainer);
}

//empezar a llamar a mis funciones
document.body.style.backgroundColor = "#fef4f5";
searchBar();
createPostContainer();
