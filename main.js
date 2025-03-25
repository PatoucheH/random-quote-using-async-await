const container = document.querySelector(".container-quote");
const myBtn = document.getElementById("quote");

const quoteDiv = document.createElement("blockquote");
quoteDiv.classList.add("quote");
const authorDiv = document.createElement("div");
authorDiv.classList.add("author");
container.appendChild(quoteDiv);
container.appendChild(authorDiv);

const ageAuthorDiv = document.createElement("span");
ageAuthorDiv.classList.add("age-author");
container.appendChild(ageAuthorDiv);

function display(text, div) {
  div.textContent = text;
}

async function quote() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  container.style.display = "none";
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    container.style.display = "block";
    const responseQuote = await fetch("https://thatsthespir.it/api");
    if (!responseQuote.ok) {
      throw new Error(`HTTP error! Status: ${responseQuote.status}`);
    }
    const dataQuote = await responseQuote.json();

    loader.style.display = "none";

    display(dataQuote.quote, quoteDiv);
    display(dataQuote.author, authorDiv);
  } catch (error) {
    console.log(error);
    container.style.display = "block";
    loader.style.display = "none";
    display(`Error : ${error}`, quoteDiv);
  }
}

async function ageAuthor() {
  try {
    const nameAuthor = authorDiv.textContent.split(" ");
    const responseName = await fetch(
      "https://api.agify.io/?name=" + nameAuthor[0]
    );
    if (!responseName.ok) {
      throw new Error(`HTTP error ! Status ${responseName.status}`);
    }
    const dataName = await responseName.json();

    display(dataName.age, ageAuthorDiv);
  } catch (e) {
    console.log(e);
    loader.style.display = "none";

    display(e, ageAuthorDiv);
  }
}

window.addEventListener("load", quote);

myBtn.addEventListener("click", quote);
authorDiv.addEventListener("click", ageAuthor);

ageAuthorDiv.addEventListener("click", (e) => {
  ageAuthorDiv.textContent = "";
});
