import { TalentNode } from "."
import { ModifierStats, ModifierType } from "../stats";
import { Entity, EntityBaseStats } from "../entities";


export class TalentGraph {
    private entity: Entity;

    public centerNode: TalentNode;
    public talents: TalentNode[];
    public links: { source: TalentNode, target: TalentNode }[];
    
    public cachedModifierStats: ModifierStats;

    public talentCounter: number;
    public talentMax: number;
    

    public constructor(entity: Entity) {
        this.entity = entity;

        this.talents = [];
        this.links = [];

        this.cachedModifierStats = new ModifierStats();

        this.talentCounter = 0;
        this.talentMax = 1;

        this.createGraph();
    }

    private createGraph() {
        const nodeStart = new TalentNode("Start", 0, 0, "big");
        nodeStart.stats.setModifier(ModifierType.Health, 20, 0, 0);
        nodeStart.active = true;
        nodeStart.locked = true;
        this.centerNode = nodeStart;

        const nodeUtility1 = new TalentNode("Utility 1", 0, -100, "small");
        nodeUtility1.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.1);
        const nodeUtility2 = new TalentNode("Utility 2", 0, -200, "small");
        nodeUtility2.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.1);
        const nodeUtility3 = new TalentNode("Utility 3", 0, -300, "small");
        nodeUtility3.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.1);
        const nodeUtility4 = new TalentNode("Utility 4", 0, -400, "medium");
        nodeUtility4.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.2);
        
        const nodeAttack1 = new TalentNode("Attack 1", 0, 100, "small");
        nodeAttack1.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.1);
        const nodeAttack2 = new TalentNode("Attack 2", 0, 200, "small");
        nodeAttack2.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.1);
        const nodeAttack3 = new TalentNode("Attack 3", 0, 300, "small");
        nodeAttack3.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.1);
        const nodeAttack4 = new TalentNode("Attack 4", 0, 400, "medium");
        nodeAttack4.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.2);
        
        const nodeMagic1 = new TalentNode("Magic 1", -100, 0, "small");
        nodeMagic1.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.1);
        const nodeMagic2 = new TalentNode("Magic 2", -200, 0, "small");
        nodeMagic2.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.1);
        const nodeMagic3 = new TalentNode("Magic 3", -300, 0, "small");
        nodeMagic3.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.1);
        const nodeMagic4 = new TalentNode("Magic 4", -400, 0, "medium");
        nodeMagic4.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.2);
        
        const nodeSurvivability1 = new TalentNode("Survivability 1", 100, 0, "small");
        nodeSurvivability1.stats.setModifier(ModifierType.Health, 0, 0, 0.1);
        const nodeSurvivability2 = new TalentNode("Survivability 2", 200, 0, "small");
        nodeSurvivability2.stats.setModifier(ModifierType.Health, 0, 0, 0.1);
        const nodeSurvivability3 = new TalentNode("Survivability 3", 300, 0, "small");
        nodeSurvivability3.stats.setModifier(ModifierType.Health, 0, 0, 0.1);
        const nodeSurvivability4 = new TalentNode("Survivability 4", 400, 0, "medium");
        nodeSurvivability4.stats.setModifier(ModifierType.Health, 0, 0, 0.2);

        const nodeMagicAttack1 = new TalentNode("Magic Attack Bridge 1", -400, 200);
        nodeMagicAttack1.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.05);
        nodeMagicAttack1.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.05);
        const nodeMagicAttack2 = new TalentNode("Magic Attack Bridge 2", -400, 400, "medium");
        nodeMagicAttack2.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.1);
        nodeMagicAttack2.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.1);
        const nodeMagicAttack3 = new TalentNode("Magic Attack Bridge 3", -200, 400);
        nodeMagicAttack3.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.05);
        nodeMagicAttack3.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.05);

        const nodeMagicUtility1 = new TalentNode("Magic Utility Bridge 1", -400, -200);
        nodeMagicUtility1.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.05);
        nodeMagicUtility1.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.05);
        const nodeMagicUtility2 = new TalentNode("Magic Utility Bridge 2", -400, -400, "medium");
        nodeMagicUtility2.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.1);
        nodeMagicUtility2.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.1);
        const nodeMagicUtility3 = new TalentNode("Magic Utility Bridge 3", -200, -400);
        nodeMagicUtility3.stats.setModifier(ModifierType.FireDmg, 0, 0, 0.05);
        nodeMagicUtility3.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.05);

        const nodeAttackSurvivability1 = new TalentNode("Survivability Attack Bridge 1", 400, 200);
        nodeAttackSurvivability1.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.05);
        nodeAttackSurvivability1.stats.setModifier(ModifierType.Health, 0, 0, 0.05);
        const nodeAttackSurvivability2 = new TalentNode("Survivability Attack Bridge 2", 400, 400, "medium");
        nodeAttackSurvivability2.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.1);
        nodeAttackSurvivability2.stats.setModifier(ModifierType.Health, 0, 0, 0.1);
        const nodeAttackSurvivability3 = new TalentNode("Survivability Attack Bridge 3", 200, 400);
        nodeAttackSurvivability3.stats.setModifier(ModifierType.PhysDmg, 0, 0, 0.05);
        nodeAttackSurvivability3.stats.setModifier(ModifierType.Health, 0, 0, 0.05);

        const nodeUtilitySurvivability1 = new TalentNode("Utility Survivability Bridge 1", 400, -200);
        nodeUtilitySurvivability1.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.05);
        nodeUtilitySurvivability1.stats.setModifier(ModifierType.Health, 0, 0, 0.05);
        const nodeUtilitySurvivability2 = new TalentNode("Utility Survivability Bridge 2", 400, -400, "medium");
        nodeUtilitySurvivability2.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.1);
        nodeUtilitySurvivability2.stats.setModifier(ModifierType.Health, 0, 0, 0.1);
        const nodeUtilitySurvivability3 = new TalentNode("Utility Survivability Bridge 3", 200, -400);
        nodeUtilitySurvivability3.stats.setModifier(ModifierType.MovementSpeed, 0, 0, 0.05);
        nodeUtilitySurvivability3.stats.setModifier(ModifierType.Health, 0, 0, 0.05);


        this.talents = this.talents.concat([
            nodeStart,

            nodeUtility1,
            nodeUtility2,
            nodeUtility3,
            nodeUtility4,
            
            nodeAttack1,
            nodeAttack2,
            nodeAttack3,
            nodeAttack4,
            
            nodeMagic1,
            nodeMagic2,
            nodeMagic3,
            nodeMagic4,
            
            nodeSurvivability1,
            nodeSurvivability2,
            nodeSurvivability3,
            nodeSurvivability4,

            nodeMagicAttack1,
            nodeMagicAttack2,
            nodeMagicAttack3,

            nodeMagicUtility1,
            nodeMagicUtility2,
            nodeMagicUtility3,

            nodeAttackSurvivability1,
            nodeAttackSurvivability2,
            nodeAttackSurvivability3,

            nodeUtilitySurvivability1,
            nodeUtilitySurvivability2,
            nodeUtilitySurvivability3
        ]);

        this.links = this.links.concat([
            { source: nodeStart, target: nodeAttack1},
            { source: nodeStart, target: nodeUtility1},
            { source: nodeStart, target: nodeMagic1},
            { source: nodeStart, target: nodeSurvivability1},
            
            { source: nodeAttack1, target: nodeAttack2},
            { source: nodeUtility1, target: nodeUtility2},
            { source: nodeMagic1, target: nodeMagic2},
            { source: nodeSurvivability1, target: nodeSurvivability2},
            
            { source: nodeAttack2, target: nodeAttack3},
            { source: nodeUtility2, target: nodeUtility3},
            { source: nodeMagic2, target: nodeMagic3},
            { source: nodeSurvivability2, target: nodeSurvivability3},
            
            { source: nodeAttack3, target: nodeAttack4},
            { source: nodeUtility3, target: nodeUtility4},
            { source: nodeMagic3, target: nodeMagic4},
            { source: nodeSurvivability3, target: nodeSurvivability4},

            { source: nodeMagic4, target: nodeMagicAttack1 },
            { source: nodeMagicAttack1, target: nodeMagicAttack2 },
            { source: nodeMagicAttack3, target: nodeMagicAttack2 },
            { source: nodeAttack4, target: nodeMagicAttack3 },

            { source: nodeMagic4, target: nodeMagicUtility1 },
            { source: nodeMagicUtility1, target: nodeMagicUtility2 },
            { source: nodeMagicUtility3, target: nodeMagicUtility2 },
            { source: nodeUtility4, target: nodeMagicUtility3 },

            { source: nodeSurvivability4, target: nodeUtilitySurvivability1 },
            { source: nodeUtilitySurvivability1, target: nodeUtilitySurvivability2 },
            { source: nodeUtilitySurvivability3, target: nodeUtilitySurvivability2 },
            { source: nodeUtility4, target: nodeUtilitySurvivability3 },

            { source: nodeSurvivability4, target: nodeAttackSurvivability1 },
            { source: nodeAttackSurvivability1, target: nodeAttackSurvivability2 },
            { source: nodeAttackSurvivability3, target: nodeAttackSurvivability2 },
            { source: nodeAttack4, target: nodeAttackSurvivability3 },
        ]);
    }

    public getTalentById(id: string) {
        for (const talent of this.talents) {
            if (talent.id === id) {
                return talent;
            }
        }

        return null;
    }

    public recalculateStats() {
        const talentStats = this.talents
            .filter(node=>node.active)
            .map(node=>node.stats)

        this.cachedModifierStats = ModifierStats.merge(talentStats);

        this.entity.recalculateStats();
    }

    public activateNode(id: string) {
        const node = this.getTalentById(id);

        if (this.talentCounter >= this.talentMax) {
            // console.log("No points available");
            return false;
        }

        if (node.active) {
            // console.log("Already active");
            return false;
        }

        const neighbours = this.links
            .filter(({source, target}) => source === node || target === node)
            .map(({source, target}) => source === node ? target : source);

        const hasActiveNeighbour = neighbours.some(node => node.active);

        if (!hasActiveNeighbour) {
            console.log("No active neighbour");
            return false;
        }

        node.active = true;
        this.talentCounter++;
        this.recalculateStats();

        return true;
    }

    public deactivateNode(id: string) {
        const node = this.getTalentById(id);

        if (!node.active) {
            // console.log("Already active");
            return false;
        }

        if (node.locked) {
            // console.log("Node is locked");
            return false;
        }

        const neighbours = this.links
            .filter(({source, target}) => source === node || target === node)
            .map(({source, target}) => source === node ? target : source)
            .filter(node => node.active);

        if (neighbours.length >= 2) {
            for (const neighbour of neighbours) {
                if (!this.checkForValidPath(neighbour, [node])) {
                    return false;
                }
            }
        }

        node.active = false;
        this.talentCounter--;
        this.recalculateStats();

        return true;
    }

    public checkForValidPath(targetNode: TalentNode, ignore?: TalentNode[]) {
        if (targetNode === this.centerNode) return true;

        const edges = this.links.filter(({source, target}) => source.active && target.active && ignore.indexOf(source) < 0 && ignore.indexOf(target) < 0);

        // BFS Algorithm
        const queue = [this.centerNode];
        const visited = new Array<TalentNode>();
        while (queue.length > 0) {
            const current = queue.shift();
            const neighbours = edges
                .filter(({source, target}) => source === current || target === current)
                .map(({source, target}) => source === current ? target : source)
                .filter(node => visited.indexOf(node) < 0);
            
            if (neighbours.indexOf(targetNode) >= 0) return true;

            queue.push(...neighbours);
            visited.push(current);
        }

        return false;
    }

    public onLevelUp(level: number) {
        this.talentMax++;
    }
}
