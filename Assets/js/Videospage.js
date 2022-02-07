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
                var as = window.location.pathname.toString();
                const ID = as.split('/')[2];
                fetch('https://script.google.com/macros/s/AKfycbyuZH1xi2vEqH7ZJ2RdCW3slwVRiEzyZOtAXG5WMwqzgGGVnV1ATkJW5ZvZv0BPnlRK9w/exec?q=class&ID=' + ID)
                    .then((res) => {
                        return res.json()
                    })
                    .then((loadedData) => {
                        if (loadedData.code === 200) {
                            var data = loadedData.data;
                            $('.fb-comments').attr("data-href", document.location.origin + document.location.pathname);
                            document.getElementById('Chapter').innerText = data.Chapter;
                            const strt = "https://www.youtube.com/embed/";
                            const ext = "?modestbranding=1&loop=0&controls=1&autoplay=1&mute=0&rel=0&color=red&vq=hd1080";
                            $('.embed-responsive-item').attr("src", strt + data.Video_Id + ext);
                            document.getElementById('Chapter').innerHTML = data.Video_Description;
                            document.getElementById('Video_Description').innerText = data.Video_Description;
                            if (data.lecture == "") {
                                document.getElementById('lc').style.display = 'none';
                            } else {
                                document.getElementById('previewP').setAttribute("src", "https://drive.google.com/file/d/" + data.lecture + "/preview");
                                document.getElementById('down').setAttribute('onclick', "window.open('https://drive.google.com/u/0/uc?id=" + loadedData.lecture + "&export=download')");
                            }
                        } else {
                            window.alert(loadedData.message);
                            window.location.replace('/login');
                        }
                    })
            }
        } else {
            window.location.replace('/login');
        }
    });
})()