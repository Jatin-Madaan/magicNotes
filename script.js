console.log('welcome');
//if user adds a heading add it to the local storage
let noteHeading = document.getElementById('noteHeading')
noteHeading.addEventListener('click', function(){
    let html = noteHeading.innerHTML;
    noteHeading.innerHTML = `<textarea class = "textarea" id = "textarea" row = "3">${html}</textarea>`;

    let txtarea = document.querySelector('.textarea');
    txtarea.addEventListener('blur', function(){
        let data = txtarea.value;
        noteHeading.innerHTML = data;
        let heading = localStorage.getItem('heading');
        if(heading == null){
            headingObj = [];
        }
        else{
            headingObj = JSON.parse(heading);
        }

        headingObj.push(data);
        localStorage.setItem('heading', JSON.stringify(headingObj));

    });
});
//if user adds a note,  add it to the local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    if(addTxt.value.length != 0){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    noteHeading.innerHTML = "Add a note";
    console.log(notesObj);
    }
    showNotes();
});

//function to show data from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    let heading = localStorage.getItem('heading');
    if (notes == null) {
        notesObj = [];
        notesHead = [];
    }
    else {
        notesObj = JSON.parse(notes);
        notesHead = JSON.parse(heading);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="noteCard my-2 mx-2" style="width: 18rem; border: 2px solid aqua">
        <div class="card-body">
          <h5 class="card-title" id = "noteHead${index + 1}">${notesHead[index]}</h5>
          <p class="card-text"> ${element}
          </p>
          <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
    });
    notesHead.forEach((element, index) =>{

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show!!!!!`;
    }

    
}

//function to delete a note
function deleteNote(index) {
    console.log('I am deleting', index);
    let notes = localStorage.getItem('notes');
    let heading = localStorage.getItem('heading');
    if (notes == null) {
        notesObj = [];
        headObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        headObj = JSON.parse(heading);
    }
    notesObj.splice(index, 1);//splice func takes 1st arg as starting index and 2nd arg as no of items to remove
    headObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('heading', JSON.stringify(headObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input',() => {
    let inputVal = search.value.toLowerCase();
    //console.log('input event fired', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach((element) => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});
showNotes();
