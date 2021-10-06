namespace Assets {

    export enum AssetTypeEnum {
        Image = 1,
        Sound = 2
    }

    export abstract class Asset {
        constructor(protected readonly assetUri:string, protected readonly tag:string, protected readonly type:AssetTypeEnum) {
        }

        abstract createElement(assetLoader:AssetLoader, parentELement:HTMLElement): void;

        get Type():AssetTypeEnum {
            return this.type; 
        }

        get assetTag(): string {
            return this.tag;
        }

        
        
    }
}