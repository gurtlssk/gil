import { Character } from "./Character.js";

export class Monster extends Character{
    constructor({name, maxHp, atk, def, mp =0}){
        super({name, maxHp, atk, def, mp});
    }
}
