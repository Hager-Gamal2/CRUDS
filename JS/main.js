var bookName = document.getElementById('bookName');
var bookPrice = document.getElementById('bookPrice');
var bookCategory = document.getElementById('bookCategory');
var bookDesc = document.getElementById('bookDesc');
var addbtn = document.getElementById('addbtn');
var delbtn = document.getElementById('delbtn');
var updatebtn = document.getElementById('updatebtn');
var search = document.getElementById('search');


var bookList = [];
var currentIndex;
if(localStorage.getItem('bookList') != null){
    bookList = JSON.parse(localStorage.getItem('bookList'));
    display(bookList)
}
addbtn.onclick = function(){
    if(isFormValid()){
    addBook()
    display(bookList)
    clear()
    }else{
//    alert('Please enter valid data');
}
}



//add function
 function addBook(){

     var book = {
        name:bookName.value,
        price:bookPrice.value,
        category:bookCategory.value,
        desc:bookDesc.value,
     }
     bookList.push(book);
     localStorage.setItem('bookList' , JSON.stringify(bookList));
 }

 //dispaly function
function display(){
    var box = ' ';
    for(var i = 0 ; i < bookList.length ; i++){
        box+=`
            <tr>
                <td>${bookList[i].name}</td>
                <td>${bookList[i].price}</td>
                <td>${bookList[i].category}</td>
                <td>${bookList[i].desc}</td>

<td><button class="btn btn-info" onclick="setFormForUpdate(${i})">UpDate</button></td>
<td><button id="delbtn" class="btn btn-danger" onclick="deleteBtn(${i})">Delete</button></td>

            </tr>
        `
    }

    document.getElementById('body').innerHTML = box ;
    addbtn.style.display = 'inline-block';
    updatebtn.style.display = 'none'

}

//clear function
    var inputs = document.getElementsByClassName('form-control');

 function clear(){
    for( var i = 0 ; i < inputs.length ; i++){
        inputs[i].value = '';
        if(inputs[i].classList){
        inputs[i].classList.remove('is-valid');
        inputs[i].classList.remove('is-invalid');
        }if(inputs[i].nextElementSibling){
        inputs[i].nextElementSibling.classList.add('d-none');

        }

    } 

 }

 //delete function 
  function deleteBtn(index){
    bookList.splice(index,1);
    localStorage.setItem('bookList' , JSON.stringify(bookList));

    display()

  }

//search function

search.onkeyup = function (){
    var box =' ';
    for(var i = 0 ; i < bookList.length ; i++){
          if( bookList[i].name.toLowerCase().includes(search.value.toLowerCase()) ){
       box+=`
         <tr>
                <td>${bookList[i].name}</td>
                <td>${bookList[i].price}</td>
                <td>${bookList[i].category}</td>
                <td>${bookList[i].desc}</td>

<td><button class="btn btn-info" onclick="setFormForUpdate(${i})">UpDate</button></td>
<td><button id="delbtn" class="btn btn-danger" onclick="deleteBtn(${i})">Delete</button></td>

            </tr>
       `
       
    }
    }
document.getElementById('body').innerHTML = box ;
}


//update function
function setFormForUpdate(bookIndex){
bookName.value = bookList[bookIndex].name;
bookPrice.value = bookList[bookIndex].price;
bookCategory.value = bookList[bookIndex].category;
bookDesc.value = bookList[bookIndex].desc;
currentIndex = bookIndex;
addbtn.style.display = 'none';
updatebtn.style.display = 'inline-block';
}
updatebtn.onclick = function(){
    upDate();

} 
function upDate(){
    bookList[currentIndex].name = bookName.value;
    bookList[currentIndex].price = bookPrice.value;
    bookList[currentIndex].category = bookCategory.value;
    bookList[currentIndex].desc = bookDesc.value;

    localStorage.setItem('bookList',JSON.stringify(bookList));
    
    display();
    clear();
    addbtn.style.display = 'inline-block';
    updatebtn.style.display = 'none'
}



function validationForm(element){
    var regex ={
        bookName:/^[A-Za-z\s]{4,25}$/,
        bookPrice:/^[1-9][0-9]{2,6}$/,
        bookCategory:/^(quran|math|arabic|english|biology|history)$/i,
        bookDesc:/^.{4,200}$/
    };
    if(regex[element.id].test(element.value)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');
        return true;
    }else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');
        return false;

    }
}

function isFormValid() {
    var nameValid = validationForm(bookName);
    var priceValid = validationForm(bookPrice);
    var categoryValid = validationForm(bookCategory);
    var descValid = validationForm(bookDesc);

    return nameValid && priceValid && categoryValid && descValid;
}

