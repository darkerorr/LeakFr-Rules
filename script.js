
const rules = [
    {
        title: "Respect entre membre",
        description: "Traite tout monde normalement arrete de faire le flocko ou le mec de l'info si t'y connais rien !"
    },
    {
        title: "Harcelement",
        description: "Arreté de faire les flockos a faire un groupe pour vous embrouille, regler vos embrouille tout seule !"
    },
    {
        title: "flood",
        description: "eviter de flood bande d'enculer !"
    },
    {
        title: "Pub",
        description: "Faite aucune pub dans les salons commu venez mp @vcs07 pour pub"
    },
    {
        title: "Ghor",
        description: "Pour tout les truc ghor genre: vcam, decapitations ect ect sa evité serieusement :/"
    },
    {
        title: "grabber",
        description: "evité de lacher des liens grabber c'est trop gnt sah"
    },
    {
        title: "Salon",
        description: "juste eviter de parler dans des salon genre #mission pour parle de chose qui n'es pas une demande !"
    }
];


const grid = document.querySelector("#rules-grid");

if (grid) {
    rules.forEach((rule, i) => {
        const card = document.createElement("article");
        card.className = "rule-card";

        const number = document.createElement("span");
        number.className = "rule-number";
        number.textContent = `RÈGLE ${String(i + 1).padStart(2, "0")}`;

        const title = document.createElement("h3");
        title.textContent = rule.title;

        const desc = document.createElement("p");
        desc.textContent = rule.description;

        card.append(number, title, desc);
        grid.appendChild(card);
    });
}
const canvas = document.querySelector("#particles");
const ctx = canvas?.getContext("2d");

let particles = [];
let w = 0;
let h = 0;
let frame;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function resize() {
    if (!canvas || !ctx) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    particles = Array.from(
        { length: Math.min(90, Math.floor(w / 14)) },
        () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 1.5 + 0.4,
            speed: Math.random() * 0.35 + 0.08,
            opacity: Math.random() * 0.5 + 0.15
        })
    );
}

function animate() {
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
        p.y -= p.speed;

        if (p.y < -5) {
            p.y = h + 5;
            p.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 230, 245, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(225, 230, 245, 0.4)";
        ctx.fill();
    });

    ctx.shadowBlur = 0;
    frame = requestAnimationFrame(animate);
}

function start() {
    cancelAnimationFrame(frame);

    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);

    if (!reduceMotion.matches) {
        animate();
    }
}

resize();
start();

window.addEventListener("resize", () => {
    resize();
    start();
});

reduceMotion.addEventListener("change", start);


document.querySelectorAll("[data-copy-target]").forEach(button => {
    button.addEventListener("click", async () => {
        const targetId = button.getAttribute("data-copy-target");
        const target = document.getElementById(targetId);

        if (!target) return;

        const originalText = button.textContent;

        try {
            await navigator.clipboard.writeText(target.textContent.trim());

            button.textContent = "Copié ✓";

            window.setTimeout(() => {
                button.textContent = originalText;
            }, 1800);
        } catch (error) {
            console.error("Impossible de copier cette commande :", error);
            button.textContent = "Copie impossible";

            window.setTimeout(() => {
                button.textContent = originalText;
            }, 1800);
        }
    });
});