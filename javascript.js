//Määritellään muuttujat localstorageen

var TodoList = document.querySelector('#todoList');
var laskuri = document.querySelector("#counterElement");

//Määritellään laskuri laskemaan poista-nappien määrät
let counter = close.length;

document.getElementById("counterElement").innerHTML = (counter + " tehtävää listalla")

function itemCalculator() {
  counter = close.length;
  document.getElementById("counterElement").innerHTML = (counter + " tehtävää listalla")
}

//Listaan lisääminen

function addItem() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  //Ilmoitus virheellisestä syötteestä alertilla, jos käyttäjä syöttää tyhjää tai alle 3 merkkiä

  if (inputValue === '' || inputValue.length < 3) {
    alert('Syöte on liian lyhyt!');

  //Ilmoitus virheellisestä syötteestä punaisilla reunoilla ja ilmoituksella placeholderissa, jos käyttäjä syöttää tyhjää tai alle 3 merkkiä

    document.getElementById('myInput').style.borderColor = "red";
    document.getElementById("myInput").placeholder = "Syötä vähintään kolme merkkiä!";
  } else { //Palauttaa tekstikentän värin ja placeholderin, kun syöte oikein
    document.getElementById('todoList').appendChild(li);
    document.getElementById("myInput").placeholder = "Mitä lisättäisiin...";
    document.getElementById('myInput').style.borderColor = "#ddd";
  }
  
  //Luodaan poista-elementti

  document.getElementById("myInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("Poista");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  itemCalculator();
  save();
  for (var j = 0; j < close.length; j++) {
    close[j].onclick = function () {
      var div = this.parentElement;
      div.parentNode.removeChild(div);
      itemCalculator();
      save();
    }
  }
}

//Merkitse tehdyksi listalla

var check = document.querySelector('ul');
check.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
    save();
  }
}, false);

//Listalta poistaminen, kun painaa poista-nappia

var close = document.getElementsByClassName("close");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.parentNode.removeChild(div);
  }
  itemCalculator();
}

//Koko listan tyhjennys, kun painaa tyhjennä-nappia -> tyhjentää samalla localstoragen

function removeAll() {
  var lista = document.getElementsByTagName("ul");
  lista[0].innerHTML = "";
  localStorage.clear();
  document.getElementById("todoList").innerHTML = " "
  itemCalculator();
}

// Tietojen tallennus localstorageen

function save() {
  window.localStorage.TodoList = check.innerHTML;
  window.localStorage.lask = laskuri.innerHTML;
}

//Tietojen hakeminen localstoragesta

function ret() {
  var info = window.localStorage.TodoList;
  var laskurii = window.localStorage.lask;

//Estää undefined-tekstin ilmestymisen listaan, kun localstorage tyhjä

  if (!info) {
    document.getElementById("todoList").innerHTML = " ";
  } else {
    check.innerHTML = info;
    laskuri.innerHTML = laskurii;
  }
}
ret();

//Lisää toimivuuden poista-nappiin myös sivun päivittämisen jälkeen

var close = document.getElementsByClassName("close");
for (var h = 0; h < close.length; h++) {
  close[h].onclick = function () {
    var div = this.parentElement;
    div.parentNode.removeChild(div);
    itemCalculator();
    save();
  }
}