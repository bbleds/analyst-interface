"use strict";

$.get("data/ch08.txt.xml", function (data) {
  var xml = data,
      contentContainer = document.getElementById("chapter-content");
  // remove <pre> tag whitespace formatting
  contentContainer.innerHTML = contentContainer.textContent.split("      ").join("");
  var spans = data.getElementsByTagName("span");
  var spanSelected = "";

  // ------- Functions
  var changeAnnotation = function changeAnnotation(annotationClass, element) {
    element.setAttribute("class", annotationClass);
    console.log(annotationClass);
  };

  // ------- Main Functionality

  var textInjection = function textInjection(number) {
    var chapterContent = contentContainer.textContent,
        category = spans[number].getAttribute("category"),
        startChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("START")),
        endChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("END")) + 1;
    // build annotation
    var annotationText = spans[number].childNodes[1].childNodes[1].textContent,
        spanToAdd = document.createElement("span"),
        spanText = document.createTextNode(annotationText);
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
    var preAnnotation = contentContainer.innerHTML.slice(0, startChar + 25 * number),
        postAnnotation = chapterContent.slice(endChar, chapterContent.length),
        splitText = contentContainer.innerHTML.split(preAnnotation);
    // Join text back together
    contentContainer.innerHTML = preAnnotation;
    contentContainer.appendChild(spanToAdd);
    contentContainer.innerHTML += postAnnotation;
  };

  for (var i = 0; i < spans.length; i++) {
    textInjection(i);
  }
  // Edit Annotation Category
  // Use ES5 function syntax for "this"
  $("span").click(function (event) {
    var annotationCategory = this.getAttribute("class");
    var annotationText = this.textContent;
    $("#tooltip").css({
      "top": event.offsetY - 155 + "px",
      "left": event.offsetX - 10 + "px",
      "display": "block"
    });
    $("#selectedCategory").html(annotationCategory);
    $("#selectedText").html(annotationText);
    spanSelected = this;
  });
  // change annotation category on a clicked annotation
  // Use ES5 function syntax for "this"
  $("#changeHandler").click(function () {
    var annCategory = $(this).parent().children()[1].innerHTML;
    var newCategory = $(this).parent().children()[3].value.slice(0, 3).toLowerCase();
    changeAnnotation(newCategory, spanSelected);
  });
  // Set tooltip css to display none on "#dismissTooltip" click
  // Use ES5 function syntax for "this"
  $("#dismissTooltip").click(function () {
    $(this).parent().css({
      "display": "none"
    });
  });
  // Delete annotation on "#deleteAnnotation" click
  $("#deleteAnnotation").click(function () {
    var nodeToAdd = document.createTextNode(spanSelected.textContent);
    contentContainer.insertBefore(nodeToAdd, spanSelected);
    contentContainer.removeChild(spanSelected);
    $("#tooltip").css("display", "none");
  });
  // Dynamically Add annotationClass
  $("#addAnnotationButton").click(function (event) {
    event.preventDefault();
    var selection = window.getSelection();
    var start = 0;
    var stop = 0;
    if (selection.anchorNode !== null && selection.anchorNode.childNodes.length < 10 && $("#chapter-content").html().indexOf("" + window.getSelection().toString()) !== -1) {
      var categorySelected = $("#addAnnotationPanel").children()[0].value;
      if (selection.anchorOffset < selection.focusOffset) {
        start = selection.anchorOffset;
        stop = selection.focusOffset;
      } else {
        start = selection.focusOffset;
        stop = selection.anchorOffset;
      }
      var fullText = selection.anchorNode.textContent;
      var textOffset = contentContainer.innerHTML.indexOf("" + fullText);
      var highlightedText = fullText.slice(start, stop);
      var preText = contentContainer.innerHTML.slice(0, textOffset + start);
      var postText = contentContainer.innerHTML.slice(textOffset + stop, contentContainer.innerHTML.length);
      var span = document.createElement("span");
      var spanTextNode = document.createTextNode(highlightedText);
      span.setAttribute("class", categorySelected.slice(0, 3).toLowerCase());
      span.appendChild(spanTextNode);
      contentContainer.innerHTML = preText;
      contentContainer.appendChild(span);
      contentContainer.innerHTML += postText;
      $("span").click(function (event) {
        var annotationCategory = this.getAttribute("class");
        var annotationText = this.textContent;
        $("#tooltip").css({
          "top": event.offsetY - 155 + "px",
          "left": event.offsetX - 10 + "px",
          "display": "block"
        });
        $("#selectedCategory").html(annotationCategory);
        $("#selectedText").html(annotationText);
        spanSelected = this;
      });
    } else {
      console.log("Either nothing is selected, or the selection includes an annotation");
    }
  });
});