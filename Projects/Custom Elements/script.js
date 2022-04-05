class Salutation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1> Hello World ...</h1>`;
    this.style.color = "red";
    this.classList.add("hi");
  }
}

customElements.define("salutation-element", Salutation);

class Greet extends HTMLParagraphElement {
  constructor() {
    super();
    this.classList.add("greet");
    this.innerText = this.getAttribute("text");
  }
}
customElements.define("m-greet", Greet, { extends: "p" });

class Card extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="card" style="width: 18rem">
  <img
    class="card-img-top"
    src="${this.getAttribute("img")}"
    alt="Card image cap"
  />
  <div class="card-body">
    <h5 class="card-title">${this.getAttribute("tit")}</h5>
    <p class="card-text">
     ${this.getAttribute("desc")}
    </p>
    <a href="#" class="btn btn-primary">
      ${this.getAttribute("btn")}
    </a>
  </div>
</div>`;
  }
}

customElements.define("m-card", Card);
