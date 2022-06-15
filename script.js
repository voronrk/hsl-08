'use strict';

let wrapper = document.querySelector('#wrapper');

let tempCard;

class Card {

    view;

    render() {
        this.view = document.createElement('div');
        this.view.innerHTML = `
        <div class="card" style = "max-width:30%">
            <div class="card-content">
                <div class="media">
                <div class="media-left">
                </div>
                <div class="media-content">
                    <p class="title is-4">John Smith</p>
                    <p class="subtitle is-6">@johnsmith</p>
                </div>
                </div>

                <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
            </div>
        `;
    }

    constructor(data) {
        this.data = data;
        this.render();
        console.log(this.view);
    }
}

async function getData(method) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${method}`);
    return await response.json();
};

getData('posts')
    .then((data) => {
        console.log(data);
    });

// tempCard = new Card();
// console.log(tempCard);
// wrapper.append(tempCard.view);

