import { TalentNode } from "."


export class TalentGraph {
    public centerNode: TalentNode;
    public talents: TalentNode[];
    public links: { source: TalentNode, target: TalentNode }[];

    public constructor() {
        this.talents = [];
        this.links = [];

        this.createGraph();
    }

    private createGraph() {
        // const int1 = new TalentNode("int +1");
        // const int2 = new TalentNode("int +1");
        // int2.setPrerequisites(int1);
        // const int3 = new TalentNode("int +1");
        // int3.setPrerequisites(int2);
        // this.skills.push(int1, int2, int3);

        // const dex1 = new TalentNode("dex +1");
        // const dex2 = new TalentNode("dex +1");
        // dex2.setPrerequisites(dex1);
        // const dex3 = new TalentNode("dex +1");
        // dex3.setPrerequisites(dex2);
        // this.skills.push(dex1, dex2, dex3);

        // const str1 = new TalentNode("str +1");
        // const str2 = new TalentNode("str +1");
        // str2.setPrerequisites(str1);
        // const str3 = new TalentNode("str +1");
        // str3.setPrerequisites(str2);
        // this.skills.push(str1, str2, str3);

        // const strDex = new TalentNode("Phys Attack");
        // strDex.setPrerequisites(str3, dex3);
        // const dexInt = new TalentNode("Magic Attack");
        // strDex.setPrerequisites(dex3, int3);
        // const strInt = new TalentNode("Defense");
        // strDex.setPrerequisites(str3, int3);
        // this.skills.push(strDex, dexInt, strInt);

        const nodeStart = new TalentNode("Start", 0, 0, "big");
        nodeStart.active = true;
        nodeStart.locked = true;
        this.centerNode = nodeStart;

        const nodeUtility1 = new TalentNode("Utility 1", 0, -100, "small");
        const nodeUtility2 = new TalentNode("Utility 2", 0, -200, "small");
        const nodeUtility3 = new TalentNode("Utility 3", 0, -300, "small");
        const nodeUtility4 = new TalentNode("Utility 4", 0, -400, "medium");
        
        const nodeAttack1 = new TalentNode("Attack 1", 0, 100, "small");
        const nodeAttack2 = new TalentNode("Attack 2", 0, 200, "small");
        const nodeAttack3 = new TalentNode("Attack 3", 0, 300, "small");
        const nodeAttack4 = new TalentNode("Attack 4", 0, 400, "medium");
        
        const nodeMagic1 = new TalentNode("Magic 1", -100, 0, "small");
        const nodeMagic2 = new TalentNode("Magic 2", -200, 0, "small");
        const nodeMagic3 = new TalentNode("Magic 3", -300, 0, "small");
        const nodeMagic4 = new TalentNode("Magic 4", -400, 0, "medium");
        
        const nodeSurvivability1 = new TalentNode("Survivability 1", 100, 0, "small");
        const nodeSurvivability2 = new TalentNode("Survivability 2", 200, 0, "small");
        const nodeSurvivability3 = new TalentNode("Survivability 3", 300, 0, "small");
        const nodeSurvivability4 = new TalentNode("Survivability 4", 400, 0, "medium");

        const nodeLinkTest = new TalentNode("Link test", 100, 100, "small");

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

            nodeLinkTest
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

            { source: nodeAttack1, target: nodeLinkTest },
            { source: nodeSurvivability1, target: nodeLinkTest },
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

    public activateNode(id: string) {
        const node = this.getTalentById(id);

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
}
