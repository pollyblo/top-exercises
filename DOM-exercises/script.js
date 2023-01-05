const container = document.querySelector("#container");

const para1 = document.createElement("p");
para1.textContent = "Hey I'm red!";
para1.style.cssText = "color: red";

container.appendChild(para1);

const h3Title = document.createElement("h3");
h3Title.textContent = "I'm a blue h3!";
h3Title.style.cssText = "color: blue";

container.appendChild(h3Title);

const div = document.createElement("div");
div.style.cssText = "border: solid 1px black; background-color: pink;";

const h1Title = document.createElement("h1");
h1Title.textContent = "I'm in a div";

div.appendChild(h1Title);

const para2 = document.createElement("p");
para2.textContent = "Me too!";

div.appendChild(para2);

container.appendChild(div);


