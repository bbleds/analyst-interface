"use strict";
$.get("data/ch08.txt.xml", (data) => {
  const xml = data,
  contentContainer = document.getElementById("chapter-content");
  // remove <pre> tag whitespace formatting
  contentContainer.innerHTML =  contentContainer.textContent.split("      ").join("");
  const spans = data.getElementsByTagName("span");

    const textInjection = (number) => {
      const chapterContent = contentContainer.textContent,
            category = spans[number].getAttribute("category"),
            startChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("START")),
            endChar = parseInt(spans[number].childNodes[1].childNodes[1].getAttribute("END"))+1;
      // build annotation
      const annotationText = spans[number].childNodes[1].childNodes[1].textContent,
            spanToAdd = document.createElement("span"),
            spanText = document.createTextNode(annotationText);
      if(category==="PERSON"){
        spanToAdd.setAttribute("class","per");
      }
      if(category==="ORGANIZATION"){
        spanToAdd.setAttribute("class","org");
      }
      if(category==="LOCATION"){
        spanToAdd.setAttribute("class","loc");
      }
      spanToAdd.appendChild(spanText);
      // split chapter content html into an array with two items
      const preAnnotation = contentContainer.innerHTML.slice(0,startChar+(25*number)),
            postAnnotation = chapterContent.slice(endChar,chapterContent.length),
            splitText = contentContainer.innerHTML.split(preAnnotation);
      // Join text back together
      contentContainer.innerHTML = preAnnotation;
      contentContainer.appendChild(spanToAdd);
      contentContainer.innerHTML+= postAnnotation;
    }

    for(let i = 0; i < spans.length; i++){
        textInjection(i)
    }
});
