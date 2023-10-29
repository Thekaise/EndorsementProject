// javascript
import{ initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import{ getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-messages-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementDB = ref(database, "endorsementsMessage")



const message = document.getElementById('message')
const publishBtn = document.getElementById('publish-btn')
const allMsg = document.getElementById('all-msg')

publishBtn.addEventListener('click', function(){
    let userMessage = message.value
    
    
    if(userMessage === ""){
        alert("PLEASE FILL THE FIELD")
    }else{
        push(endorsementDB, userMessage)
        clearMessageField()
    }  
})

onValue(endorsementDB, function(snapshot){
    let endorsementArray = Object.values(snapshot.val())
    clearMsg();
    
    for (let i = 0; i < endorsementArray.length; i++){
        createElementToDOM(endorsementArray[i])
    }
})

function createElementToDOM(msg){
    let endorsElement = document.createElement("p")
    endorsElement.classList.add("endorsement")
    endorsElement.textContent = msg
    allMsg.append(endorsElement)
}

function clearMessageField(){
    message.value = ""
}

function clearMsg(){
    allMsg.innerHTML =""
}

