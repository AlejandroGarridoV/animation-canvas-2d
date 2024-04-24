const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// Hace que el canvas sea del tamaño de la ventana
canvas.height = window_height;
canvas.width = window_width;

canvas.style.backgroundColor = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posx = x;
        this.posy = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posx, this.posy)
        context.lineWidth = 5;
        context.arc(this.posx, this.posy, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        // Actualiza la posición del círculo
        this.posx += this.dx;
        this.posy += this.dy;
        
        // Si el círculo choca con el borde derecho o izquierdo, invierte la dirección horizontal
        if ((this.posx + this.radius) > window_width || (this.posx - this.radius) < 0) {
            this.dx = -this.dx;
        }
        
        // Si el círculo choca con el borde superior o inferior, invierte la dirección vertical
        if ((this.posy + this.radius) > window_height || (this.posy - this.radius) < 0) {
            this.dy = -this.dy;
        }
        
        // Limita la posición del círculo para que no quede fuera de los límites de la ventana
        this.posx = Math.max(this.radius, Math.min(this.posx, window_width - this.radius));
        this.posy = Math.max(this.radius, Math.min(this.posy, window_height - this.radius));
        
        // Dibuja el círculo en su nueva posición
        this.draw(context);
    }
    
}

let arrayCircle = [];

// Crea y almacena n círculos en el arreglo
const n = 10;
for (let i = 0; i < n; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 30);
    let myCircle = new Circle(randomX, randomY, randomRadius, "blue", i + 1, 3);
    // Agrega el objeto al arreglo
    arrayCircle.push(myCircle);
}

// Función para actualizar y animar los círculos
let updateCircles = function () {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height); // Limpia el canvas en cada frame
    
    // Itera sobre el arreglo de círculos y los actualiza
    for (let i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update(ctx);
    }
}

updateCircles(); // Inicia la animación de los círculos
