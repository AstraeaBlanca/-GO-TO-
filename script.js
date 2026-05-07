const albumImageCover = document.createElement("div");
const lowerB = document.createElement("div");
const searchBar = document.createElement("input");
const confButton = document.createElement("button");

document.body.appendChild(albumImageCover);
document.body.appendChild(lowerB);
lowerB.appendChild(searchBar);
searchBar.placeholder = "Enter Spotify Share Link";
lowerB.appendChild(confButton);
confButton.textContent = "Search";

const myHeaders = new Headers();
let lis = [];

class Song {
    constructor(songID){
        this.songID = songID;
    }
}

class ListenedSong extends Song {
    constructor(songID){
        super(songID);
        this.listened = false;
    }
}

myHeaders.append("Authorization", "Bearer BQBNRMTGD4RmLEGuAU7AwdlCqQ6hXM_7ttAWxdUDbpKkVPO9zd6Ptm0BgfedalNIrwiWx8_MOCZohVXUdL-4e0I25zDM596oTFoUMuSqiiIYKwYkO0sA48GUOirzNhMMPSJ5SNQGUWo");


async function getSongData(songID) {
    const url = "https://api.spotify.com/v1/tracks/" + songID.slice(songID.indexOf("track/") + 5, songID.slice(songID.indexOf("?si=")));

    try {
        const response = await fetch(url, {headers: myHeaders});
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }

}

let exSong = new Song("https://open.spotify.com/track/4VksDJS5zhseecrsTD8uPr?si=f5f66d6f4f7a4694");

getSongData(exSong.songID);

confButton.addEventListener("click", function(){
    let sng = new Song(searchBar.value);
    lis.push(sng);

    let ret = getSongData(sng.songID);
    console.log(ret);

    albumImageCover.innerHTML += ret.images[0].url;

    for (let i = 0; i < lis.length(); i++) {
    let listSong = new ListenedSong(lis[i].songID);
    listSong.listened = true;
}
});

