let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.querySelector("#new-toy-btn");
  let toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys();
  createNewToy();
});


function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => renderToys(data))
};

function renderToys(toys) {
  let collection = document.getElementById("toy-collection");
  toys.forEach(toy => {
    let divToy = document.createElement('div');
    divToy.classList.add("card");
    
    //Create h2 with toy name
    let toyName = document.createElement('h2');
    toyName.innerText = toy.name;
    divToy.appendChild(toyName);

    //Create image with toy source
    let toyImg = new Image();
    toyImg.src = toy.image;
    toyImg.classList.add("toy-avatar")
    divToy.appendChild(toyImg);

    //create p with number of toy likes
    let toyLikes = document.createElement('p');
    toyLikes.innerText = toy.likes;
    divToy.appendChild(toyLikes);

    //create button 
    let toyButton = document.createElement('button');
    toyButton.classList.add("like-btn")
    toyButton.setAttribute("id", toy.id)
    toyButton.innerText = "Like!";

    toyButton.addEventListener("click", function() {
      let newNumberOfLikes = parseInt(toyLikes.innerText)
      toyLikes.innerText = newNumberOfLikes + 1;
      return fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": parseInt(toyLikes.innerText)
        })
      }).then(resp => resp.json())
    });

    divToy.appendChild(toyButton);
    collection.appendChild(divToy);
  })
}


function createNewToy() {
  let formSubmit = document.querySelector(".add-toy-form")

  formSubmit.addEventListener("submit", () => {
  
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        name: formSubmit.elements[0].value,
        image: formSubmit.elements[1].value,
        likes: "0",
      }),
    }).then(res => {
      return res.json()
    })
    .then(data => {
      let collection = document.getElementById("toy-collection")
      let divToy = document.createElement("div")

      //Create h2 with toy name
      let toyName = document.createElement('h2');
      toyName.innerText = data.name;
      divToy.appendChild(toyName);

      //Create image with toy source
      let toyImg = new Image();
      toyImg.src = data.image;
      toyImg.classList.add("toy-avatar")
      divToy.appendChild(toyImg);

      //create p with number of toy likes
      let toyLikes = document.createElement('p');
      toyLikes.innerText = data.likes;
      divToy.appendChild(toyLikes);

      //create button 
      let toyButton = document.createElement('button');
      toyButton.classList.add("like-btn")
      toyButton.setAttribute("id", data.id)
      toyButton.innerText = "Like!";

      toyButton.addEventListener("click", function() {
        let newNumberOfLikes = parseInt(toyLikes.innerText)
        toyLikes.innerText = newNumberOfLikes + 1;
        return fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": parseInt(toyLikes.innerText)
          })
        }).then(resp => resp.json())
      });

      // toyButton.addEventListener("click", function() {
      //   let counter = parseInt(toyLikes.innerText);
      //   toyLikes.innerText = counter + 1;
      // })

      divToy.appendChild(toyButton);

      collection.appendChild(divToy);
    })
  });
};
