/**
 * prompt: como puedo hacer que la barra de busqueda funcione, de forma que busque y 
 * traiga la informacion mientras el usuario escribe, como funciona normalmente una barra de busqueda
 * 
 * resultado: 
 * 
 * Para lograr esto, necesitas hacer dos cosas:

 * Escuchar cada tecla que el usuario presiona (usando el evento keyup o input).

 * Evitar sobrecargar la API con demasiadas solicitudes mientras el usuario escribe. Esto se logra 
 * usando una técnica llamada debouncing.
 * 
 * 
 * let timeoutId; // Variable para almacenar el ID del timeout

 * searchBarInput.addEventListener("input", () => {
 * clearTimeout(timeoutId); // Limpiar el timeout anterior

 *   // Esperar 300 ms antes de realizar la búsqueda
 *   timeoutId = setTimeout(() => {
 *       const searchTerm = searchBarInput.value.trim(); // Obtener el valor del input
 *       if (searchTerm) {
 *           fetchPosts(searchTerm); // Llamar a la API con el término de búsqueda
 *       } else {
 *           fetchPosts(); // Si el campo está vacío, mostrar todos los posts
 *       }
 *   }, 300); // Retraso de 300 ms
 * });
 */


//Función para crear el header con la barra de busqueda

function searchBar(){

    //crear el header
    let header = document.createElement("header");
    header.id = "header";
    header.style.display = "flex";
    header.style.position = "fixed";
    header.style.alignItems = "center";
    header.style.justifyContent = "center";
    header.style.width = "100%";
    header.style.height = "70px";
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
    let searchBarInput = document.createElement("input");
    searchBarInput.id = "searchBar";
    searchBarInput.setAttribute("type", "text");
    searchBarInput.setAttribute("placeholder", "Search Reddit UVG...");
    searchBarInput.style.padding = "5px";
    searchBarInput.style.border = 'none';
    searchBarInput.style.width = "80%";
    searchBarInput.style.height = "35px";
    searchBarInput.style.borderRadius = '20px';
    searchBarInput.style.backgroundColor = '#fef4f5';
    searchBarInput.style.textIndent = "15px";

    let timeoutId;

    // La barra de busqueda escucha cuando se escribe en ella
    searchBarInput.addEventListener("input", () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fetchPosts(searchBarInput.value.trim()); 
        }, 200);
    });

    header.appendChild(labelSearchBar);
    header.appendChild(searchBarInput);
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
    fetchPosts('');

}

