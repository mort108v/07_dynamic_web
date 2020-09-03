        let json;
        let valgt;
        let madret;

        const popup = document.querySelector("#popup");
        document.addEventListener("DOMContentLoaded", loadJSON);

        let temp = document.querySelector("template");

        let filter = "alle";
        const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

        async function loadJSON() {
            const respons = await fetch(link);
            json = await respons.json();
            addEventListenerToButtons();
            vis();
        }

        function vis() {

            const templatePointer = document.querySelector("template");
            let listPointer = document.querySelector(".list");

            listPointer.innerHTML = " ";

            //løb igennem array "madret"
            json.feed.entry.forEach(madret => {
                if (filter == "alle" || filter == madret.gsx$kategori.$t.toLowerCase()) {
                    console.log(filter);

                    const klon = temp.cloneNode(true).content;
                    klon.querySelector("h2").textContent = madret.gsx$navn.$t;
                    klon.querySelector(".pris").textContent = madret.gsx$pris.$t + " kr.";
                    klon.querySelector("img").src = "imgs/large/" + madret.gsx$billede.$t + ".jpg";
                    klon.querySelector(".kort").textContent = madret.gsx$kort.$t;

                    klon.querySelector("article").addEventListener("click", () => visDetaljer(madret));

                    listPointer.appendChild(klon);
                }


            })
        }

        document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");

        function visDetaljer(madret) {
            console.log(madret);

            popup.style.display = "block";
            popup.querySelector("h2").textContent = madret.gsx$navn.$t;
            popup.querySelector(".pris").textContent = madret.gsx$pris.$t;
            popup.querySelector("img").src = "imgs/large/" + madret.gsx$billede.$t + ".jpg";
            popup.querySelector(".kategori").textContent = madret.gsx$kategori.$t;
            popup.querySelector(".lang").textContent = madret.gsx$lang.$t;
            popup.querySelector(".oprindelse").textContent = madret.gsx$oprindelse.$t;
        }

        function addEventListenerToButtons() {
            document.querySelectorAll(".filter").forEach((btn) => {
                btn.addEventListener("click", filterBTNs);
            });
        }

        function filterBTNs() {
            filter = this.dataset.kategori;
            document.querySelector("h1").textContent = this.textContent;
            document.querySelectorAll(".filter").forEach((btn) => {
                btn.classList.remove("valgt");
            })
            this.classList.add("valgt");
            vis();
        }

        loadJSON();
