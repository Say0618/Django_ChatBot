var results = [];
var type = "";
var global_next = -1;
var database_ans = "";
var up_video = false;
var up_img = false;
var up_txt = false;
var up_pt = false;
var up_mt = false;
var start_time = "";
var checkBox_click = false;
var index = 0;

var y = '';
var n = '';
let vidArray = []; //multiple media response
let vidArrayP = []; //multiple picture response
let vidArrayT = []; //multiple text response
let vidArrayPT = []; //Q.picture multiple response
let vidArrayMT = []; //Q.media multiple response

let global_order = "";
let dob = 0;
// let end = false;
var MTR_GROUP = [];

// openForm();
function setCurTime() {
    var today = new Date();
    var hour = parseInt(today.getHours());
    var min = parseInt(today.getMinutes());
    if (hour < 10) {
        hour = "0" + hour;
    }

    if (min < 10) {
        min = "0" + min;
    }

    // var cur_time =  "Today " + hour + ":" + min + suffix;
    var cur_time = "Today " + hour + ":" + min;
    $('.bot-time').children().text(cur_time);
}

function getCurDateTime() {
    var today = new Date();

    var year = today.getFullYear();
    var month = parseInt(today.getMonth()) + 1;
    if (month < 10)
        month = "0" + month;
    var date = today.getDate();
    if (date < 10)
        date = "0" + date;

    var hour = parseInt(today.getHours());
    var min = parseInt(today.getMinutes());
    var second = parseInt(today.getSeconds());

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10)
        min = "0" + min;
    if (second < 10)
        second = "0" + second
        // var curDateTime = month + "-" + date + "." + year + ", "  + hour + "." + min;
    var curDateTime = date + "/" + month + "/" + year + " " + hour + ":" + min + ":" + second;
    return curDateTime;
}

