import { Character } from "./Character.js";

export class Player extends Character {
    constructor(classType = 'warrior'){
        let baseStats;

        switch(classType){
            case 'warrior':
                baseStats = {
                    name : 'wargod',
                    maxHp : 120,
                    mp : 20,
                    atk : 12,
                    def :5,
                };
                break;
            case 'mage':
                baseStats = {
                    name : 'magicHands',
                    maxHp : 60,
                    mp : 80,
                    atk : 20,
                    def :2,
                };
                break;
            default:
                throw new Error('Unknown clas type');
        }

        super(baseStats);
        this.classType = classType;
    }

    useSkill(target){
        if(this.mp <10){
            return{success:false, message: 'Not enough MP!'};
        }

        this.mp -=10;
        const damage = this.atk *2;
        target.receiveDamage(damage);

        return{
            success: true,
            message: `${this.name} used a skill! ${target.name} took ${damage} damge!`
        };
    }
}
