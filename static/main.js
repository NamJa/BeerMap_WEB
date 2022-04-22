let infotab = document.querySelector(".showInfoButton");
let registertab = document.querySelector(".showRegisterButton");
let infoFrame = document.querySelector(".pubTitleAddressMenu");
let registerFrame = document.querySelector(".pubRegister");

let pubTitle = document.querySelector('.titleRegister');
let pubAddress = document.querySelector('.addressRegister');
let pubMenu = document.querySelector('.menuRegister');
let submitBtn = document.querySelector(".submitButton");
let pubNumCnt = 0;


// submit 버튼 클릭시 동작하는 함수
async function onClickSubmitButton() {
    let title = pubTitle.value;
    let address = pubAddress.value;
    let menu = pubMenu.value;
    let latlng = await testGeoGeo(address)
    let lat = latlng[0]
    let lng = latlng[1]
    // firebase Realtime Database에 데이터 등록
    database.ref('pubs/pubNo' + String(pubNumCnt)).set({ name: title, address: address, menu: menu, Lat: lat, Lng: lng}, function(error) {
        if (error)
            console.error(error)
        else {
            console.log("success save !!");
            pubNumCnt += 1;
        }
    });
    pubTitle.value = "";
    pubAddress.value = "";
    pubMenu.value = "";
    getFirebaseData();
}


function getFirebaseData() {
    const dbRef = firebase.database().ref();
    dbRef.child("pubs").get().then((snapshot) => {
        if (snapshot.exists()) {
            let pubs = snapshot.val(); // firebase상에 저장된 pubNo'X' 데이터들
            // pubs는 object이므로 key값으로 접근한다.
            // pubs['pubNo0'].address, pubs['pubNo0'].name, pubs['pubNo0'].menu

            pubNumCnt = Object.keys(pubs).length; // 데이터 갯수

            Object.keys(pubs).forEach(function(v) {
                setGeoCodeAddress(pubs[v].address, pubs[v]);
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

const firebaseConfig = {
    apiKey: "AIzaSyAq6jo_BdKdK-OWww7YZcMQO6JGvOrkUcc",
    authDomain: "beermap-712bf.firebaseapp.com",
    databaseURL: "https://beermap-712bf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "beermap-712bf",
    storageBucket: "beermap-712bf.appspot.com",
    messagingSenderId: "1020821227910",
    appId: "1:1020821227910:web:80eb02448c5c8f4d4c0407",
    measurementId: "G-HQ99HZQPY9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();


// 정보 탭 클릭
infotab.onclick = function() {
    infoFrame.style.display = "block";
    registerFrame.style.display = "none";
};
// 등록 탭 클릭
registertab.onclick = function() {
    infoFrame.style.display = "none";
    registerFrame.style.display = "block";
};

// 최초 페이지 로딩시 마커를 찍기 위한 호출
getFirebaseData();