//video scroll view
const scrollContainerVid = document.getElementById("optionsVid");
if (scrollContainerVid != null) {
    scrollContainerVid.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainerVid.scrollLeft += evt.deltaY;
    });
}
//image scrollv view
const scrollContainer = document.getElementById("options");
if (scrollContainer != null) {
    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    });
}
//when press start chat button
function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("chatStart").style.display = "none";
    document.getElementById("viewOption").style.display = "none";

    if (document.getElementById('typing').style.display == 'none') {
        if (document.getElementById('options').style.display == 'none') {
            document.getElementById('typingHidden').style.display = 'block';
        }
    }

    var botChat = document.getElementById("botChat").innerHTML;
    if (botChat === "") {
        document.getElementById('typingHidden').style.display = 'none';
        document.getElementById("userAnswer").disabled = true;


        // get_Next_Question(7);
        // get_Next_Question(103);
        get_First_Question();
    }

}
// openForm()
//user input message
var input = document.getElementById("userAnswer");
//when click send button
function send() {
    var userAnswer = document.getElementById("userAnswer").value;

    if (database_ans != "") {
        document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${database_ans}</p></div>`;
        document.getElementById("userAnswer").disabled = false;
        document.getElementById('options').style.display = 'none';

        $('#typing').show();
        database_ans = "";
        get_Next_Question(global_next);
    }

    if (up_video) {
        if (vidArray.length == 0) {
            return;
        }
        //part for youtube stop
        document.getElementById("optionsVid").innerHTML = '';
        //hide viewoption
        document.getElementById("viewOption").style.display = "none";
        //add videos to botchat when press submit button
        if (vidArray.length > 0) {
            for (var i = 0; i < vidArray.length; i++) {
                document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}'>${vidArray[i]}</p></div>`;
                scrollToBottom();
            }
            $('#typing').show();
            get_Next_Question(global_next);
        }

        document.getElementById('optionsVid').style.display = 'none';
        up_video = false;
        vidArray = [];
    }

    if (up_img) {
        if (vidArrayP.length == 0) {
            return;
        }
        //hide viewoption
        document.getElementById("viewOption").style.display = "none";
        //add videos to botchat when press submit button
        if (vidArrayP.length > 0) {
            for (var i = 0; i < vidArrayP.length; i++) {
                document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}'>${vidArrayP[i]}</p></div>`;
                scrollToBottom();
            }
            $('#typing').show();
            get_Next_Question(global_next);
            // is_start = true;
        }

        document.getElementById('optionsVid').style.display = 'none';
        up_img = false;
        vidArrayP = [];
    }

    if (up_pt) {
        if (vidArrayPT.length == 0) {
            return;
        }
        //hide viewoption
        document.getElementById("viewOption").style.display = "none";
        document.getElementById("options").style.display = 'none';
        //add videos to botchat when press submit button
        if (vidArrayPT.length > 0) {
            global_next = MTR_GROUP[0];
            MTR_GROUP.splice(0, 1);

            for (var i = 0; i < vidArrayPT.length; i++) {
                document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${vidArrayPT[i]}</p></div>`;
                scrollToBottom();
            }
            $('#typing').show();
            get_Next_Question(global_next);
            // is_start = true;
        }

        document.getElementById('optionsVid').style.display = 'none';
        up_pt = false;
        vidArrayPT = [];
    }

    if (up_txt) {
        if (vidArrayT.length == 0) {
            return;
        }
        //hide viewoption
        document.getElementById("viewOption").style.display = "none";
        document.getElementById("options").style.display = 'none';
        //add videos to botchat when press submit button
        if (vidArrayT.length > 0) {
            global_next = MTR_GROUP[0];
            MTR_GROUP.splice(0, 1);

            for (var i = 0; i < vidArrayT.length; i++) {
                document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${vidArrayT[i]}</p></div>`;
                scrollToBottom();
            }
            console.log(global_next)
            get_Next_Question(global_next);
            $('#typing').show();
        }

        document.getElementById('optionsVid').style.display = 'none';
        up_txt = false;
        vidArrayT = [];
    }

    if (up_mt) {
        if (vidArrayMT.length == 0) {
            return;
        }
        //hide viewoption
        document.getElementById("viewOption").style.display = "none";
        document.getElementById("options").style.display = 'none';
        //add videos to botchat when press submit button
        if (vidArrayMT.length > 0) {
            global_next = MTR_GROUP[0];
            MTR_GROUP.splice(0, 1);

            for (var i = 0; i < vidArrayMT.length; i++) {
                document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${vidArrayMT[i]}</p></div>`;
                scrollToBottom();
            }
            get_Next_Question(global_next);
            $('#typing').show();
        }

        document.getElementById('optionsVid').style.display = 'none';
        up_mt = false;
        vidArrayMT = [];
    }
    //for open response
    if (userAnswer != '') {
        if (dob == 1) {
            var date_regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            if (!(date_regex.test(userAnswer))) {
                alert("type correct date format!");
                return;
            }
        }
        document.getElementById('botChat').style.maxHeight = '265px';
        document.getElementById('botChat').style.minHeight = '265px';
        document.getElementById('typing').style.display = 'block';
        document.getElementById('typingHidden').style.display = 'none';
        document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${userAnswer}</p></div>`;
        document.getElementById("userAnswer").value = "";
        var flag = document.getElementById('flag').value;
        if (flag != 'on') {
            document.getElementById("userAnswer").disabled = true;
            get_Next_Question(global_next);

        }
        scrollToBottom();
    } else {
        return;
    }
}

//for first question
async function get_First_Question() {
    data = await eel.getFirstQuestion()();
    display(data);
}

async function get_Next_Question(next) {
    if (!next) {
        if (MTR_GROUP.length > 0) {
            next = MTR_GROUP[0];
            MTR_GROUP.splice(0, 1);
        } else {

            $('#typing').hide();
            $("#userAnswer").attr('disabled', true);
            var write_data_set = getResults();
            console.log("write excel data is", write_data_set);
            eel.writeExcel(write_data_set);

            //choose option
            $('#typing').show();
            document.getElementById("userAnswer").disabled = true;
            var alert = `Thanks for taking your time in completing the assesment.<br> 
                    We will now analysing the information provided<br><br>Please choose your role`
            setTimeout(
                function() {
                    document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + alert + "</p></div>";
                    document.getElementById('flag').value = 'off';
                    document.getElementById('typing').style.display = 'none';
                    document.getElementById('options').style.display = 'block';

                    document.getElementById("options").innerHTML = '';
                    document.getElementById("options").innerHTML +=
                        `<p value="1000000" class='opt'>` + "User" + `</p>`;
                    document.getElementById("options").innerHTML +=
                        `<p value="1000000" class='opt'>` + "Tester" + `</p>`;

                    scrollToBottom();
                    document.getElementById('typingHidden').style.display = 'none';
                }, 2500);

            return;
        }
    }
    data = await eel.getQuestion(next)();
    display(data);
}

function getResults() {
    var answers = $(".userChat");
    var time = start_time;

    var ans = [];
    for (i = 0; i < answers.length; i++) {
        sub_ans = {};
        sub_ans.order = $(answers[i]).children().attr('order');
        sub_ans.ans = $(answers[i]).children().text().trim().replace('...', '');
        ans.push(sub_ans);
    }
    results.push(ans);
    results.push(time);

    return results;
}
//click database item
$(document).on("click", "#database", function() {
    if (database_ans == "") {
        return;
    }
    document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${database_ans}</p></div>`;
    document.getElementById("userAnswer").disabled = false;
    document.getElementById('options').style.display = 'none';

    $('#typing').show();
    get_Next_Question(global_next);
});
//get database item value
$(document).on("change", "#wizards", function() {
    database_ans = this.value;
});

$(document).on('keydown', '#wizards', function(e) {
    // if(e.which!=13){
    //   e.preventDefault();
    // }
});

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//Bot chat display
async function display(data) {
    console.log("data is............", data)
    let question = data.question;
    type = data.type.trim();
    let ans_set = data.ans_set
    let question_media = data.question_media;
    global_order = data.order;
    console.log(global_order)

    dob = data.dob;
    // end = data.end;//end point of chatbot

    if (type == 'Database response') {
        document.getElementById("userAnswer").disabled = true;
        $('#typing').show();
        let ans = [];
        let next_values = [];
        for (const p in ans_set) {
            ans.push(p);
            next_values.push(ans_set[p]);
        }

        global_next = next_values[0];
        var database_results = await eel.getDatabase(ans[0])();

        setTimeout(function() {
            document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
            // document.getElementById("userAnswer").disabled = true;
            document.getElementById('flag').value = 'off';
            document.getElementById('typing').style.display = 'none';
            document.getElementById('options').style.display = 'block';

            var elem = `<input  type="text" id="wizards" name="wizards" list="wizards-list">
      <datalist id="wizards-list">`;
            for (i = 0; i < database_results.length; i++) {
                elem += `<option>${database_results[i]}</option>`;
            }
            elem += "</datalist>";

            document.getElementById("options").innerHTML = '';
            document.getElementById("options").innerHTML += elem;


            $('#wizards').focus();
            document.getElementById('typingHidden').style.display = 'none';
            scrollToBottom();
        }, 1500)

        // $('#typing').hide();
        $("#userAnswer").attr('disabled', true);
    }

    if (type === 'Open response') {
        next_values = [];
        for (const p in ans_set) {
            next_values.push(ans_set[p]);
        }
        global_next = next_values[0];

        $('#typing').show();
        setTimeout(
            function() {
                document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
                document.getElementById('typing').style.display = 'none';
                document.getElementById('typingHidden').style.display = 'block';
                document.getElementById("userAnswer").disabled = false;
                $('#userAnswer').focus();
                scrollToBottom();
            }, 1500);
    }

    if (type === "No response") {
        $('#typing').show();
        $('#options').hide();
        document.getElementById("userAnswer").disabled = true;
        setTimeout(
            function() {
                document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
                document.getElementById('typing').style.display = 'none';
                document.getElementById('typingHidden').style.display = 'block';
                // document.getElementById("userAnswer").disabled = false;
                document.getElementById("userAnswer").disabled = true;

                scrollToBottom();
            }, 1500);
        var next_values = [];
        for (const p in ans_set) {
            next_values.push(ans_set[p]);
        }
        global_next = next_values[0];
        setTimeout(function() {
            get_Next_Question(global_next)
        }, 1500)
    }

    if (type == 'Q. picture single response') {
        document.getElementById("userAnswer").disabled = true;
        setTimeout(function() {

            document.getElementById("botChat").innerHTML += `<div class="adminChat">
                                                        <p class='adminMsg' style="max-width: 300px; max-height: 500px;">
                                                          <img style="max-width: 100%;" class="" src="data:image/jpeg;base64, ${question_media}"><br>
                                                          <span>${question}</span>
                                                        </p>
                                                      </div>`;


            // document.getElementById("userAnswer").disabled = true;
            document.getElementById('flag').value = 'off';
            document.getElementById('typing').style.display = 'none';
            document.getElementById('options').style.display = 'block';

            let options = [];
            let option_values = [];
            for (const p in ans_set) {
                options.push(p);
                option_values.push(ans_set[p]);
            }

            //initiate
            document.getElementById("options").innerHTML = '';
            for (var i = 0; i < options.length; i++) {
                document.getElementById("options").innerHTML +=
                    `<p value=${option_values[i]}  class='opt'>` + options[i] + `</p>`;
            }
            document.getElementById('typingHidden').style.display = 'none';
            scrollToBottom();
        }, 1500)
    }

    if (type === 'Q. picture multiple response') {
        MTR_GROUP = []; //initiate mtr group

        document.getElementById("userAnswer").disabled = true;
        setTimeout(function() {
            document.getElementById("botChat").innerHTML += `<div class="adminChat">
                                                        <p class='adminMsg' style="max-width: 300px; max-height: 500px;">
                                                          <img style="max-width: 100%;" src="data:image/jpeg;base64, ${question_media}"><br>
                                                          <span>${question}</span>
                                                        </p>
                                                      </div>`;

            // document.getElementById("userAnswer").disabled = true;
            document.getElementById('flag').value = 'off';
            document.getElementById('typing').style.display = 'none';
            document.getElementById('options').style.display = 'block';

            let options = [];
            let option_values = [];
            for (const p in ans_set) {
                options.push(p);
                option_values.push(ans_set[p]);
            }

            //initiate
            document.getElementById("options").innerHTML = '';
            for (var i = 0; i < options.length; i++) {
                document.getElementById("options").innerHTML += `<p multitextP="true" value=${option_values[i]}  class='opt'>` + options[i] + `</p>`;
            }
            document.getElementById('typingHidden').style.display = 'none';
            scrollToBottom();
        }, 1500)
    }

    if (type == "Q. media single response") {
        document.getElementById("userAnswer").disabled = true;
        setTimeout(function() {
            question_media = question_media.trim().replace("watch?v=", "embed/");
            $('#typing').show();
            document.getElementById("botChat").innerHTML += `<div class="adminChat">
                                                          <p class='adminMsg' style="max-width: 300px; max-height: 220px;">
                                                            <iframe allowfullscreen onclick="vidView()" src="${question_media}" frameborder="0"></iframe><br>
                                                            <span>${question}</span>
                                                          </p>
                                                        </div>`;



            // document.getElementById("userAnswer").disabled = true;
            document.getElementById('flag').value = 'off';
            document.getElementById('typing').style.display = 'none';
            document.getElementById('options').style.display = 'block';

            let options = [];
            let option_values = [];
            for (const p in ans_set) {
                options.push(p);
                option_values.push(ans_set[p]);
            }

            //initiate
            document.getElementById("options").innerHTML = '';
            for (var i = 0; i < options.length; i++) {
                document.getElementById("options").innerHTML +=
                    `<p value=${option_values[i]}  class='opt'>` + options[i] + `</p>`;
            }
            document.getElementById('typingHidden').style.display = 'none';
            scrollToBottom();
        }, 1500)
    }

    if (type === 'Q. media multiple response') {
        MTR_GROUP = []; //INITIATE MTR GROUP

        document.getElementById("userAnswer").disabled = true;
        setTimeout(function() {
            question_media = question_media.trim().replace("watch?v=", "embed/");
            $('#typing').show();
            document.getElementById("botChat").innerHTML += `<div class="adminChat">
                                                          <p class='adminMsg' style="max-width: 300px; max-height: 220px;">
                                                            <iframe allowfullscreen onclick="vidView()" src="${question_media}" frameborder="0"></iframe><br>
                                                            <span>${question}</span>
                                                          </p>
                                                        </div>`;

            // document.getElementById("userAnswer").disabled = true;
            document.getElementById('flag').value = 'off';
            document.getElementById('typing').style.display = 'none';
            document.getElementById('options').style.display = 'block';

            let options = [];
            let option_values = [];
            for (const p in ans_set) {
                options.push(p);
                option_values.push(ans_set[p]);
            }

            //initiate
            document.getElementById("options").innerHTML = '';
            for (var i = 0; i < options.length; i++) {
                document.getElementById("options").innerHTML += `<p multitextM="true" value=${option_values[i]}  class='opt'>` + options[i] + `</p>`;
            }
            document.getElementById('typingHidden').style.display = 'none';
            scrollToBottom();
        }, 1500)
    }

    if (type === 'Single text response') {
        document.getElementById("userAnswer").disabled = true;
        setTimeout(function() {
            document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
            // scrollToBottom();

            // document.getElementById("userAnswer").disabled = true;
            document.getElementById('flag').value = 'off';
            document.getElementById('typing').style.display = 'none';
            document.getElementById('options').style.display = 'block';

            let options = [];
            let option_values = [];
            for (const p in ans_set) {
                options.push(p);
                option_values.push(ans_set[p]);
            }

            //initiate
            document.getElementById("options").innerHTML = '';
            for (var i = 0; i < options.length; i++) {
                document.getElementById("options").innerHTML +=
                    `<p value=${option_values[i]}  class='opt'>` + options[i] + `</p>`;
            }
            scrollToBottom();
            document.getElementById('typingHidden').style.display = 'none';

        }, 1500);
    }

    if (type === 'Multiple text response') {
        //initiate mtr group
        MTR_GROUP = [];

        document.getElementById("userAnswer").disabled = true;
        setTimeout(function() {
            document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";

            // document.getElementById("userAnswer").disabled = true;
            document.getElementById('flag').value = 'off';
            document.getElementById('typing').style.display = 'none';
            document.getElementById('options').style.display = 'block';

            let options = [];
            let option_values = [];
            for (const p in ans_set) {
                options.push(p);
                option_values.push(ans_set[p]);
            }

            //initiate
            document.getElementById("options").innerHTML = '';
            for (var i = 0; i < options.length; i++) {
                document.getElementById("options").innerHTML += `<p multitext="true" value=${option_values[i]}  class='opt'>` + options[i] + `</p>`;
            }
            document.getElementById('typingHidden').style.display = 'none';
            scrollToBottom();
        }, 1500)
    }

    if (type === 'Single picture response') {

        document.getElementById("userAnswer").disabled = true;
        setTimeout(
            function() {
                document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
                scrollToBottom();
                // document.getElementById("userAnswer").disabled = true;
                document.getElementById('flag').value = 'end';
                document.getElementById('typing').style.display = 'none';
                document.getElementById('options').style.display = 'block';
                document.getElementById('options').classList.add("imgv");
                document.getElementById("options").innerHTML = '';
                let cards = [];
                let cardsName = [];
                let next_values = [];
                // let prefix = 'assets/images/';
                let prefix = "data:image/jpeg;base64, ";
                for (var p in ans_set) {
                    let item = prefix + p.split(">")[0];
                    // let item = prefix + ans_set[p].split(">")[0];
                    cards.push(item);
                    var cardName = p.split(">")[1];
                    if (cardName.length > 20) {
                        cardName = cardName.substr(0, 20) + '...';
                    }
                    cardsName.push(cardName);
                    next_values.push(ans_set[p]);
                    // next_values.push(p);
                }
                console.log(cards);
                console.log(cardsName);

                for (var i = 0; i < cards.length; i++) {
                    document.getElementById("options").innerHTML +=
                        "<div class='opt'><input type='radio' name='one' onclick='checkRadio(" + next_values[i] + ");return false;'><span class='spn'>" + cardsName[i] + "</span><img class='greeting-img' src='" + cards[i] + "'></div>";
                }
                document.getElementById('typingHidden').style.display = 'none';
                document.getElementById('botChat').style.maxHeight = '180px';
                document.getElementById('botChat').style.minHeight = '180px';
                scrollToBottom();
            }, 1500);
    }

    if (type === "Multiple picture response") {
        document.getElementById("userAnswer").disabled = true;
        setTimeout(
            function() {
                // $('#typing').show();
                document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
                scrollToBottom();
                // document.getElementById("userAnswer").disabled = true;
                document.getElementById('flag').value = 'video';
                document.getElementById('typing').style.display = 'none';
                document.getElementById('optionsVid').style.display = 'block';
                document.getElementById('optionsVid').classList.add("imgv");

                let cards = [];
                let cardsName = [];
                let next_values = [];
                // let prefix = 'assets/images/';
                let prefix = "data:image/jpeg;base64, ";
                for (var p in ans_set) {
                    let item = prefix + p.split(">")[0];
                    // let item = prefix + ans_set[p].split(">")[0];
                    cards.push(item);
                    var cardName = p.split(">")[1];
                    if (cardName.length > 20) {
                        cardName = cardName.substr(0, 20) + '...';
                    }
                    cardsName.push(cardName);
                    next_values.push(ans_set[p]);
                    // next_values.push(p);
                }
                console.log(cards);
                console.log(cardsName);

                document.getElementById("optionsVid").innerHTML = "";
                for (var i = 0; i < cards.length; i++) {
                    document.getElementById("optionsVid").innerHTML +=
                        `<div class='opt'><input type='checkbox' name='one' onclick='checkBoxP(${next_values[i]})'><span class='spn'>` + cardsName[i] + `</span><img class='greeting-img' src="${cards[i]}"></div>`;
                }

                scrollToBottom();
            }, 1500);
    }

    if (type === "Single media response") {
        document.getElementById("userAnswer").disabled = true;
        setTimeout(
            function() {
                // $('#typing').show();
                document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
                scrollToBottom();
                // document.getElementById("userAnswer").disabled = true;
                document.getElementById('flag').value = 'video';
                document.getElementById('typing').style.display = 'none';

                document.getElementById('optionsVid').style.display = 'block';
                document.getElementById('optionsVid').classList.add("imgv");


                let vidz = [];
                let vidName = [];
                let next_values = [];
                // let prefix = 'assets/videos/';
                for (p in ans_set) {
                    let item = p.split('>')[0];
                    let name = p.split('>')[1];
                    vidz.push(item);
                    if (name.length > 20) {
                        name = name.substr(0, 20) + '...';
                    }
                    vidName.push(name);
                    next_values.push(ans_set[p]);
                }
                //for initiate
                document.getElementById("optionsVid").innerHTML = "";
                for (var i = 0; i < vidz.length; i++) {
                    document.getElementById("optionsVid").innerHTML +=
                        `<div class='opt'><input type='radio' name='one' onclick='checkRadio(${next_values[i]})'><span class='spn1'>` + vidName[i] + `</span><iframe allowfullscreen onclick='vidView();return false;' class='greeting-img1' src="${vidz[i].trim().replace("watch?v=", "embed/")}" frameborder="0"></iframe></div>`;
                }

                scrollToBottom();
            }, 1500);
    }

    if (type === 'Multiple media response') {
        document.getElementById("userAnswer").disabled = true;
        $('#typing').show();
        setTimeout(
            function() {
                document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + question + "</p></div>";
                scrollToBottom();
                // document.getElementById("userAnswer").disabled = true;
                document.getElementById('flag').value = 'video';
                document.getElementById('typing').style.display = 'none';
                document.getElementById('options').style.display = 'none';
                document.getElementById('optionsVid').style.display = 'block';
                document.getElementById('optionsVid').classList.add("imgv");

                let vidz = [];
                let vidName = [];
                let next_values = [];
                // let prefix = 'assets/videos/';
                for (var p in ans_set) {
                    var item = p.split('>')[0];
                    var name = p.split('>')[1];
                    if (name.length > 20) {
                        name = name.substr(0, 20) + '...';
                    }
                    vidz.push(item);
                    vidName.push(name);
                    next_values.push(ans_set[p]);
                }

                document.getElementById("optionsVid").innerHTML = "";
                for (var i = 0; i < vidz.length; i++) {
                    document.getElementById("optionsVid").innerHTML +=
                        `<div class='opt'><input type='checkbox' name='one' onclick='checkBox(${next_values[i]})'><span class='spn1'>` + vidName[i] + `</span><iframe frameborder="0" allowfullscreen onclick='vidView();return false;' class='greeting-img1' src="${vidz[i].trim().replace("watch?v=", "embed/")}"></iframe></div>`;
                }

                scrollToBottom();
            }, 1500);
    }
}
//picture mcq zoom out
$(document).on('click', '.adminMsg > img', function() {
    var x = event.target;
    document.getElementById("viewOption").style.display = "block";
    document.getElementById("viewOption").innerHTML = "<p>" + x.parentNode.innerHTML + "</p>";
});
//picture mcq zoom out
$(document).on('click', '#viewOption', function() {
    document.getElementById("viewOption").style.display = "none";
});

async function getFeedback_J(mode) {
    var elem = `<div id="progress" class="adminChat">
                <div id="myProgress">
                  <div id="myBar">0%</div>
                </div>
                <p id="timer" style="display:none">Wait while analyzing the contents.<br><br>Your approximate waste time is 5 seconds</p>
              </div>`;

    $('#botChat').append(elem);
    scrollToBottom();

    countdown();
    move();

    var feedbacks = await eel.getFeedback(mode)();
    console.log("-------------feedbacks-------------------", feedbacks);

    for (i = 0; i < feedbacks.length; i++) {
        if (mode == "User")
            sleep(1000);
        else
            sleep(600);

        url_regx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
        feedback = feedbacks[i].replace(url_regx, function(url) {
            return '<a target="_blank" href="https://' + url + '">' + url + '</a>';
        });

        document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + feedback + "</p></div>";
        // document.getElementById("botChat").innerHTML += "<div class='adminChat'><p class='adminMsg'>" + feedbacks[i] + "</p></div>";
    }

    document.getElementById('userAnswer').disabled = true;
    document.getElementById('typing').style.display = 'none';
    scrollToBottom();
}

function countdown() {
    var timeleft = 5;
    document.getElementById("timer").style.display = "block";
    var downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
        } else {
            document.getElementById("timer").innerHTML = "Wait while analyzing the contents.<br><br>Your approximate waste time is " + timeleft + " seconds";
        }
        timeleft -= 1;
    }, 900);
}

function move() {
    document.getElementById("myProgress").style.display = "block";
    if (index == 0) {
        index = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 60);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
                index = 2;
                document.getElementById("progress").style.display = 'none';
                document.getElementById('typing').style.display = 'block';
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
            }
        }
    }
}

document.querySelector('#options').addEventListener('click', function(event) {
    // console.log(event.target.nodeName);
    if (event.target.nodeName === 'DIV') { //fix div errors
        return;
    }

    if ((event.target.nodeName === 'P') && (document.getElementById('flag').value != 'on')) {
        if (event.target.getAttribute('multitext')) { //multiple text response
            var x = event.target;
            var mtr_next = parseInt(x.getAttribute('value'));
            var flg = '0';
            if (vidArrayT.length > 0) {
                for (var i = 0; i < vidArrayT.length; i++) {
                    if (vidArrayT[i] == x.innerHTML) {
                        vidArrayT.splice(i, 1);
                        MTR_GROUP.splice(i, 1);
                        flg = '1';

                        // x.style.backgroundColor = "#DFEEEC";
                        x.style.backgroundColor = "transparent";
                        x.style.borderTop = "1px solid #253ADE";
                        x.style.borderBottom = "1px solid #03C0FC";
                        x.style.backgroundImage = "";
                        x.style.color = "";
                    }
                }

                if (flg != '1') {
                    vidArrayT.push(x.innerHTML);
                    MTR_GROUP.push(mtr_next);
                    // global_next = parseInt(x.getAttribute('value'));

                    x.style.backgroundColor = "#03C0FC";
                    x.style.backgroundImage = "linear-gradient(315deg, #03C0FC 0%, #253ADE 74%)";
                    x.style.color = "#fff";
                }

            } else {
                vidArrayT.push(x.innerHTML);
                MTR_GROUP.push(mtr_next);

                x.style.backgroundColor = "#03C0FC";
                x.style.backgroundImage = "linear-gradient(315deg, #03C0FC 0%, #253ADE 74%)";
                x.style.color = "#fff";
                // global_next = parseInt(x.getAttribute('value'));
            }

            up_txt = true;

        } else if (event.target.getAttribute('multitextP')) { //Q. picture multiple response
            var x = event.target;
            var mtr_next = parseInt(x.getAttribute('value'));

            var flg = '0';
            if (vidArrayPT.length > 0) {
                for (var i = 0; i < vidArrayPT.length; i++) {
                    if (vidArrayPT[i] == x.innerHTML) {
                        vidArrayPT.splice(i, 1);
                        MTR_GROUP.splice(i, 1);
                        flg = '1';

                        // x.style.backgroundColor = "#DFEEEC";
                        x.style.backgroundColor = "transparent";
                        x.style.borderTop = "1px solid #253ADE";
                        x.style.borderBottom = "1px solid #03C0FC";
                        x.style.backgroundImage = "";
                        x.style.color = "";
                    }
                }

                if (flg != '1') {
                    vidArrayPT.push(x.innerHTML);
                    MTR_GROUP.push(mtr_next);
                    // global_next = parseInt(x.getAttribute('value'));


                    x.style.backgroundColor = "#03C0FC";
                    x.style.backgroundImage = "linear-gradient(315deg, #03C0FC 0%, #253ADE 74%)";
                    x.style.color = "#fff";
                }

            } else {
                vidArrayPT.push(x.innerHTML);
                MTR_GROUP.push(mtr_next);
                // global_next = parseInt(x.getAttribute('value'));

                x.style.backgroundColor = "#03C0FC";
                x.style.backgroundImage = "linear-gradient(315deg, #03C0FC 0%, #253ADE 74%)";
                x.style.color = "#fff";
            }

            up_pt = true;

        } else if (event.target.getAttribute('multitextM')) { //Q.media multiple response
            var x = event.target;
            var mtr_next = parseInt(x.getAttribute('value'));
            var flg = '0';
            if (vidArrayMT.length > 0) {
                for (var i = 0; i < vidArrayMT.length; i++) {
                    if (vidArrayMT[i] == x.innerHTML) {
                        vidArrayMT.splice(i, 1);
                        MTR_GROUP.splice(i, 1);
                        flg = '1';

                        // x.style.backgroundColor = "#DFEEEC";
                        x.style.backgroundColor = "transparent";
                        x.style.borderTop = "1px solid #253ADE";
                        x.style.borderBottom = "1px solid #03C0FC";
                        x.style.backgroundImage = "";
                        x.style.color = "";
                    }
                }

                if (flg != '1') {
                    vidArrayMT.push(x.innerHTML);
                    MTR_GROUP.push(mtr_next);
                    // global_next = parseInt(x.getAttribute('value'));


                    x.style.backgroundColor = "#03C0FC";
                    x.style.backgroundImage = "linear-gradient(315deg, #03C0FC 0%, #253ADE 74%)";
                    x.style.color = "#fff";
                }

            } else {
                vidArrayMT.push(x.innerHTML);
                MTR_GROUP.push(mtr_next);
                // global_next = parseInt(x.getAttribute('value'));


                x.style.backgroundColor = "#03C0FC";
                x.style.backgroundImage = "linear-gradient(315deg, #03C0FC 0%, #253ADE 74%)";
                x.style.color = "#fff";
            }

            up_mt = true;

        } else { //single text resposne
            var next = parseInt(event.target.getAttribute('value'));

            document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${event.target.innerHTML}</p></div>`;
            document.getElementById("userAnswer").disabled = false;
            document.getElementById('options').style.display = 'none';
            document.getElementById('typing').style.display = 'block';

            if (next == 1000000) {
                var mode = event.target.innerHTML;
                console.log(mode);
                document.getElementById('typing').style.display = 'none';
                scrollToBottom();
                getFeedback_J(mode);

                // document.getElementById("userAnswer").disabled = true;

                return;
            }

            global_next = next;
            get_Next_Question(global_next);
        }

    } else { //picture zooming
        var x = event.target;
        var z = x.attributes[1].nodeValue;
        if (y == z) {
            document.getElementById("viewOption").style.display = "none";
            x.classList.remove("gre");
            y = '';
        } else {
            if ((document.getElementById('flag').value != 'on') && (document.getElementById('flag').value != 'vid')) {
                x.classList.add("gre");
                document.getElementById("viewOption").style.display = "block";
                document.getElementById("viewOption").innerHTML = "<p>" + x.parentNode.innerHTML + "</p>";
                y = z;
            }
        }
    }
});
document.querySelector('#optionsVid').addEventListener('click', function(event) {
    // console.log(event.target.nodeName);
    if (event.target.nodeName === 'DIV') { //fix div errors
        return;
    }

    if ((event.target.nodeName === 'IMG') && (document.getElementById('flag').value != 'on')) {

        // } else {//picture zooming
        var x = event.target;
        var z = x.attributes[1].nodeValue;
        if (y == z) {
            document.getElementById("viewOption").style.display = "none";
            x.classList.remove("gre");
            y = '';
        } else {
            if ((document.getElementById('flag').value != 'on') && (document.getElementById('flag').value != 'vid')) {
                x.classList.add("gre");
                document.getElementById("viewOption").style.display = "block";
                document.getElementById("viewOption").innerHTML = "<p>" + x.parentNode.innerHTML + "</p>";
                y = z;
            }
        }
    }
});

