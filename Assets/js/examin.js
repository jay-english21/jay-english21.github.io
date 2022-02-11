function close_window() {
    swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["No, wait", "Yes, Close"],
            dangerMode: true
        })
        .then((off) => {
            if (off) {
                close();
            }
        });
}
var mainApp = {};
(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            sessionStorage.removeItem("stat");
            localStorage.removeItem('mostRecentScore');
            localStorage.removeItem("minutes");
            localStorage.removeItem("seconds");
            if (user.isAnonymous === true) {
                alert("It is a premium feature");
                location.replace("/");
                return;
            } else {
                uid = user.uid;
                fetch(scriptURL + '?q=Indivisual&uid=' + uid)
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        if (loadedData.code === 200) {
                            document.getElementById('startExam').innerText = "Retake ?";
                            document.getElementById('startExam').href = "./exam.html";
                            document.getElementById('solve').style.display = "block";
                            document.getElementById('solve').href = "./solution.html";
                            document.getElementById('startExam').addEventListener('click', () => {
                                sessionStorage.setItem("stat", "OK");
                            })
                        } else {
                            document.getElementById('startExam').innerText = "Start Exam";
                            email = user.email;
                            document.getElementById('startExam').addEventListener('click', () => {
                                swal({
                                        title: "Do you know?",
                                        icon: "info",
                                        text: "If you cheat you are is the only person who is losing...",
                                        button: "Start Exam"
                                    })
                                    .then(() => {
                                        sessionStorage.setItem("stat", "OK");
                                        return location.replace('./exam.html');
                                    });
                            });
                        }
                    })
            }
        } else {
            location.replace("/login");
        }
    });
})()