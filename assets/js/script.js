//darkMode
function nightMode(x) {
  x.classList.toggle("fa-moon");
}

//Getting Time Function

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
let currentTime = formatAMPM(new Date());

//CRUD

const showRecentTweet = document.querySelector(".showRecentTweet");
const addTweetForm = document.querySelector(".tweetBox");
const generatedTweet = document.getElementById("tweetValue");
const name = "JustineZz";
const userName = "@JustineZz";
const renderTweet = post => {
  post.forEach(post => {
    showTweet += `

      <div class="recentTweetBody" data-id=${post._id}>
      <p id='userTweet'>
                ${post.tweet}
              </p>
            <div class="userTweet">
              <img
                src="../images/fa0c05778206cb2b2dddf89267b7a31c.jpg"
                alt=""
                srcset=""
              />
              <div class="userName">
                <p>${post.name}</p>
                <i class="fa-solid fa-certificate"></i>
                <span>${post.username}</span>
              </div>
            </div>

            <div class="tweetDisplay">
              
              <div class="dateTime">
                <p>March 12, 2023 - ${post.time}- Manila, Philippines</p>
              </div>
              <div class="tweetDisplayNav">
                <p><i class="fa-solid fa-message"></i><span>Comment</span></p>
                <p><i class="fa-solid fa-retweet"></i><span>Retweet</span></p>
                <p><i class="fa-solid fa-heart"></i><span>Like</span></p>
                
                <button id="editTweet"><i class="fa-solid fa-trash"></i>&nbsp;Edit</button>
              </div>
            </div>
            <button id="deleteTweet"><i class="fa-solid fa-trash"></i>&nbsp;Delete</button>
            <button id="editTweet"><i class="fa-solid fa-trash"></i>&nbsp;Edit</button>
          </div>

      `;
  });
  showRecentTweet.innerHTML = showTweet;
};

const apiUrl =
  "https://crudcrud.com/api/414db4f3af15454c971fa66f7bd367fa/users";
let showTweet = "";

//Get -- Read the tweet
//Method: get
fetch(apiUrl)
  .then(res => res.json())
  .then(data => renderTweet(data));
showRecentTweet.addEventListener("click", e => {
  e.preventDefault();
  let deleteBtnIsPressed = (e.target.id = "deleteTweet");
  let editBtnIsPressed = (e.target.id = "editTweet");

  let tweetID = e.target.parentElement.dataset.id;
  //Delete a tweet
  //Method: DELETE
  if (deleteBtnIsPressed) {
    fetch(
      `
    ${apiUrl}/${tweetID}`,
      {
        method: "DELETE",
      }
    )
      .then(res => res.json())
      .then(() => location.reload());
  }
  if (editBtnIsPressed) {
    const parent = e.target.parentElement;
    let tweetContent = parent.querySelector(".recentTweetBody").textContent;
  }
});
//Create New Tweet
//Method : POST

addTweetForm.addEventListener("submit", e => {
  e.preventDefault();
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify({
      name: name,
      username: userName,
      tweet: generatedTweet.value,
      time: currentTime,
    }),
  })
    .then(res => res.json)
    .then(data => {
      const dataArray = [];
      dataArray.push(data);
      renderTweet(dataArray);
    });
});