//for picture
function checkRadio(next) {

    //stop youtube
    if (type == 'Single media response') {
        document.getElementById("optionsVid").innerHTML = "";
    }
    document.getElementById('flag').value = 'vid';
    document.getElementById('botChat').style.maxHeight = '265px';
    document.getElementById('botChat').style.minHeight = '265px';
    var x = event.target;
    document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}'>${x.parentNode.innerHTML}</p></div>`;
    scrollToBottom();
    document.getElementById("userAnswer").disabled = false;
    document.getElementById('options').style.display = 'none';
    document.getElementById('optionsVid').style.display = 'none';
    document.getElementById("viewOption").style.display = "none";
    document.getElementById('typing').style.display = 'block';
    document.getElementById('options').classList.remove("imgv");

    global_next = next;
    get_Next_Question(global_next);
}
//for video
function checkBox(next) {
    document.getElementById("viewOption").style.display = "none";
    var x = event.target;
    x.classList.remove("gre");
    var flg = '0';

    if (vidArray.length > 0) {
        for (var i = 0; i < vidArray.length; i++) {
            if (vidArray[i] == x.parentNode.innerHTML) {
                vidArray.splice(i, 1);
                flg = '1';
            }
        }

        if (flg != '1') {
            vidArray.push(x.parentNode.innerHTML);
        }

    } else {
        vidArray.push(x.parentNode.innerHTML);
    }

    up_video = true;
    global_next = next;
}

