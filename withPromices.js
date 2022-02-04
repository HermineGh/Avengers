//creating fighters' teams:
const attackers = (() => {
    const names = {
        data: [
            "Jacob",
            "Michael",
            "Ethan",
            "Joshua",
            "Daniel",
            "Alexander",
            "Anthony",
            "William",
            "Christopher",
            "Matthew",
            "Jayden",
            "Andrew",
            "Joseph",
            "David",
            "Noah",
            "Aiden",
            "James",
            "Ryan",
            "Logan",
            "John",
            "Nathan",
            "Elijah",
            "Christian",
            "Gabriel",
            "Benjamin",
            "Jonathan",
            "Tyler",
            "Samuel",
            "Nicholas",
            "Gavin",
            "Dylan",
            "Jackson",
            "Brandon",
            "Caleb",
            "Mason",
            "Angel",
            "Isaac",
            "Evan",
            "Jack",
            "Kevin",
            "Jose",
            "Isaiah",
            "Luke",
            "Landon",
            "Justin",
            "Lucas",
            "Zachary",
            "Jordan",
            "Robert",
            "Aaron"
        ]
    }
    const heroes = [];
    const villains = [];

    const randomName = () => {
        const nameCount = names.data.length;
        const nameIndex = (Math.floor(Math.random() * nameCount));
        return names.data.splice(nameIndex, 1).toString()
    }

    class Fighter {
        constructor(pref) {
            this.name = pref + randomName();
            this.speed = Math.ceil(Math.random() * 5);
            this.health = 100;
            this.power = parseFloat(((Math.random() * 9) + 1).toFixed(2))
        }
    }

    return {
        //  fighters' arrays
        fighters: () => {
            for (let i = 0; i < 10; i++) {
                heroes.push(new Fighter(' (h)'));
                villains.push(new Fighter(' (v)'));
            }
            return { heroes, villains }
        }
    }
})()


const controller = ((fighterObj) => {

    //will show  negative health 
    let dead

    //current fighter attacking someone from another team
    const fight = (curFighter, secondTeam) => {

        //health positive
        dead = false;

        const index = Math.floor(Math.random() * secondTeam.length);
        const injured = secondTeam[index];

        console.log(`${curFighter.name}[${curFighter.health}] hits ${injured.name} with a power ${curFighter.power}`);

        secondTeam[index].health = parseInt(secondTeam[index].health - curFighter.power);

        if (secondTeam[index].health <= 0) {
            //removing - solder dead 
            secondTeam.splice(index, 1);
            dead = true;
        }
        if (dead) console.log(`${injured.name} dies`)
        return
    }

    const startFighting = (teams) => {

        const curTeam = teams.villains, otherTeam = teams.heroes;
        //using Promises for finall console.log result
        return new Promise((resolve, reject) => {
            for (const cur of curTeam) {
                // calling the "fight" function for each element in first array repeatedly by its speed
                const clearFirstInt = setInterval(() => {
                    if (otherTeam.length > 0 && curTeam.length > 0) {
                        if (cur.health > 0) fight(cur, otherTeam)

                    } else {
                        resolve('finished')
                        clearInterval(clearFirstInt);
                    }
                }, 1 / cur.speed * 5000);
            }
            // calling the "fight" function for each element in second array repeatedly by its speed
            for (const curr of otherTeam) {
                const clearSecInt = setInterval(() => {
                    if (otherTeam.length > 0 && curTeam.length > 0) {
                        if (curr.health > 0) fight(curr, curTeam)

                    } else {
                        resolve('finished')
                        clearInterval(clearSecInt);
                    }

                }, 1 / curr.speed * 5000);
            }
        })
    };

    async function finishMessage(obj) {

        await startFighting(obj);

        let winner, winnerArr;
        for (let [key, val] of Object.entries(obj)) {

            if (val.length !== 0) {
                winner = key;
                winnerArr = val;
                break;
            }
        }
        const message = winnerArr.map(cur => `${cur.name}[${cur.health}]`)

        console.log(`--------------------❗ Gave Over ❗--------------------- `)
        console.log(`✨ ${winner.toUpperCase()} WON \n\n[${message.join('  ')} ]`)
    }
    return {
        init: () => {
            const fighterTeams = fighterObj.fighters();
            finishMessage(fighterTeams)
        }
    }
})(attackers)

controller.init()


