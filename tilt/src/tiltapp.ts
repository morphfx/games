/// <reference path="common/Assets/asset.ts" />

class TiltApp {

    private readonly target:HTMLElement;
    constructor(private readonly targetElement:string, private readonly assetsBase:string ) {
        console.log("Creating TiltApp");

        this.target = document.getElementById(targetElement);
        this.initialise();

    }

    private initialise() {
        // preload game assets


        let al:Assets.AssetLoader = new Assets.AssetLoader(this.target);
        al.Add(new Assets.ImageAsset(this.assetsBase+"0.png", "0"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"1.png", "1"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"2.png", "2"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"3.png", "3"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"4.png", "4"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"5.png", "5"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"6.png", "6"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"7.png", "7"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"8.png", "8"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"9.png", "9"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"circle-01.png", "circle"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"marble.png", "marble"));
        al.Add(new Assets.ImageAsset(this.assetsBase+"tilt.png", "title"));
        //al.Add(new Assets.ImageAsset(this.assetsBase+"error.png", "error"));

        /*
        al.addEventListener('onLoadProgress', (event:CustomEvent) => {
            let onLoadProgessMsg:Assets.IOnAssetLoad = event.detail as Assets.IOnAssetLoad;
            console.log(onLoadProgessMsg);
        }); 
        */

        al.addEventListener('onLoadError', () => {
            console.log("The asset loader has failed!");
        });

        al.addEventListener('onAssetsLoaded', () => {
            console.log("All assets loaded.... Game On!");
        });

        al.Load();


    }
}