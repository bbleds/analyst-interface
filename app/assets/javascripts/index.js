"use strict";

$.get("data/ch08.txt.xml", function (data) {
  var xml = data;
  var contentContainer = document.getElementById("chapter-content");
  contentContainer.innerHTML = contentContainer.textContent.split("      ").join("");
  var spans = data.getElementsByTagName("span");

  var textInjection = function textInjection(number) {
    var chapterContent = contentContainer.textContent;
    var category = spans[number].getAttribute("category");
    // write first letter of each in class
    var startChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("START"));
    var endChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("END")) + 1;
    var annotationText = spans[number].childNodes[1].childNodes[1].textContent;
    var spanToAdd = document.createElement("span");
    var spanText = document.createTextNode(annotationText);
    spanToAdd.setAttribute("class", "highlighted");
    spanToAdd.appendChild(spanText);
    var preAnnotation = contentContainer.innerHTML.slice(0, startChar + 33 * number);
    var postAnnotation = chapterContent.slice(endChar, chapterContent.length);
    var splitText = contentContainer.innerHTML.split(preAnnotation);
    contentContainer.innerHTML = preAnnotation;
    contentContainer.appendChild(spanToAdd);
    contentContainer.innerHTML += postAnnotation;
  };

  for (var i = 0; i < spans.length; i++) {
    textInjection(i);
  }
});