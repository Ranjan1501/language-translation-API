// https://libretranslate.de/languages

    // GET Language
    async function getLanguage() {
        let res = await fetch(`http://libretranslate.de/languages`)
        let data = await res.json();
        console.log("data:", data);
        appendLanguage(data);   // 1
    }
    getLanguage();
   
    function appendLanguage(language) {
        let langs = document.getElementById("Language");
        language.forEach((lang) => {
            let option = document.createElement("option");
            option.value = lang.code;
            option.text = lang.name;
            langs.append(option);
        });
    }

    function selectLanguage() {
        let val = document.getElementById(`Language`).value;
        localStorage.setItem(`lang`, JSON.stringify(val));
        return val;

    }

    // Post- detect the Selected language
    async function detectLanguage() {
        let data = {
            q: "hello",
            source: "en",
            target: "hi",
        }
        try {
            let res = await fetch('http://libretranslate.de/detect', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let langData = await res.josn();
            console.log("LangData:", langData);
        } catch (e) {
            console.log("e:", e);
        }

    }
    // Post -Add the Translated language

    function getInput() {
        let log = document.getElementById("input");
        return log.value;
    }
    let userinput = getInput();

    async function translate() {
        let res = await fetch(`https://libretranslate.de/translate`, {
            method: "POST",
            body: JSON.stringify({
                q: getInput(),
                source: "en",
                target:selectLanguage(),
            }),
            headers: { "Content-Type": "application/json" },
        });

        let data = await res.json();
        let { translatedText } = data;
        appendres(translatedText);
    }

    function getTranslate() {
        let log = document.getElementById("input")
        translate();
    }

    function appendres(data) {
        let output = document.getElementById("output");
        output.value = data;
    }
