import firebase from "firebase";
import '../config/fbsend.js'
import '../config/fbauth.js'



// const songURL = "You Know master 8.22.17.mp3"

const storage = firebase.storage();
const storageRef = storage.ref();

const jsonURL = "http://localhost:8088"

 class APICalls {

  getFromJsonForUser(dataType, id) {
    return fetch(`${jsonURL}/${dataType}?userId=${id}`)
      .then(data => data.json())
  }

  getAllFromJson(dataType) {
    return fetch(`${jsonURL}/${dataType}`)
    .then(data => data.json())
  }

  getOneFromJson(dataType, id) {
    return fetch(`${jsonURL}/${dataType}/${id}`)
    .then(data => data.json())
  }

  getSingleSong(songURL) {
  return storage.ref(songURL).getDownloadURL()
  }

  getAllSongs () {
    return storageRef.getDownloadURL()
  }
}

export default new APICalls()