//IIFE
(function() {


    let $unsortedNames;

    function generateList(names)
    {
        let tenRandomMascNames = shuffle(names.masculine).slice(0, 10);
        let tenRandomFemNames = shuffle(names.feminine).slice(0,10);
        let twentyRandomNames = shuffle([...tenRandomFemNames, ...tenRandomMascNames]);
        for(let name of twentyRandomNames)
        {
            let $li = document.createElement('li');
            $li.innerText = name;
            $unsortedNames.appendChild($li)
        }

    }

    //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    function shuffle(array) {
        let currentIndex = array.length;
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
            // Pick a remaining element.
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }



    window.addEventListener('load', function () {
        $unsortedNames = document.getElementById('unsortedNames');
        // this json was coerced out of the list of names provided by https://medievalscotland.org/kmo/AnnalsIndex/
        fetch('./json/names.json')
            .then((response)=>{
                return response.json();
            })
            .then(namesJSON=>{
                generateList(namesJSON);
            });

    });
})();