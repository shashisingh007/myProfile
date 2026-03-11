particlesJS("particles-js", {

particles: {

number: {
value: 140,
density: {
enable: true,
value_area: 900
}
},

color: {
value: ["#22d3ee","#38bdf8","#0ea5e9"]
},

shape: {
type: "circle"
},

opacity: {
value: 0.65,
random: true,
anim: {
enable: true,
speed: 1.2,
opacity_min: 0.25,
sync: false
}
},

size: {
value: 4,
random: true,
anim: {
enable: true,
speed: 2,
size_min: 0.4,
sync: false
}
},

line_linked: {
enable: true,
distance: 160,
color: "#22d3ee",
opacity: 0.45,
width: 1.2
},

move: {
enable: true,
speed: 2.2,
direction: "none",
random: true,
straight: false,
out_mode: "out",
bounce: false
}

},

interactivity: {

detect_on: "canvas",

events: {

onhover: {
enable: true,
mode: "grab"
},

onclick: {
enable: true,
mode: "push"
},

resize: true

},

modes: {

grab: {
distance: 220,
line_linked: {
opacity: 0.9
}
},

push: {
particles_nb: 5
}

}

},

retina_detect: true

});