function checkBoxP(next) {
    document.getElementById("viewOption").style.display = "none";
    var x = event.target;
    x.classList.remove("imgv");
    var flg = '0';
    if (vidArrayP.length > 0) {
        for (var i = 0; i < vidArrayP.length; i++) {
            if (vidArrayP[i] == x.parentNode.innerHTML) {
                vidArrayP.splice(i, 1);
                flg = '1';
            }
        }

        if (flg != '1') {
            vidArrayP.push(x.parentNode.innerHTML);
        }

    } else {
        vidArrayP.push(x.parentNode.innerHTML);
    }

    up_img = true;
    global_next = next;
}

//close viewOption
function close() {
    document.getElementById("viewOption").style.display = "none";
}
//press start button
$(document).ready(function() {
    $(window).resize(function(e) {
        // console.log(e)
        // e.preventDefault()
        innerHeight = window.innerHeight;
        innerWidth = window.innerWidth;
        console.log("resize", innerWidth, outerHeight);
        // if (innerWidth != 944 || innerHeight != 681) {
        //     window.resizeTo(960, 720);
        // }
    });
    $('#startChat').click(function() {
        $('#myForm').show();
        setCurTime();
        start_time = getCurDateTime();
    });

    
});

//form hide
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

//scroll bottom effect
const messages = document.getElementById('botChat');

