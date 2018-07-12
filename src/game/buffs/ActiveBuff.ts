import { BaseBuff } from "."


export class ActiveBuff  {
    public buff: BaseBuff;
    
    public duration: number;
    public stacks: number;

    public abilityTimer: number;


    public constructor(buff: BaseBuff) {
        this.buff = buff;
        
        this.duration = buff.duration;
        this.stacks = 1;

        this.abilityTimer = 0;
    }
    
}