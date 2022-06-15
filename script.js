'use strict';

let wrapper = document.querySelector('#wrapper');

let posts = [];

//Post. Storing post and user data and render post's card
class Post {

    view;

    render() {
        this.view = document.createElement('div');
        this.view.classList.add('card', 'm-2');
        this.view.style.width ='30%';
        this.view.innerHTML = `
            <div class="card-content">
                <div class="media">
                <div class="media-left">
                </div>
                <div class="media-content">
                    <p class="title is-4">${this.data.user.name}</p>
                    <p class="subtitle is-6">${this.data.user.email}</p>
                </div>
                </div>

                <div class="content">${this.data.post.body}</div>
            </div>
        `;
    }

    constructor(data) {
        this.data = data;
        this.render();
    }
}

// Get data from remote service
async function getData(method) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${method}`);
    return await response.json();
};

//Parsing array of getted posts and create array of posts by class Post
function parsingPosts(postsData, users) {
    let posts = [];
        for(let postData of postsData) {
            let user = users.filter(user => user.id == postData.userId)[0];
            posts.push(new Post({'post': postData, 'user': user}));
        }
    return posts;
}

//Render posts in the main wrapper
function renderPosts(posts, wrapper) {
    for(let post of posts) {
        wrapper.appendChild(post.view);
    }    
}

getData('posts')
    .then((posts) => {
        if(localStorage.getItem('users')) {                             //check data in the local storage and load this from one if present
            let users = JSON.parse(localStorage.getItem('users'));
            renderPosts(parsingPosts(posts, users), wrapper);
        } else {
            getData('users')                                            //get data from remote server and save to local storage if not present
            .then((users) => {
                localStorage.setItem('users', JSON.stringify(users));
                renderPosts(parsingPosts(posts, users), wrapper);
            });
        };
    });

