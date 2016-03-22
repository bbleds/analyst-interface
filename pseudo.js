"use strict";

// Immediately Injecting annotations into page
  // get xml document
    // parseXML
    // for each <span> element in collection
      //declare constant and store 'category' attribute
      //get the charseq child node
        // on child node, get start and end attribute values
        // split ch8 text into an array taking out the substring that starts at the start character attribute value and ends at the end character attribute value
        // join the ch8 text back together with a new <span> with a .highlighted class and a 'category' attribute equal to stored category in constant

// Deleting annotations from the page
  // when <span>.highlighted is clicked, display tooltip popup
    // when delete button is clicked inside tooltip
      // declare constant and store inner text of <span>.highlighted
      // split ch8 text into an array at clicked <span>.highlighted element
      // remove <span>.highlighted
      // join ch8 text back together with text in the constant

// Editing/viewing annotations on the page
  // when <span>.highlighted is clicked, display tooltip popup
  // display value of 'category' attribute (PERSON, LOCATION, ORGANIZATION) in an <h1> element
  // display <select> with three <option> elements with values (PERSON, LOCATION, ORGANIZATION)
  // when 'change' button is clicked
    // change 'category' attribute of clicked <span> element to selected <option> element in <select> element
    // change <h1> inner text to selected category

// Dynamically adding annotations to the page
  // given that user has entered text for an annotation into input field on 'add annotations' panel
  // when 'add' button is clicked, find all text instances of input field's value not inside a <span> element
    // if none are found display 'not found' error message
    // if only 1 is found
      // declare constant and store the text that was found
      // split ch8 text into an array at the text found
      // join ch8 text back together with <span>.highlighted element having cached text and a 'category' attribute equal to attribute selected on 'add annotations' panel
    // if more than 1 is found
      // declare constant and store the text that was found
      // split ch8 text into an array at the text found
      // join ch8 text back together with <span> element having cached text as child node with #option-number id and .option class
        // (where 'number' is the number of the instance. e.g., the first instance of the text that was found would have an #option-1 id, etc)
      //Populate second <select> element in 'add annotations' panel with <option> elements corresponding to each #option-number id
      //when an <option> is selected in <select> element
        // add .selected-option class to corresponding <span> element with #option-number id
          // (this will be styled differently that the other .option class)
      //when 'confirm' button is clicked in 'add annotations' panel
        // split ch8 text into an array at <span> element with .selected-option class
        // join ch8 text back together with <span> element having cached text as child node and .highlighted class
        // split ch8 text into an array at <span> element with .option class
        // join ch8 text back together with cached text in constant
        // clear out inputs on 'add annotations' panel

// Outputting json data
  // when 'save' button is clicked
    // declare constant 'annotationData' and store empty array
    // get each <span>.highlighted element
    // convert collection to array
    // for each item in array
      // declare constant 'annotationItem' and store empty object
      // set property on 'annotationItem' object with value of inner text of item
      // set property on 'annotationItem' object with value of 'category' attribute of item
      // push 'annotationItem' object into 'annotationData' array
