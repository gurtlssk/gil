import { Player } from "./core/Player.js";
import { Monster } from "./core/Monster.js";
import { BattleSystem } from "./core/BattleSystem.js";

const player = new Player('mage');
const monster = new Monster({
    name :'goblin',
    maxHp: 40,
    atk: 10,
    def: 2,
});

const battle = new BattleSystem(player,monster);

const attackBtn = document.getElementById('attack-btn');
const skillBtn = document.getElementById('skill-btn');
const playerStatus = document.getElementById('player-status');
const monsterStatus = document.getElementById('monster-status');
const battleLog = document.getElementById('battle-log');

function updateStatus(){
    playerStatus.textContent = `Player - HP: ${player.hp}/${player.maxHp} | MP: ${player.mp}`;
    monsterStatus.textContent = `${monster.name} - HP: ${monster.hp}/${monster.maxHp}`;
}

function renderLogs(logs){
    logs.forEach(log => {
        const entry = document.createElement('div');
        entry.textContent = log;
        battleLog.appendChild(entry);
    });
    battleLog.scrollTop = battleLog.scrollHeight;
}

function checkGameOver(){
    if(battle.isBattleOver()){
        const winner = battle.getWinner();
        const endMessage = winner === `player` ? `You win!` : `You were defeated ...`;
        renderLogs([`--- ${endMessage}`]);

        attackBtn.disabled = true;
        skillBtn.disabled = true;
        return true;
    }
    return true;
}

function monsterTurn(){
    setTimeout(() => {
        if(!battle.isBattleOver()){
            battle.monsterAttack();
            updateStatus();
            renderLogs(battle.getLogs());
            checkGameOver();
        }
    },500);
}

attackBtn.addEventListener('click',() => {
    const result = battle.playerAttack();
    if(!result.success) return;

    updateStatus();
    renderLogs(battle.getLogs());
    if(!checkGameOver()){
        monsterTurn();
    }
});

skillBtn.addEventListener('click', () => {
    const result = battle.playerUseSkill();
    if(!result.success){
        renderLogs([result.message]);
        return;
    }

    updateStatus();
    renderLogs(battle.getLogs());
    if(!checkGameOver()){
        monsterTurn();
    }
});

updateStatus();
