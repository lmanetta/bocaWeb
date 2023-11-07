//CONFETIS EN EL HEADER

(function() {
    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawSquare, i, range, resizeWindow, xpos;

    NUM_CONFETTI = 350;

    COLORS = [[9, 74, 136], [2, 36, 110], [243, 178, 41], [243, 200, 41], [0, 255, 255], [255, 255, 0], [0, 0, 255]];

    PI_2 = 2 * Math.PI;

    canvas = document.getElementById("world");

    context = canvas.getContext("2d");

    window.w = 0;

    window.h = 0;

    resizeWindow = function() {
        const headerHeight = document.getElementById("header").offsetHeight;
        window.w = canvas.width = window.innerWidth;
        window.h = canvas.height = headerHeight;
        // Dibuja la imagen en el canvas cuando se redimensiona la ventana
        drawImageInsideCanvas();
    };

    window.addEventListener('resize', resizeWindow, false);

    window.onload = function() {
        setTimeout(resizeWindow, 0);
    };

    range = function(a, b) {
        return (b - a) * Math.random() + a;
    };

    drawSquare = function(x, y, r, style) {
        context.beginPath();
        context.rect(x, y, r, r); // Dibuja un cuadrado en lugar de un círculo
        context.fillStyle = style;
        context.fill();
    };

    xpos = 0.5;

    document.onmousemove = function(e) {
        xpos = e.pageX / w;
    };

    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();

    Confetti = class Confetti {
        constructor() {
            this.style = COLORS[~~range(0, 6)];
            this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
            this.r = ~~range(5, 15);
            this.r2 = 2 * this.r;
            this.replace();
        }

        replace() {
            this.opacity = 0;
            this.dop = 0.03 * range(1, 4);
            this.x = range(-this.r2, w - this.r2);
            this.y = range(-20, h - this.r2);
            this.xmax = w - this.r;
            this.ymax = h - this.r;
            this.vx = range(0, 2) + 8 * xpos - 5;
            // this.vy = 0.7 * this.r + range(-1, 1);
            this.vy = 0.3 * this.r + range(-1, 1);
        }

        draw() {
            this.x += this.vx;
            this.y += this.vy;
            this.opacity += this.dop;
            if (this.opacity > 1) {
                this.opacity = 1;
                this.dop *= -1;
            }
            if (this.opacity < 0 || this.y > this.ymax) {
                this.replace();
            }
            if (!(0 < this.x && this.x < this.xmax)) {
                this.x = (this.x + this.xmax) % this.xmax;
            }
            drawSquare(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
        }
    };

    confetti = (function() {
        var j, ref, results;
        results = [];
        for (i = j = 1, ref = NUM_CONFETTI; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
            results.push(new Confetti());
        }
        return results;
    })();

    window.step = function() {
        var c, j, len, results;
        requestAnimationFrame(step);
        context.clearRect(0, 0, w, h);
        for (j = 0, len = confetti.length; j < len; j++) {
            c = confetti[j];
            c.draw();
        }
        // Dibuja la imagen en el canvas
        drawImageInsideCanvas();
    };

    function drawImageInsideCanvas() {
        const bocaLogo = new Image();
        bocaLogo.src = "Imagen/Boca_Juniors_logo.png";

        bocaLogo.onload = function() {
            context.drawImage(bocaLogo, 0, 0, w, h);
        };
    }

    step();
})();

  
  


  /*CAMISETAS*/

  console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		nextCardEl.classList.remove("next--card");

		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		nextBgImageEl.classList.remove("next--image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousCardEl.classList.add("next--card");
			nextCardEl.classList.add("current--card");

			currentBgImageEl.classList.add("previous--image");
			previousBgImageEl.classList.add("next--image");
			nextBgImageEl.classList.add("current--image");
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("previous--card");

			currentBgImageEl.classList.add("next--image");
			previousBgImageEl.classList.add("current--image");
			nextBgImageEl.classList.add("previous--image");
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 0.5,
		pointerEvents: "none",
	})
		.to(
		currentInfoEl.querySelectorAll(".text"),
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "-120px",
			opacity: 0,
		},
		"-="
	)
		.call(() => {
		swapInfosClass(direction);
	})
		.call(() => initCardEvents())
		.fromTo(
		direction === "right"
		? nextInfoEl.querySelectorAll(".text")
		: previousInfoEl.querySelectorAll(".text"),
		{
			opacity: 0,
			translateY: "40px",
		},
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "0px",
			opacity: 1,
		}
	)
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 1,
		pointerEvents: "all",
	});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			previousInfoEl.classList.add("next--info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("previous--info");
			previousInfoEl.classList.add("current--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		delay: 0.5,
		duration: 0.4,
		stagger: 0.1,
		opacity: 1,
		translateY: 0,
	})
		.to(
		[buttons.prev, buttons.next],
		{
			duration: 0.4,
			opacity: 1,
			pointerEvents: "all",
		},
		"-=0.4"
	);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	// gsap.set(cardsContainerEl.children, {
	// 	"--card-translateY-offset": "100vh",
	// });
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
						duration: 0,
						opacity: 0,
						pointerEvents: "none",
					})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();



