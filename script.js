const rules = [
    {
        title: "Respect entre membre",
        description: "Traite tout monde normalement arrete de faire le flocko ou le mec de l'info si t'y connais rien !",
    },
    {
       title: "Harcelement",
       description: "Arreté de faire les flockos a faire un groupe pour vous embrouille, regler vos embrouille tout seule !",
    },
    {
      title: "flood",
      description: "eviter de flood bande d'enculer !",

    }, 
    {
      title: "Pub",
      description: "Faite aucune pub dans les salons commu venez mp @vcs07 pour pub",

    },
    {
        title: "Ghor",
        description: "Pour tout les truc ghor genre: vcam, decapitations ect ect sa evité serieusement :/",

    },
    {
        title: "grabber",
        description: "evité de lacher des liens grabber c'est trop gnt sah ",

    },
    {
        title: "Salon",
        description: "juste eviter de parler dans des salon genre #mission pour parle de chose qui n'es pas une demande !",

    }

];

const rulesGrid = document.querySelector("#rules-grid");

rules.forEach((rule, index) => {
    const card = document.createElement("article");
    
    card.className = "rule-card";
    
    const number = String(index + 1).padStart(2, "0");

    const label = document.createElement("span");
    label.className = "rule-number";
    label.textContent = `REGLE ${number}`;


    const title = document.createElement("h3");
    title.textContent = rule.title;

    const description = document.createElement("p");
    description.textContent = rule.description;

    card.append(label, title, description);
    rules.Grid.appendChild(card);

});


const canvas = document.querySelector("#particles");
const ctx = canvas.getContext("2d");


let particles = [];
let width = 0;
let height = 0;
let animationId;



function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    
    width = window.innerWidth;
    height = window.innerHeight;
    

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;


    ctx.setTransform(ratio, 0, 0, ratio, 0, 0,);

    const count = Math.min(90, Math.floor(width / 14));


    particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.4,
        speed: Math.random() * 0.35 + 0.08,
        opacity: Math.random() * 0.5 + 0.15

    }));
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (const particle of particles) {
        particle.y -= particle.speed;

        if (particle.y < -5) {
            particle.y = height + 5;
            particle.x = Math.random() * width;
        }
    
        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );
    
        ctx.fillStyle = `rgba(225, 230, 245, ${particle.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(225, 230, 245, 0.4)";
        ctx.fill();
    
    }

    ctx.shadowBlur = 0;
    animationId = requestAnimationFrame(animateParticles);
}

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce"
);


function startParticles() {
    cancelAnimationFrame(animationId);

    if (reducedMotion.matches) {
        ctx.clearRect(0, 0, width, height);
        return;
    }

    animateParticles();

}

resizeCanvas();
startParticles();

window.addEventListener("resize", resizeCanvas);


reducedMotion.addEventListener("change", startParticles);