/* GLOBAL VARIABLES */
let time = 0;


/* GLOBAL DECLARATIONS */
$("#attribute-area").toggle();
$("#name-area").toggle();
$("#button-area").toggle();
$("#pet-area").toggle();


/* The tama class */

const $pet = $("#pet") // so we can query the image representing the pet at any point.

class Tamagotchi {
    constructor() {
        this.hunger = 10,
        this.fatigue = 10,
        this.boredom = 10,
        this.age = 1,
        this.alive = true
        this.image = "",
        this.stage = 0
        this.evolutionOne = ""
    }

    jump() { // thank you to stackoverflow + the jquery documentation for showing me how .defer works
        function jumpUp() {
            var d = $.Deferred();
            setTimeout(() => {
                $("#pet").css({"transform": "translateY(-20px)", "transition": "ease-in 0.5s"});
                d.resolve();
            }, 500);
            return d.promise();
        }
        function jumpDown() {
            var d = $.Deferred();
            setTimeout(() => {
                $("#pet").css({"transform": "translateY(20px)", "transition": "ease-in 0.5s"});
                d.resolve();
            }, 500);
            return d.promise();
        }
        
        jumpUp().pipe(jumpDown)
    }

    feed() {
        this.hunger++;
        console.log(`Feeding ${tama.name}!`);
        console.log(`hunger is at ${this.hunger}`);
        $("#hunger").text(`Hunger: ${this.hunger}`);
        this.jump();
    }

    play() {
        this.boredom++;
        console.log(`Playing with ${tama.name}!`);
        console.log(`boredom is at ${this.boredom}`);
        $("#boredom").text(`Boredom: ${this.boredom}`);
    }

    rest() {
        this.fatigue++;
        $("#fatigue").text(`Fatigue: ${this.fatigue}`)
    }

    evolve() {
        this.stage++;
        $("#pet").attr("src", `${this.evolutionOne}`)
    }
};

let tama = new Tamagotchi();

/* Button Effects */

$("#feed").on("click", () => {tama.feed()});
$("#play").on("click", () => {tama.play()});

// the lights requires a bit more logic
let lightsOn = true;
const toggleLights = function toggleLights() {
    lightsOn = !lightsOn

    let opacity = 0.5;

    if (lightsOn) {
        opacity = 0.0;
    }
    const styles = { // THIS IS THE WAY.
        "background-color": `rgba(0, 0, 0, ${opacity}`,
        display: "block",
    }
    $("#lights-off").css(styles)
}

$("#lights").on("click", toggleLights);
/* $("#lights-off").dblclick(toggleLights);  // failsafe for broken lights-off, since it fucks up on different screen sizes!
 */

/* The World Timer */

function setTimer() {
    console.log("game start!")
    const updateTime = function updateTime() {

        time++;

        if (time % 60 === 0) {
            console.log("your tamagotchi has aged!")
            tama.age++;
            if (tama.age === 5) {
                console.warn(`${tama.name} has evolved!`)
                tama.evolve();
            }
        }

        if (tama.hunger === 0 || tama.fatigue === 0) {
            tama.alive === false;
            clearInterval(worldTimer);
            bgm.pause();
            console.log("Your tamagotchi has died!")
            var deathSound = document.getElementById("death-sound")
            deathSound.volume = 0.3;
            deathSound.play();
        }

        if (tama.alive === false) {
            
        }

        if (lightsOn !== true && time % 5 === 0) {
            tama.rest();
        }

        if (time % 45 === 0 && lightsOn === true) {
            tama.fatigue--;
            $("#fatigue").text(`Fatigue: ${tama.fatigue}`)
        }

        if (time % 15 === 0 && tama.boredom >=1) {
            tama.boredom--;
            $("#boredom").text(`Boredom: ${tama.boredom}`);
        }

        if (time % 15 === 0 && tama.hunger >=1) {
            tama.hunger--;
            $("#hunger").text(`Hunger: ${tama.hunger}`);
        }

        if (time % 15 === 0) {
            if (Math.floor(Math.random() *2) === 0) {
                $("#pet").css({"transform": "translateX(-150px)", "transition": "ease-in 2s"});
            } else {
                $("#pet").css({"transform": "translateX(150px)", "transition": "ease-in 2s"});
            }
        }

    }
    const worldTimer = setInterval(updateTime, 1000)
};


/* Name */
// I have made this the de-facto "game start" event.
// trying to get the value of a textbox input, remove the box, and splash the value where the input box was, all bound to an event listener on the 
// 'enter' keypress.
// bless stackoverflow for explaining this
$("#name-input").keypress(function (e) { 
    var key = e.which
    var submittedName = $("#name-input").val()
    if (key === 13) {
        const $newName = $("<p id='name'></p>");
        $newName.text(submittedName);
        $("#name-area").empty();
        $("#name-area").append($newName);
        tama.name = submittedName;
        // adding the BGM effects here
        bgm.volume = 0.4;
        bgm.play();
        const $muteButton = $(`<i class='fas fa-volume-mute' id='mute-button'></i>`);
        $("#name-area").append($muteButton);
        const $unmuteButton = $(`<i class='fas fa-volume-up' id='unmute-button'></i>`);
        $("#name-area").append($unmuteButton);
        $unmuteButton.toggle();
        $muteButton.click(function() {
            bgm.pause();
            $muteButton.toggle();
            $unmuteButton.toggle();
            /* $muteButton.remove();
            $("#name-area").append($unmuteButton); */
        })
        $unmuteButton.click(function() {
            bgm.play();
            $unmuteButton.toggle();
            $muteButton.toggle();
            /* $unmuteButton.remove();
            $("#name-area").append($muteButton); */
        })
    }
});

// holy crap this actually works

/* WOOHOO ICEBOX FEATURES */





/* jumping up and down when fed can be found in the Tamagotchi object */




/* Sound Effects */

var bgm = document.getElementById("bgm");

// the mute button was added to the keypress function because I was having scoping issues. an arrow function would have probably also fixed it, but 
// I am rolling with this until it causes an issue.

// death noise and effects can be found in the timer!






/* Creature Select */

// choice in games is HUGE for me! Being able to select different creatures is a must-have stretch goal if possible.
// here is the js logic for the modal box:

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



/* PET CHOICE BUTTONS */

$("#borbo").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/borbo-purple.png";
    tama.evolutionOne = "./images/Pets/borbo-purple-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

$("#glimer").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/glimer-purple.png";
    tama.evolutionOne = "./images/Pets/glimer-purple-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

$("#kroak").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/kroak-red.png";
    tama.evolutionOne = "./images/Pets/kroak-red-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

$("#myko").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/myko-purple.png";
    tama.evolutionOne = "./images/Pets/myko-purple-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

$("#hunker").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/hunker-purple.png";
    tama.evolutionOne = "./images/Pets/hunker-purple-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

$("#tsuudo").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/tsuudo-blue.png";
    tama.evolutionOne = "./images/Pets/tsuudo-blue-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

$("#omocha").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/omocha-green.png";
    tama.evolutionOne = "./images/Pets/omocha-green-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

$("#gabe-jr").click(function() {
    $("#attribute-area").toggle();
    $("#name-area").toggle();
    $("#button-area").toggle();
    tama.image = "./images/Pets/gabe-jr-blue.png";
    tama.evolutionOne = "./images/Pets/gabe-jr-blue-2.png";
    $("#pet").attr("src", `${tama.image}`);
    $("#pet-area").toggle();
    setTimer();
    $("#myModal").toggle();
})

// test push