//Función para crear un card post -> utilizar for
function fetchPosts(keyword) {
    
    
    fetch('http://awita.site:3000/posts')
        .then(response => response.json())
        .then(data => {
            const postContainer = document.getElementById('postContainer');
            postContainer.innerHTML = '';

            // filtrar segun el titulo con la barra de busqueda
            let filteredPosts

            if(keyword){
                filteredPosts = data.posts.filter(post => post.titulo.toLowerCase().includes(keyword.toLowerCase()) || post.descripcion.toLowerCase().includes(keyword.toLowerCase()));
            }else{
                filteredPosts = data.posts;
            }
        
            filteredPosts.forEach(post => {
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
                cardElement.style.justifyContent = "space-around";
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
                title.textContent = post.titulo;
                title.style.color = '#884154';

                //descripcion
                let description = document.createElement('p');
                description.textContent = post.descripcion;

                //imagen
                let image = document.createElement('img');
                image.src = post.imagen;
                image.alt = post.titulo;
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
                button.style.backgroundColor = "#fc667f";
                button.style.color = "white";
                button.style.cursor = "pointer";
                button.style.width = '150px';
                button.style.height = '50px';
                button.style.borderRadius = "30px";
                button.style.fontWeight = 'bold';
                button.style.fontSize = '16px';
                button.style.border = "none";
            

                button.addEventListener("click", () => showSelectedPost(post));

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
        .catch(error => console.error('Error fetching posts:', error));
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
function showSelectedPost(post){
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
    title.textContent = post.titulo;

    //descripcion
    let description = document.createElement('p');
    description.textContent = post.descripcion;

    //imagen
    let image = document.createElement('img');
    image.src = post.imagen;
    image.alt = post.titulo;
    image.style.width = '300px';
    image.style.height = '300px';
    image.style.padding = '30px';
    image.style.borderRadius = '5px';
    image.style.objectFit = 'contain';

    textContainer.appendChild(title);
    textContainer.appendChild(description);

    //agregar los elementos del post al contenedor
    infoPostContainer.appendChild(textContainer);
    infoPostContainer.appendChild(image);

    //agregar el contenedor del post al body

    document.body.appendChild(infoPostContainer);

    //contenedor add comment
    addComment(post.id);

    //contenedor para los comentarios, aca deberia de mandar como parametro el id del post
    showComments(post.id);
}

function postComment(postId, comment){
    fetch("http://awita.site:3000/comment", {
        method: "POST",
        body: JSON.stringify({
            post_id: postId,
            username: "Jane Doe",
            comentario: comment
        }),
        
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error('Error agregando comentario:', error));
}

//Función para div de agregar comentarios

function addComment(postId){
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
    input.setAttribute("maxlength", "140");
    input.style.padding = "25px";
    input.style.width = "80%";
    input.style.border = 'none';
    input.style.borderRadius = '40px';
    input.style.backgroundColor = '#fef4f5';
    input.style.textIndent = "10px";

    //requisito de no permitir más de 140 caracteres
     input.addEventListener("input", () => {
        if (input.value.length > 140) {
            alert("El comentario es demasiado largo!");
            input.value = input.value.slice(0, 140); // Truncar el texto
        }
    });

    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if(input.value.length > 0){
                postComment(postId, input.value.trim());
                showComments(postId);
                input.value = "";
            }
        }
    });

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

    

    button.addEventListener("click", () => {
        if(input.value.length > 0){
            postComment(postId, input.value.trim());
            showComments(postId);
            input.value = "";
        }
    })
    

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

function showComments(postId){
    let showCommentsContainer = document.createElement("div");
    showCommentsContainer.id = "showCommentsContainer";
    showCommentsContainer.style.width = '90%';
    showCommentsContainer.style.height = '700px';
    showCommentsContainer.style.display = "flex";
    showCommentsContainer.style.flexDirection = "column"; 
    showCommentsContainer.style.alignItems = "center"; 
    showCommentsContainer.style.justifyContent = "center";
    showCommentsContainer.style.margin = "20px auto";
    showCommentsContainer.style.gap = "10px";
    showCommentsContainer.style.border = '3px solid #fbc2c8';
    showCommentsContainer.style.borderRadius = '30px';
    showCommentsContainer.style.overflow = 'auto';

    let titleComments = document.createElement("h1");
    titleComments.textContent = "Comentarios";
    titleComments.style.color = '#884154';
    titleComments.style.paddingTop = '25px';

    showCommentsContainer.appendChild(titleComments);
    
    fetch(`http://awita.site:3000/comments/${postId}`)
        .then(response => response.json())
        .then(data => {
            
            // Mezclar aleatoriamente y tomar 10 elementos
            //dataFiltered = data.sort(() => Math.random() - 0.5).slice(0, 6);
            
            data.comments.forEach(commentElement => {
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
                user.textContent = commentElement.username;
                user.style.padding = '10px';
                user.style.color = '#884154';

                //comentario
                let comment = document.createElement('p');
                comment.textContent = commentElement.comentario;
                comment.style.padding = '10px';

                //agregamos los elementos a la card
                cardElement.appendChild(user);
                cardElement.appendChild(comment);

                //agregarmos la card al contenedor
                showCommentsContainer.appendChild(cardElement);
            });
        })
        .catch(error => console.error('Error fetching comments:', error));

    document.body.appendChild(showCommentsContainer);
}

//empezar a llamar a mis funciones
document.body.style.backgroundColor = "#fef4f5";
searchBar();
createPostContainer();