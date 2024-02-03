document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("submitButton").addEventListener("click", async function () {

        const result = document.getElementById("result");
        result.innerHTML = "";

        const word = document.getElementById("word").value
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

        try {

            const res = await fetch(url)
            const wordData = await res.json()

            const wordValidation = word.trim()
            const alphabetsPattern = /^[a-zA-Z]+$/;

            // Check if the word matches the alphabets pattern
            if (!alphabetsPattern.test(word)) {
                console.log("Invalid word. Please enter alphabets only.");
                const errorMessage = "Invalid word. Please enter alphabets only."

                const errorRes = document.getElementById("result")
                const errDivs = document.createElement("div")
                errDivs.innerHTML = errorMessage
                errDivs.style.color = "red"
                errDivs.style.backgroundColor = "wheat"
                errorRes.appendChild(errDivs)

            }
            else if (Array.isArray(wordData) && wordData.length > 0 && wordData[0].meanings) {

                for (let i = 0; i < 1; i++) {
                    const result = document.getElementById("result")
                    const meanings = wordData[i].meanings
                    count = 0;
                    for (let i = 0; i < meanings.length; i++) {
                        const partOfSpeech = meanings[i].partOfSpeech;
                        const definitions = meanings[i].definitions;

                        const meaningDiv = document.createElement("div")
                        meaningDiv.setAttribute("class", "meaning")
                        const posDiv = document.createElement("div")
                        posDiv.style.margin = "1%"
                        posDiv.innerText = "Part of speech: " + partOfSpeech
                        meaningDiv.appendChild(posDiv)
                        result.appendChild(meaningDiv)

                        for (let i = 0; i < 1; i++) {
                            const definition = definitions[i].definition

                            const defDiv = document.createElement("div")
                            defDiv.style.margin = "1%"
                            defDiv.innerText = "Definition: " + definition
                            meaningDiv.appendChild(defDiv)
                            result.appendChild(meaningDiv)
                        }

                        count++
                        if (count === 3) {
                            break
                        }
                    }
                };

            }
            else {
                const errorMessage = "No meanings found for this word.";
                console.error(errorMessage)

                const errorRes = document.getElementById("result")
                const errDivs = document.createElement("div")
                errDivs.innerHTML = errorMessage
                errDivs.style.color = "red"
                errDivs.style.backgroundColor = "wheat"
                errorRes.appendChild(errDivs)
            }

        }
        catch (error) {
            console.error("Error fetching word data:", error);
        }

    })

})