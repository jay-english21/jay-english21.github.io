var mainApp = {};
(function() {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (user.isAnonymous === true) {
                alert("This is a Premium Feature!");
                return location.replace("/");
            } else {
                uid = user.uid;
                fetch('https://script.google.com/macros/s/AKfycbw7GrSmx8mPud_35s2ErOjOwgekOR7aGTNcKtC-2t7prhAUdWoLvP7DyX6vIlSvy4ghug/exec?q=all')
                    .then((res) => {
                        return res.json();
                    })
                    .then((loadedData) => {
                        if (loadedData.code === 200) {
                            document.getElementById('pre').style.display = "none";
                            loadedData.data.forEach((element, idx) => {
                                let classess = `
                              <div class="col-md-4 col-sm-6">
                                        <a href="./classes/Class-${element.ID}.html">
                                            <div class="single-sess">
                                                <img src="${element.Thumbnail}" alt="${element.Description}">
                                                <p class="bangla">
                                                    ${element.Description}
                                                </p>
                                            </div>
                                        </a>
                                </div>
                              `;
                                document.getElementById('cls').innerHTML += classess;
                            });
                        } else {
                            document.getElementById('pre').src = "https://thumbs.dreamstime.com/b/available-soon-rubber-stamp-grunge-design-dust-scratches-effects-can-be-easily-removed-clean-crisp-look-color-easily-82695823.jpg";
                        }
                    })
            }
        } else {
            window.location.replace("/login");
        }
    })
})()