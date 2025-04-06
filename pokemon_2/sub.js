
const item = JSON.parse(window.localStorage.getItem("pr_item"));
const main = document.querySelector("main");
const imgWrapper = document.createElement("div");

imgWrapper.classList.add("img-wrapper");
const img = document.createElement("img");
img.src = `images/${item.name}.png`;
img.alt = item.name;

imgWrapper.appendChild(img);
main.appendChild(imgWrapper);

//정보 표로 넣기
const table = document.createElement("table");
table.classList.add("infoTable");

const tbody = document.createElement("tbody");

const info_Data = [
    ["Name", item.name],
    ["Height", item.height],
    ["Weight", item.weight],
    ["Types", item.types.join(", ")],
    ["Base Experience", item["base-Experience"]],
    ["Abilities", item.abilities.join(", ")],
    ["HP", item.hp],
    ["Attack", item.attack],
    ["Defense", item.defense],
    ["Special Attack", item["special-attack"]],
    ["Speed", item.speed]
];


info_Data.forEach(([feature, detail]) => {
    const tr = document.createElement("tr");
  
    const pokemon_feature = document.createElement("td");
    pokemon_feature.innerText = feature;
  
    const pokemon_detail = document.createElement("td");
    pokemon_detail.innerText = detail;
  
    tr.append(pokemon_feature, pokemon_detail);
    tbody.appendChild(tr);
  });
  
  table.appendChild(tbody);

  main.appendChild(table);