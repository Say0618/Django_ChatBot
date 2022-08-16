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
        get_First_Question();
    }

}

function ajax_setup() {
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": csrftoken
        }
    });
} 

function get_First_Question() {
    ajax_setup();
    $.ajax({
        url: "{% url 'chatbot/start' %}",
        type: 'POST',
        success: function(res) {
            display(data);
        }
    });
}

//Bot chat display
function display(data) {
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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}