function scrollToBottom() {
    setTimeout(function() {
        messages.scrollTop = messages.scrollHeight;
    }, 400);
}

$(document).keydown(function(e) {
    if (e.which == 13) {
        if (up_video) {
            if (vidArray.length == 0) {
                return;
            }
            //part for youtube stop
            document.getElementById("optionsVid").innerHTML = '';
            //hide viewoption
            document.getElementById("viewOption").style.display = "none";
            //add videos to botchat when press submit button
            if (vidArray.length > 0) {
                for (var i = 0; i < vidArray.length; i++) {
                    document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}'>${vidArray[i]}</p></div>`;
                    scrollToBottom();
                }
                $('#typing').show();
                get_Next_Question(global_next);
            }

            document.getElementById('optionsVid').style.display = 'none';
            up_video = false;
            vidArray = [];
        }

        if (up_img) {
            if (vidArrayP.length == 0) {
                return;
            }
            //hide viewoption
            document.getElementById("viewOption").style.display = "none";
            //add videos to botchat when press submit button
            if (vidArrayP.length > 0) {
                for (var i = 0; i < vidArrayP.length; i++) {
                    document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}'>${vidArrayP[i]}</p></div>`;
                    scrollToBottom();
                }
                $('#typing').show();
                get_Next_Question(global_next);
                // is_start = true;
            }

            document.getElementById('optionsVid').style.display = 'none';
            up_img = false;
            vidArrayP = [];
        }

        if (up_pt) {
            if (vidArrayPT.length == 0) {
                return;
            }
            //hide viewoption
            document.getElementById("viewOption").style.display = "none";
            document.getElementById("options").style.display = 'none';
            //add videos to botchat when press submit button
            if (vidArrayPT.length > 0) {
                global_next = MTR_GROUP[0];
                MTR_GROUP.splice(0, 1);

                for (var i = 0; i < vidArrayPT.length; i++) {
                    document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${vidArrayPT[i]}</p></div>`;
                    scrollToBottom();
                }
                $('#typing').show();
                get_Next_Question(global_next);
                // is_start = true;
            }

            document.getElementById('optionsVid').style.display = 'none';
            up_pt = false;
            vidArrayPT = [];
        }

        if (up_txt) {
            if (vidArrayT.length == 0) {
                return;
            }
            //hide viewoption
            document.getElementById("viewOption").style.display = "none";
            document.getElementById("options").style.display = 'none';
            //add videos to botchat when press submit button
            if (vidArrayT.length > 0) {
                global_next = MTR_GROUP[0];
                MTR_GROUP.splice(0, 1);

                for (var i = 0; i < vidArrayT.length; i++) {
                    document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${vidArrayT[i]}</p></div>`;
                    scrollToBottom();
                }

                // console.log(global_next);
                get_Next_Question(global_next);
                $('#typing').show();
            }

            document.getElementById('optionsVid').style.display = 'none';
            up_txt = false;
            vidArrayT = [];
        }

        if (up_mt) {
            if (vidArrayMT.length == 0) {
                return;
            }
            //hide viewoption
            document.getElementById("viewOption").style.display = "none";
            document.getElementById("options").style.display = 'none';
            //add videos to botchat when press submit button
            if (vidArrayMT.length > 0) {
                global_next = MTR_GROUP[0];
                MTR_GROUP.splice(0, 1);

                for (var i = 0; i < vidArrayMT.length; i++) {
                    document.getElementById("botChat").innerHTML += `<div class='userChat'><p order='${global_order}' class='userMsg'>${vidArrayMT[i]}</p></div>`;
                    scrollToBottom();
                }
                get_Next_Question(global_next);
                // is_start = true;
                $('#typing').show();
            }

            document.getElementById('optionsVid').style.display = 'none';
            up_mt = false;
            vidArrayMT = [];
        }
    }
});
