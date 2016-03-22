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
    // write first letter of each in class
    var startChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("START"));
    var endChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("END")) + 1;
    var annotationText = spans[number].childNodes[1].childNodes[1].textContent;
    var spanToAdd = document.createElement("span");
    var spanText = document.createTextNode(annotationText);
    spanToAdd.setAttribute("class", "highlighted");
    spanToAdd.setAttribute("cat", "" + category[0]);
    spanToAdd.appendChild(spanText);
    var preAnnotation = contentContainer.innerHTML.slice(0, startChar + 41 * number);
    var postAnnotation = chapterContent.slice(endChar, chapterContent.length);
    var splitText = contentContainer.innerHTML.split(preAnnotation);
    contentContainer.innerHTML = preAnnotation;
    contentContainer.appendChild(spanToAdd);
    contentContainer.innerHTML += postAnnotation;
  };

  for (var i = 0; i < spans.length; i++) {
    textInjection(i);
  }
  for (var _i = 0; _i < $(".highlighted").length; _i++) {
    var position = $($(".highlighted")[_i]).position();
    var annotationType = $(".highlighted")[_i].getAttribute("cat");
    console.log(annotationType);
    var divToAdd = document.createElement("div");
    divToAdd.style.height = "15px";
    divToAdd.style.width = "50px";
    divToAdd.style.position = "absolute";
    divToAdd.style.top = position.top - 14 + "px";
    divToAdd.style.left = position.left + "px";
    if (annotationType === "P") {
      divToAdd.appendChild(document.createTextNode("PERSON"));
    }
    if (annotationType === "L") {
      divToAdd.appendChild(document.createTextNode("LOCATION"));
    }
    if (annotationType === "O") {
      divToAdd.appendChild(document.createTextNode("ORGANIZATION"));
    }
    document.getElementsByTagName("body")[0].appendChild(divToAdd);
  }
});