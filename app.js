function getRandomValue(min, max) {
//formula for calculating a random num between 5 and 12
return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({

data(){
    return{
        playerHealth: 100,
        monsterHealth: 100,
        currentRound: 0,
        winner: null,
        logMessages: []

    };
},

watch:{
    playerHealth(val){
    if (val <= 0 && this.monsterHealth <= 0){
    //A draw
    this.winner = 'draw'
    }else if (val <=0){
    //player lost 
    this.winner = 'monster'
    }
    },

    monsterHealth(val){
     if (val <= 0 && this.playerHealth <= 0){
        //A draw
        this.winner='draw'
        }else if (val <= 0){
        this.winner ='player'
         //monster lost
     }
    }

},

computed:{
    monsterBarStyle(){
        if (this.monsterHealth <0){
            return {width: '0%'}
        }
        return{width: this.monsterHealth + '%'};

    },

    playerBarStyle(){
        if (this.playerHealth <0){
            return {width: '0%'}
        }
        return{width: this.playerHealth + '%'};
    },

    enableSpecialAttack(){
        return this.currentRound % 3 !==0
    }

},
methods:{
    startGame(){
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.winner = null;
        this.currentRound = 0;
        this.logMessages= []
    },

    attackMonster(){
      this.currentRound++;
    const attackValue = getRandomValue (12, 5)
    this.monsterHealth -= attackValue;
    this.attackPlayer();
    this.addLogMessages('player', 'attack', attackValue);
    },

    attackPlayer(){
    const attackValue = getRandomValue(15, 8)
    this.playerHealth -= attackValue;
    this.addLogMessages('monster', 'attack', attackValue);
    },

    specialAttackMonster(){
        this.currentRound++;
        const attackValue = getRandomValue(10, 25)
        this.monsterHealth -= attackValue;
        this.attackPlayer();
        this.addLogMessages('player', 'attack', attackValue);
    },

    healPlayer(){
        this.currentRound++;
        const healValue = getRandomValue(8, 20)
        if(this.playerHealth + healValue > 100){
            this.playerHealth = 100;
        }else{
         this.playerHealth += healValue;
        }
        this.attackPlayer();
        this.addLogMessages('player', 'heals', healValue);

   
    },

    surrender(){
        this.winner = 'monster';
    },

    addLogMessages(who, what, value){
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        })
    }
}



}).mount('#game')