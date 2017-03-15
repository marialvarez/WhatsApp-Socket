//LOGICA

//Para generar plantillas o prototipos

function Chat(_nombre,_image,_ultimoMensaje, _hora){
    
    this.nombre = _nombre;
    this.imageURL = _image;
    this.ultimoMensaje = _ultimoMensaje;
    this.horaUltimoMensaje = _hora;
    /*this.contiene = function(_buscar){
        this.nombre.search("")
    }*/    
}

var listChats = [
    /*{
        nombre:'Chat 1', 
        imageURL:'image/logocodeacademy.png', 
        ultimoMensaje:'', 
        horaUltimoMensaje:''
    },*/
    new Chat('Laboratoria Perú','image/logocodeacademy.png', 'hellou', '12:30'),
    new Chat('Aldo','image/aldo.jpg', 'hellou', 'ayer'),
    new Chat('Andrea','image/andrea.jpg', 'hellou', '15:24'),
    new Chat('Fabi','image/avatar.jpg','hellou', '10:20')
];

//PARTE VISUAL
var liListItem = null;

function init()
{
    //alert('Ya cargo la pagina!');
    initChatList();
    //searchChat();
}

function initChatList()
{
    var elListChat = document.getElementsByClassName('w-recent-chats')[0];
    
    for(var i in listChats )
    {
        var htmlChatItem = '<li><div class="avatar">'+'<img src="'+listChats[i].imageURL+'" alt="" class="wh-44">'+'<h4 class="w-contact-name">'+listChats[i].nombre+'</h4>'+'<p class="w-last-message" id="mensaje">'+listChats[i].ultimoMensaje+'</p></div>'+'<div class="time" id="hora">'+listChats[i].horaUltimoMensaje+'</div></li>';

        elListChat.innerHTML += htmlChatItem;    
    }
    
    setEventsChatList();
}

function setEventsChatList()
{
    var listChats = document.getElementById('lista-chats');
    var arrListItems = listChats.getElementsByTagName('li');//esta lista no es un array
    //console.log(typeof arrListItems); //Para saber si es un array o un objeto
    
    for(var i=0; i<arrListItems.length; i++)
    {
        //console.log(arrListItems[i]);//Mostrar como itera y si funciona el for
        
        arrListItems[i].addEventListener('click', onChatItemClick);
    }
}

function onChatItemClick(evt)
{
    //console.log(evt.currentTarget);//currentTarget para solamente referirme al 'li', evt.target para referirme al elemento especifico que clikeo
    var contactName = evt.currentTarget.getElementsByClassName('w-contact-name')[0].textContent;
    var imgURL = evt.currentTarget.getElementsByClassName('wh-44')[0].src;
    
    changeChatHeader(contactName,imgURL,'Conectado');
    changeChatMessages(contactName);
    createChat();
}

function onSendMessage(evt)
{   
    var elInputMessage = document.getElementById("mensajes");
    
    if(evt.keyCode == 13){
        //console.log(evt);
        //createChat(elInputMessage.value);
        createMessage(elInputMessage.value);
        elInputMessage.value="";
    }
}

function createMessage(_message)
{   
    var elChat = document.getElementById('chat');
    var date = new Date();
    
    var htmlMessageIn = '<div class="w-message w-message-in">'+'<div class="w-message-text">'+'<h5 class="green-1">Maria Paula Rivarola</h5>'+'<p>Nunca!!! Juan Diego es único</p>'+'<div class="time"></div>'+'</div></div>';
    
    var htmlMessageOut = '<div class="w-message w-message-out">'+'<div class="w-message-text">'+'<p>'+_message+'</p>'+'<div class="time">'+date.getHours()+':'+date.getMinutes()+'</div>'+'</div></div>';
    
    var messageLiChat = liListItem.getElementsByClassName('w-last-message')[0];
    messageLiChat.innerHTML = _message;
    
    elChat.innerHTML += htmlMessageOut; 
    elChat.scrollTop = elChat.scrollHeight;
}

function createChat(_message)
{
    var elListChat = document.getElementsByClassName('w-recent-chats')[0];
    
    if(liListItem == null){
        
        liListItem = document.createElement('li');
    
        var htmlChatItem = '<div class="avatar">'+'<img src="image/logocodeacademy.png" alt="" class="wh-44">'+'<h4 class="w-contact-name">Laboratoria Perú</h4>'+'<p class="w-last-message" id="mensaje">'+_message+'</p></div>'+'<div class="time" id="hora">14:27</div>';

        liListItem.innerHTML = htmlChatItem;
        elListChat.insertBefore(liListItem,elListChat.childNodes[0]);    
    }  
    
    setEventsChatList();
}

function changeChatMessages(contactName)
{
    var divChat = document.getElementById('chat');
    
    for(var i=0; i<listChats.length; i++){
        
        var htmlMessageIn = '<div class="w-message w-message-in">'+'<div class="w-message-text">'+'<h5 class="green-1">'+contactName+'</h5>'+'<p>'+listChats[i].ultimoMensaje+'</p>'+'<div class="time"></div>'+'</div></div>';    
        
        divChat.innerHTML = htmlMessageIn;
    }
}

function changeChatHeader(_contactName, _contactImageURL, _contactStatus)
{
    var chatHeader = document.getElementsByClassName('w-chat-messages')[0];
    chatHeader.getElementsByClassName('w-contact-name')[0].innerHTML= _contactName;
    chatHeader.getElementsByClassName('w-users-messages')[0].innerHTML= _contactStatus;
    chatHeader.getElementsByTagName('img')[0].src = _contactImageURL;
}
/*
function searchChat()
{
    var inputSearch = document.getElementById('search');
    inputSearch.addEventListener('keyup', onSearching);
}

function onSearching(evt)
{      
    var ulLista = document.getElementById('lista-chats');
    console.log(ulLista.children[0].children[0].children[1]);

    for(var i=0; i<ulLista.length; i++ ){
        console.log(ulLista[i].children[0].children[0].children[1]);
        
        if(ulLista[i].children[0].children[0].children[1].toLowerCase().search(evt.target.value.toLowerCase()) == -1){
            ulLista[i].style.display = 'none';
        } else {
            ulLista[i].style.display = 'block';
            console.log("chau");
        }
    }
}*/
//Funcion buscador
var search = document.getElementById("search");
var contacto = document.getElementsByTagName("h4");
var forEach = Array.prototype.forEach;

search.addEventListener("keyup", function(e){
  var choice = this.value;

  forEach.call(contacto, function(f){
      if (f.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1)
          f.parentNode.parentNode.style.display = "none";   
      else
         f.parentNode.parentNode.style.display = "block";        
  });
}, 
false);


/* Prueba de funcion onclick
arrListItems[i].onclick = function () 
        {
            alert("Hola");
        }
*/
/*
arrListItems[i].addEventListener('click', function(){
            alert("click listener");
        })
*/