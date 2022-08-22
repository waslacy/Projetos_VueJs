const { createApp } = Vue

createApp({
    data() {
        return {
            playerHP: 100,
            monsterHP: 100,
            running: false,
            logs: []
        }
    },

    methods: {
        start(){
            this.running = true
            this.playerHP = 100
            this.monsterHP = 100
            this.logs = []
        },

        attack(especial) {
            this.hurt('playerHP', 7, 12, false, 'Monstro', 'Player', 'monstro')

            if (this.monsterHP > 0) {
                this.hurt('monsterHP', 5, 10, especial, 'Player', 'Monstro', 'player')
            }
        },

        hurt(dest, min, max, especial, source, target, clss){
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[dest] = Math.max(this[dest] - hurt, 0)
            this.registraLog(`${source} atingiu ${target} com ${hurt}%`, clss)
        },

        healAndHurt() {
            const heal = this.getRandom(8, 13)
            this.playerHP = Math.min(this.playerHP + heal, 100)
            this.registraLog(`Player se curou em ${heal}%`, 'player')

            this.hurt('playerHP', 5, 10, false, 'Monstro', 'Player', 'monstro')
        },

        getRandom(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        },

        registraLog(text, clss) {
            this.logs.unshift({ text, clss})
        }
    },

    computed: {
        hasResult() {
            return this.playerHP == 0 || this.monsterHP == 0
        }
    },

    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
}).mount('#app')