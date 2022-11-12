// Import functions
import {initdb, postDb, deleteDb, editDb} from './database';
import {fetchCards} from './card';
import { toggleForm, clearForm } from './form';

// Import CSS files
import "../css/main.css";

// Import Bootstrap
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import images
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';


window.addEventListener('load', function () {
    initdb()
    fetchCards()
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
})

  // Form functionality
  const form = document.getElementById("formToggle");
  const newContactButton = document.getElementById("new-contact");
  let submitBtnToUpdate = false;
  let profileId;
  
  newContactButton.addEventListener('click', event => {
    toggleForm()
   })
   
   form.addEventListener('submit', (event) => {
     // handle the form data
     event.preventDefault();
     let name = document.getElementById("name").value;
     let phone = document.getElementById("phone").value;
     let email = document.getElementById("email").value;
     let profile = document.querySelector('input[type="radio"]:checked').value;
   
     // Post form data to IndexedDB OR Edit an existing card in IndexedDB
     if (submitBtnToUpdate == false) {
       postDb(name, email, phone, profile);
     } else {
   
       // Obtains values passed into the form element
     let name = document.getElementById("name").value;
     let phone = document.getElementById("phone").value;
     let email = document.getElementById("email").value;
     let profile = document.querySelector('input[type="radio"]:checked').value;
   
      // Calls the editDB function passing in any values from the form element as well as the ID of the contact that we are updating
      editDb(profileId, name, email, phone, profile);
   
      fetchCards();
   
      // Toggles the submit button back to POST functionality
      submitBtnToUpdate = false;
     }
     
     // Clear form
     clearForm();
     // Toggle form
     toggleForm();
     // Reload the DOM
     fetchCards();
   })

   window.deleteCard = (potato) => {
    // grabs id from buttonEl attached to card
    let id = parseInt(potato.id);
    // Delete the card
    deleteDb(id);
    // Reload the DOM
    fetchCards();
    };