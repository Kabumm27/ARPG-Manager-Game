import { Passive } from "."


export class PassivesTree {
    public skills: Passive[];

    public constructor() {
        this.skills = [];

        this.buildTree();
    }

    private buildTree() {
        const int1 = new Passive("int +1");
        const int2 = new Passive("int +1");
        int2.setPrerequisites(int1);
        const int3 = new Passive("int +1");
        int3.setPrerequisites(int2);
        this.skills.push(int1, int2, int3);

        const dex1 = new Passive("dex +1");
        const dex2 = new Passive("dex +1");
        dex2.setPrerequisites(dex1);
        const dex3 = new Passive("dex +1");
        dex3.setPrerequisites(dex2);
        this.skills.push(dex1, dex2, dex3);

        const str1 = new Passive("str +1");
        const str2 = new Passive("str +1");
        str2.setPrerequisites(str1);
        const str3 = new Passive("str +1");
        str3.setPrerequisites(str2);
        this.skills.push(str1, str2, str3);

        const strDex = new Passive("Phys Attack");
        strDex.setPrerequisites(str3, dex3);
        const dexInt = new Passive("Magic Attack");
        strDex.setPrerequisites(dex3, int3);
        const strInt = new Passive("Defense");
        strDex.setPrerequisites(str3, int3);
        this.skills.push(strDex, dexInt, strInt);
    }
}