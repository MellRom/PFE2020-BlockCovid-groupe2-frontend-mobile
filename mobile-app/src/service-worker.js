importScripts("./ngsw-worker.js");



const environnement = [
  "http://localhost:8080",
  "https://blockcovid-groupe2-back.herokuapp.com",
];

self.addEventListener("sync", (event) => {
  if (event.tag === "scan-visit") {
    event.waitUntil(getDataVisitAndSend());
  }

  if (event.tag == "scan-covid") {
    event.waitUntil(getDataCovidAndSend());
  }
});

function addCovid(medecin_id, citizen_id, sick_since) {
  body = {
    //medecin_id: medecin_id,
    citizen_id: citizen_id,
    sick_since: sick_since,
  };
  fetch(environnement[0] + "/citizen/positive_covid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
}

function getDataCovidAndSend() {
  let db;
  const request = indexedDB.open("myDb");
  request.onerror = (event) => {
    console.log("please allow access to IndexedDb");
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    getCovidData(db);
  };
}

function getCovidData(db) {
  const trans = db.transaction(["scan-covid"], "readwrite");
  const objStore = trans.objectStore("scan-covid");
  const request = objStore.get("covid");
  request.onerror = (event) => {
    console.log("error getCovidData");
  };
  request.onsuccess = (event) => {
    console.log("sW" + request.result);
    covid = JSON.parse(request.result);
    addCovid(covid.medecin_id, covid.citizen_id, covid.sick_since);
    console.log("post covid data success after Offline  " + covid.sick_since);
    objStore.delete("covid");
  };
}

function addVisit(place_id, citizen_id, date) {
  body = {
    place_id: place_id,
    citizen_id: citizen_id,
    entrance_date: date,
  };
  fetch(environnement[0] + "/citizen/visit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(() => Promise.resolve())
    .catch(() => Promise.reject());
}

function getDataVisitAndSend() {
  let db;
  const request = indexedDB.open("myDb");
  request.onerror = (event) => {
    console.log("please allow access to IndexedDb");
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    getVisitData(db);
  };
}
function getVisitData(db) {
  const trans = db.transaction(["scan-visit"], "readwrite");
  const objStore = trans.objectStore("scan-visit");
  const request = objStore.getAll();
  request.onerror = (event) => {
    console.log("error getVisitData");
  };
  request.onsuccess = (event) => {
    console.log(request.result);
    request.result.forEach((element) => {
      console.log(element);
      visit = JSON.parse(element);
      // compare Date.now and Date scanned --> if above 10 days no registration
      let dateNow = Date.now();
      let gapTime = dateNow - visit.entrance_date;
      if (Math.floor(gapTime / (24 * 3600 * 1000)) >= 10) {
        console.log("gap registration too big to be considered");
      } else {
        addVisit(visit.place_id, visit.citizen_id, visit.entrance_date);
        console.log(
          "post visit data success after Offline  " + visit.entrance_date
        );
        objStore.delete(visit.place_id + visit.entrance_date);
      }
    });
  };
}
