
window.onload = function(){
    // All Varibales
    var buttonAddText = document.getElementById('send');
    var inputValue = document.getElementById('inputAdd');
    var myList = document.getElementById('list');

    // When click buttonAddText Add text to li
    buttonAddText.addEventListener("click", function(){
        var myNewValue = inputValue.value;
            if(myNewValue === ""){
                alert("Input is empty");
            } else {
            //Here will create li Tag
            var newLi = document.createElement('li');
            var elementNew = myList.appendChild(newLi);
            elementNew.innerText = myNewValue;
            elementNew.innerHTML += "<span onclick='myFunc(this)' class='delete fa fa-trash-o'></span>";
         
            inputValue.value = "";
        }
    });
}

// Remove li from list
function myFunc(elem){
    var li = elem.parentNode;
    li.parentNode.removeChild(li);
}


// // All Varibales
// var buttonAddText = document.getElementById('send');
// var inputValue = document.getElementById('inputAdd');
// var myList = document.getElementById('list');
// var prefab = myList.querySelector('.prefab');

// // When click buttonAddText Add text to li
// buttonAddText.addEventListener("click", function(){
//     var myNewValue = inputValue.value.trim();

//     if(!myNewValue){
//         alert("Input is empty");
//         return;
//     }

//     //Here will create li Tag
//     var newLi = prefab.cloneNode(true);
//     newLi.className = '';
//     newLi.querySelector('.text').innerText = myNewValue;

//     myList.appendChild(newLi);
    
//     inputValue.value = "";
// });

// myList.addEventListener('click', function(e) {
//     if (e.target.tagName.toLowerCase() !== 'span') return;
    
//     myFunc(e.target);
// });

// // Remove li from list
// function myFunc(elem){
//     var li = elem.parentNode;
//     li.parentNode.removeChild(li);
// }