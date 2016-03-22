"use strict";

$.get("data/ch08.txt.xml", function (data) {
  var xml = data;
  var contentContainer = document.getElementById("chapter-content");
  contentContainer.innerHTML = contentContainer.textContent.split("      ").join("");
  var spans = data.getElementsByTagName("span");

  var textInjection = function textInjection(number) {
    var chapterContent = contentContainer.textContent;
    var category = spans[number].getAttribute("category");
    var startChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("START"));
    var endChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("END")) + 1;
    // build annotation
    var annotationText = spans[number].childNodes[1].childNodes[1].textContent;
    var spanToAdd = document.createElement("span");
    var spanText = document.createTextNode(annotationText);
    if (category === "PERSON") {
      spanToAdd.setAttribute("class", "per");
    }
    if (category === "ORGANIZATION") {
      spanToAdd.setAttribute("class", "org");
    }
    if (category === "LOCATION") {
      spanToAdd.setAttribute("class", "loc");
    }
    spanToAdd.appendChild(spanText);
    // split chapter content html into an array with two items
    var preAnnotation = contentContainer.innerHTML.slice(0, startChar + 25 * number);
    var postAnnotation = chapterContent.slice(endChar, chapterContent.length);
    var splitText = contentContainer.innerHTML.split(preAnnotation);
    // Join text back together
    contentContainer.innerHTML = preAnnotation;
    contentContainer.appendChild(spanToAdd);
    contentContainer.innerHTML += postAnnotation;
  };

  for (var i = 0; i < spans.length; i++) {
    textInjection(i);
  }
});