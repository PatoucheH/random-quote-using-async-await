const container = document.querySelector(".container-quote");
const myBtn = document.getElementById("quote");

const quoteDiv = document.createElement("blockquote");
quoteDiv.classList.add("quote");
const authorDiv = document.createElement("div");
authorDiv.classList.add("author");
container.appendChild(quoteDiv);
container.appendChild(authorDiv);

function display(text, div) {
  div.innerHTML = text;
}

async function quote() {
  try {
    const response = await fetch("https://thatsthespir.it/api");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    display(data.quote, quoteDiv);
    display(data.author, authorDiv);
  } catch (error) {
    console.log(error);
    display(`Error : ${error}`, quoteDiv);
  }
}

window.addEventListener("load", quote);

myBtn.addEventListener("click", quote);
