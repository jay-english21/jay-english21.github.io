const stat = sessionStorage.getItem("stat");
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
                sessionStorage.removeItem("stat");
                uid = user.uid;
                fetch(scriptURL + '?q=Indivisual&uid=' + uid)
                    .then((res) => {
                        return res.json();
                    }).then((loadedData) => {
                        if (loadedData.code === 200) {
                            const userin = document.getElementById('userin');
                            userin.innerHTML = `
                            <h2 style="text-align: center;">${loadedData.username}</h2>
                            <p>Your Score : ${loadedData.score}<br>Exam Duration : ${loadedData.duration}<br>Timestamp : ${loadedData.timestamp}</p>                         
                            `;
                            var as = window.location.pathname.toString();
                            const ID = as.split('/')[3];
                            fetch('https://script.google.com/macros/s/AKfycbx4d93jIuxmjObg4S11pnp1WBmvUrhLS84sf83N0pzt2ZN6Z55PrqdFnVSvnHRkNyNPAQ/exec?q=exam&ID=' + ID)
                                .then((res) => {
                                    return res.json();
                                })
                                .then((loadedQuestions) => {
                                    if (loadedQuestions.code === 200) {
                                        var exam = JSON.parse(loadedQuestions.Exam);
                                        document.getElementById('s1').innerHTML = `
                                        <h3>Exam Topic : ${loadedQuestions.Title}</h3>
                                        <hr>
                                        `;
                                        exam.forEach((element, idx) => {
                                            idx++
                                            const content = `
                                            <h3>Question ${idx}. ${element.question}</h3>
                                            <p>Option 1 : ${element.choice1}</p>
                                            <p>Option 2 : ${element.choice2}</p>
                                            <p>Option 3 : ${element.choice3}</p>
                                            <p>Option 4 : ${element.choice4}</p>
                                            <h3 style="color:green"><strong>Correct Answer : Option ${element.answer}</strong></h3>
                                            <hr>
                                            `;

                                            document.getElementById('solve').innerHTML += content;
                                        });
                                    } else {
                                        alert(loadedQuestions.code + "  " + loadedQuestions.message);
                                        return close();
                                    }
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        } else {
                            alert("Please Don't try to Cheat 💔");
                            return location.replace("./");
                        }
                    })
            }
        }
    });
})()