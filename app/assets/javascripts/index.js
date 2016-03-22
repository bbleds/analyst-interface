"use strict";

$.get("../../data/ch08.txt.xml", function (data) {
  var xml = data;
  var contentContainer = document.getElementById("chapter-content");
  contentContainer.innerHTML = contentContainer.textContent.split("      ").join("");
  var spans = data.getElementsByTagName("span");

  var textInjection = function textInjection(number) {
    number = parseInt(number);
    var chapterContent = contentContainer.textContent;
    var category = spans[number].getAttribute("category");
    var startChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("START"));
    var endChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("END")) + 1;
    var annotationText = spans[number].childNodes[1].childNodes[1].textContent;
    var spanToAdd = document.createElement("span");
    var spanText = document.createTextNode(annotationText);
    spanToAdd.setAttribute("class", "highlighted");
    spanToAdd.appendChild(spanText);
    var splitText = contentContainer.innerHTML.split(chapterContent.substring(startChar, endChar));
    console.log(chapterContent.substring(startChar, endChar));
    console.log(splitText);
    contentContainer.innerHTML = splitText[0];
    contentContainer.appendChild(spanToAdd);
    for (var i = 1; i < splitText.length; i++) {
      contentContainer.innerHTML += splitText[i];
    }
  };

  // for(let i = 0; i < 4; i++){
  //     textInjection(i)
  // }
  textInjection(1);
});