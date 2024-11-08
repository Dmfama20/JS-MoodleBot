<script>
    document.addEventListener("DOMContentLoaded", function() {

        url = window.location.href;

        //Sind wir nicht in der Review then
        if (!url.includes('quiz/review')) {
            //Button erstellen um Antwort aufzunehmen und diese an die API zu schicken. 
            btn = document.createElement('button');
            btn.innerText = 'Chatbot befragen';
            btn.classList.add("btn", "btn-secondary");

            root = document.querySelector(".submitbtns");
            first = root.firstChild;

            //Bei mehreren Seiten mit Fragen, checken ob als firstChild oder ab Seite 2 als secoundChild
            if (root.childElementCount > 1) {
                root.insertBefore(btn, first.nextSibling);
                btn.style.marginLeft = "6px";
            } else {
                root.insertBefore(btn, first);
            }

            // Fomulare einlesen
            liste = document.querySelectorAll(".formulation");
            if (liste[2].querySelector('textarea').value !== "") {
                liste[2].querySelector('textarea').readOnly = true;
                btn.disabled = true;
                liste[0].querySelector('textarea').readOnly = true;
            }

            // Loading Spinner 
            const loadingSpinner = document.createElement('div');
            loadingSpinner.id = 'loading-spinner';
            loadingSpinner.classList.add('spinner-class');
            document.body.appendChild(loadingSpinner);

            //Loading Spinner CSS
            const cssCode = `
                #loading-spinner {
                display: none;
                border: 7px solid rgba(0, 0, 0, 0.3);
                border-radius: 50%;
                border-top: 7px solid #e2001a;
                width: 60px;
                height: 60px;
                animation: spin 1s linear infinite;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -15px;
                margin-left: -15px;
                } 

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                 }
            `;

            style = document.createElement('style');
            style.textContent = cssCode;
            document.head.appendChild(style);

            //Button eventHandler 
            btn.addEventListener('click', () => {
                //Verhindert den instant reload von der Seite nach click.
                event.preventDefault();
                frage = liste[0].querySelector('textarea').value;
                answBot = myFunction(frage);
            });
        }

        // Funktion für den API-CALL
        function myApiCall(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log('Erfolgreich:', data);
                    return data;
                })
                .catch((error) => {
                    console.error('Fehler:', error);
                });
        };


        async function myFunction(item) {
            //Hier falls nötig den Key ändern ("query")
            datas = {
                "text": item,
                "assistantID": "...."
            };
            try {
                document.getElementById('loading-spinner').style.display = 'block';
                // ApiCall, hier URL ändern.
                resp = await myApiCall('https://<docker_URL>', datas);
                liste[2].querySelector('textarea').value = resp.received_text;
                liste[2].querySelector('textarea').readOnly = true;
                liste[0].querySelector('textarea').readOnly = true;
                liste[1].querySelector('textarea').readOnly = true;
                btn.disabled = true;
            } catch (error) {
                console.error('Fehler:', error);
            } finally {
                document.getElementById('loading-spinner').style.display = 'none';
            }
        }
    });
</script>