const imagen1 = document.getElementById("imagen1"),
	  imagen2 = document.getElementById("imagen2"),
	  imagen3 = document.getElementById("imagen3"),
	  link = document.getElementById("link");

// Actualiza el enlace según la imagen que se encuentra al frente
function updateLink() {
  const currentImage = document.querySelector(".current--card .frente img");
  if (currentImage === imagen1) {
    link.href = "https://www.bocashop.com.ar/camiseta-titular-boca-jrs-23-24/p";
  } else if (currentImage === imagen2) {
    link.href = "https://www.bocashop.com.ar/ib9463-camiseta-authentic-alternativa-boca-jrs-22-23/p";
  } else if (currentImage === imagen3) {
    link.href = "https://www.bocashop.com.ar/camiseta-alternativa-boca-jrs-23-24/p";
  }
}

function redireccion(){
	var redireccion = window.confirm('Se abrirá en una nueva pestaña la página correspondiente, ¿está seguro?');
	if (redireccion === true){
		window.open(link.href, '_blank');
	} else {
		window.alert('¡Pero che, que inseguro!');
	}	
}

// Lo siguiente es para evitar que se redireccione sin preguntar primero
link.addEventListener("click", (event) => {
	event.preventDefault(); // Esto es lo que lo evita
	redireccion(); // Llama a la funcion de confirmacion y redirige si es aceptada
  });
  
// Detecta cambios en la imagen actual
document.querySelector(".cardList").addEventListener("click", () => {
  // Periodo de tiempo para que cambie la imagen
  setTimeout(updateLink, 500);
});

//Se llama la función
updateLink();


function toggleSesion() {
    const iniciarSesionLink = document.getElementById('iniciarSesionLink'),
    	  usuarioAutenticado = localStorage.getItem('usuarioAutenticado'),
		  usuarioInfo = document.getElementById('usuarioInfo'),
		  nombreUsuario = document.getElementById('nombreUsuario'),
		  cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    if (usuarioAutenticado === 'true') {
        // Si el usuario está autenticado, muestra el enlace "Cerrar sesión" y oculta "Iniciar sesión"
        const usuario = localStorage.getItem('usuario'); // Trae el nombre de usuario
        nombreUsuario.textContent = usuario;
        usuarioInfo.style.display = 'block';
        cerrarSesionBtn.style.display = 'block';

        // Oculta "Iniciar sesión"
        iniciarSesionLink.style.display = 'none';
    } else {
        // Si no hay un usuario autenticado, oculta "Hola [nombre de usuario]" y "Cerrar sesión"
        usuarioInfo.style.display = 'none';
        cerrarSesionBtn.style.display = 'none';

        // Muestra "Iniciar sesión"
        iniciarSesionLink.style.display = 'block';
    }

	cerrarSesionBtn.onclick = function () {
        localStorage.removeItem('usuarioAutenticado'); // Elimina la bandera de autenticación
        window.location.href = "index.html"; // Va a la página principal
    };
}

toggleSesion();
