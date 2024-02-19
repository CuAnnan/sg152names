//IIFE
(function() {

    let names = {
        feminine:[],
        masculine:[]
    };

    let $unsortedNames;

    async function getFeminineNames() {
        return fetch('/feminine.html')
            .then(response => {
                return response.text();
            }).then(html => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var table = doc.querySelector('table');
                let rows = table.getElementsByTagName('tr');
                for (let row of rows)
                {
                    let link = row.querySelector('td > a');
                    if (link)
                    {
                        addName('feminine', link.innerText);
                    }
                }
                console.log("resolved fem");
            });
    }

    function addName(list, name)
    {
        if(name.indexOf('/') >= 0)
        {
            let variants = name.split('/');
            for(let variant of variants)
            {
                names[list].push(variant.trim());
            }
        }
        else if(name.indexOf(',') >= 0)
        {
            let variants = name.split(',');
            for(let variant of variants)
            {
                names[list].push(variant.trim());
            }
        }
        else
        {
            names[list].push(name.trim());
        }
    }

    async function getMasculineNames()
    {
        return fetch('/masculine.html')
            .then(response=>{
                return response.text();
            })
            .then(html=>{
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var list = doc.querySelector('ul');
                var lis = list.getElementsByTagName('li');
                for(let li of lis)
                {
                    let link = li.querySelector('a');
                    if(link)
                    {
                        let name = link.innerText;
                        addName("masculine", name);
                    }
                }
                console.log("resolved masc");
            });

    }

    function generateList()
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
        Promise.all([
            getFeminineNames(),
            getMasculineNames()
        ]).then(()=>{
            generateList()
        });

    });
})();