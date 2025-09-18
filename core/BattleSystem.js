export class BattleSystem {
    constructor(player, monster){
        this.player = player;
        this.monster = monster;
        this.turn = 'player';
        this.logs = [];
    }

    playerAttack(){
        if(this.turn !== 'player'){
            return{ success: false, message: "It's not player's turn."};
        }

        const damage = Math.max(1, this.player.atk - this.monster.def);
        this.monster.receiveDamage(damge);
        this.logs.push(`Player attacked ${this.monster.name} for ${damage} damage.`);
        this.turn = 'monster';
        return { success: true};
    }

    playerUseSkill(){
        if(this.turn !== 'player'){
            return { success: false, message: "It's not player's turn."};
        }

        const skillResult = this.player.useSkill(this.monster);

        if(skillResult.success){
            this.logs.push(skillResult.message);
            this.turn = 'monster';
        }
    }

    monsterAttack(){
        if(this.turn !=='monster'){
            return {success: false, message : "It's not monster's turn."};
        }

        const damage = Math.max(1, this.monster.atk - this.player.def);
        this.player.receiveDamage(damage);
        this.logs.push(`${this.monster.name} attacked Player for ${damage} damage.`);
        this.turn = 'player';
        return {success : true};
    }

    isBattleOver(){
        return !this.player.isAlive() || !this.monster.isAlive();
    }

    getWinner(){
        if(this.player.isAlive() && !this.monster.isAlive()){
            return 'player';
        }else if(!this.player.isAlive() && this.monster.isAlive()){
            return 'monster';
        }
        
        return null;
    }

    getLogs(){
        const currentLogs = [...this.logs];
        this.logs.length = 0;
        return currentLogs;
    }
    
}
