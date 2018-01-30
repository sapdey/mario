(function () {
    let x = prompt("Please enter number of rows?");
    let y = prompt("Please enter number of columns?");

    let container = document.getElementById("container");

    let positionX = 12.5;
    let positionY = 12.5;
    let count = 0;
    let a = [[0, 0]];
    let allDots;

    let character = document.getElementById("character");

    let keyPress = document.addEventListener("keydown", (e) => {
        let c = [];
        if (e.keyCode === 38) {                  //Up

            if (positionY > 50) {
                positionY = positionY - 50
                if (positionY < y * 50) {
                    character.style.top = `${positionY}px`;
                    count++;
                }
            }

        } else if (e.keyCode === 40) {            //Down

            if (positionY < (y - 1) * 50) {
                positionY = positionY + 50
                if (positionY < y * 50) {
                    character.style.top = `${positionY}px`;
                    count++;
                }
            }
        } else if (e.keyCode === 39) {              //Right
            if (positionX < (x - 1) * 50) {
                positionX = positionX + 50
                if (positionX < x * 50) {
                    character.style.left = `${positionX}px`;
                    count++;
                }
            }
        } else if (e.keyCode === 37) {               //left

            if (positionX > 50) {
                positionX = positionX - 50
                if (positionX < x * 50) {
                    character.style.left = `${positionX}px`;
                    count++;
                }
            }
        }

        c.push((positionY - 12.5) / 50);
        c.push((positionX - 12.5) / 50);

        for (let i = 0; i < a.length; i++) {
            if (JSON.stringify(a[i]) === JSON.stringify(c)) {
                a.splice(i, 1);
                for (let j = 0; j < allDots.length; j++) {
                    allDots[j].parentNode.removeChild(allDots[j])
                }
                createPoint();
                if (a.length === 0) {
                    alert(`Total distance travelled = ${count}`);
                }
            }
        }
    }, false);

    createGrid(x, y);
    function createGrid(x, y) {
        for (let i = 0; i < x; i++) {                               //rows
            for (let j = 0; j < y; j++) {                           //columns
                var cell = document.createElement("div");
                container.appendChild(cell);
            };
        };
        container.style.width = `${50 * x}px`;
    };

    let arrayOfPoints = generateCoordinates(x, y);

    function createPoint() {

        for (let i = 0; i < arrayOfPoints.length; i++) {
            let dots = document.createElement("div");
            dots.className = "points";

            let a = arrayOfPoints[i][0];
            let b = arrayOfPoints[i][1];

            dots.style.top = a * 50 + 15 + "px";
            dots.style.left = b * 50 + 15 + "px";
            container.appendChild(dots);
        }
        allDots = document.querySelectorAll(".points");
    }
    createPoint();

    function generateCoordinates(x, y) {
        let points = x > y ? x : y;

        for (var i = 0; a.length < points; i++) {
            let b = [];
            b.push(Math.floor(Math.random() * y));
            b.push(Math.floor(Math.random() * x));

            if (JSON.stringify(a[0]) !== JSON.stringify(b)) {
                a.push(b);
            }
        }
        a.shift();
        
        a = Array.from(new Set(a.map((e) => JSON.stringify(e)))).map(e => JSON.parse(e))
        return a;
    }
})();