// -------------------- Get Element -------------------- //
var bookNameInput = document.getElementById('bookNameInput');
var bookUrlInput = document.getElementById('bookUrlInput');
var btnBook = document.getElementById('btnBook');
var textMsg = document.getElementById('textMsg');
var btnVisit = document.getElementsByTagName('a');
var arrayBooks = [];
var currentIndex = 0;
var check =[...document.querySelectorAll('.check')]

//  To Get Data
if (localStorage.getItem('listBooks') != null) {
    arrayBooks = JSON.parse(localStorage.getItem('listBooks'))
    displayBooks();
}


//  To Reset Form
btnBook.onclick = function () {
    if (btnBook.innerHTML == 'submit') {
        addBook();
    } else {
        updateBooks();
        btnBook.innerHTML = 'submit'
    }
    displayBooks();
    reset();
    clearClass();
}
function reset() {
    bookNameInput.value = "";
    bookUrlInput.value = "";
}
function clearClass() {
    bookNameInput.classList.remove('is-valid'); 
    bookUrlInput.classList.remove('is-valid'); 
    btnBook.disabled=true
}



function addBook() {
    var book = {
        name: bookNameInput.value,
        url: bookUrlInput.value,
    }
    arrayBooks.push(book);
    localStorage.setItem('listBooks', JSON.stringify(arrayBooks));
}


// To Display Data
function displayBooks() {
    var carton = "";
    for (var i = 0; i < arrayBooks.length; i++) {
        carton += `
        <tr>
        <td> ${i}</td>
        <td>${arrayBooks[i].name}</td>
        <td>  <a  target="_blank" id="btnVisit" onclick="getVisit(${i})" class="btn btn-sm btn-success ">visit</a> </td>
        <td><button onclick="getBookInfo(${i})"  class="btn btn-sm btn-warning">update</button> </td>
        <td><button onclick="deleteBook(${i})" class="btn btn-sm btn-danger">delete</button> </td>
      </tr>
       `
    }
    document.getElementById('tableBody').innerHTML = carton;
}

//Delete Books
function deleteBook(index) {
    arrayBooks.splice(index, 1);
    localStorage.setItem('listBooks', JSON.stringify(arrayBooks));
    displayBooks();
}

function getVisit(index) {
    var currentVisit = (arrayBooks[index].url);
    console.log(btnVisit[index])
    btnVisit[index].setAttribute('href', currentVisit)
}

//
function getBookInfo(index) {
    currentIndex = index;
    var currentBook = arrayBooks[index];
    bookNameInput.value = currentBook.name;
    bookUrlInput.value = currentBook.url;
    btnBook.innerHTML = "Update Book"
}

//updateBooks
function updateBooks() {
    var book = {
        name: bookNameInput.value,
        url: bookUrlInput.value,
    }
    arrayBooks[currentIndex] = book;
    localStorage.setItem('listBooks', JSON.stringify(arrayBooks));
}

//  To Search Data
function search(searchText) {
    var carton = "";
    for (var i = 0; i < arrayBooks.length; i++) {
        if (arrayBooks[i].name.toUpperCase().includes(searchText.toUpperCase())) {

            carton += `
        <tr>
        <td> ${i}</td>
        <td>${arrayBooks[i].name}</td>
        <td>  <a id=""  href="" class="btn btn-sm btn-success">visit</a> </td>
        <td><button class="btn btn-sm btn-warning">update</button> </td>
        <td><button onclick="deleteBook()" class="btn btn-sm btn-danger">delete</button> </td>
      </tr>
       `
        }
    }
    document.getElementById('tableBody').innerHTML = carton;
}
bookNameInput.addEventListener('keyup' , validName  )


//Site Name *
function  validName() {
    var nameRejex = /^[a-zA-Z]{2,10}( )?([a-zA-Z]{1,10})?$/;
    if (nameRejex.test(bookNameInput.value)) {
        bookNameInput.classList.remove('is-invalid');
        bookNameInput.classList.add('is-valid');
        textMsg.classList.add('d-none');
        return true;
    } else {        
        bookNameInput.classList.add('is-invalid');
        textMsg.classList.remove('d-none');
    }
}


//Site URL
bookUrlInput.addEventListener('keyup' , validUrl  )

 function validUrl () {
    var nameRejex = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)$/ ;
    if (nameRejex.test(bookUrlInput.value)) {
        bookUrlInput.classList.remove('is-invalid');
        bookUrlInput.classList.add('is-valid');
        return true;
    } else {
        bookUrlInput.classList.add('is-invalid');
        bookUrlInput.classList.remove('d-none');
    }
}

//Submit 
for(var i=0 ; i< check.length ; i++)
{
    check[i].addEventListener('keyup' , ()=>
    {
        if(validUrl() &&validUrl())
        {
            btnBook.removeAttribute('disabled')            
        }else{
            btnBook.disabled=true
        }
    })
}


