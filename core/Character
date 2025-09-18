export class Character {
    constructor({name, maxHp, mp=0, atk = 5, def = 0}){
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.mp = mp;
        this.atk = atk;
        this.def = def;
    }

    isAlive() {
        return this.hp > 0;
    }

    receiveDamage(amount){
        const damage = Math.max(0, amount);
        this.hp = Math.max(0, this.hp - damage);
    }

    heal(amount){
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }
}
