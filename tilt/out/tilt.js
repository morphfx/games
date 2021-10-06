var Assets;
(function (Assets) {
    let AssetTypeEnum;
    (function (AssetTypeEnum) {
        AssetTypeEnum[AssetTypeEnum["Image"] = 1] = "Image";
        AssetTypeEnum[AssetTypeEnum["Sound"] = 2] = "Sound";
    })(AssetTypeEnum = Assets.AssetTypeEnum || (Assets.AssetTypeEnum = {}));
    class Asset {
        constructor(assetUri, tag, type) {
            this.assetUri = assetUri;
            this.tag = tag;
            this.type = type;
        }
        get Type() {
            return this.type;
        }
        get assetTag() {
            return this.tag;
        }
    }
    Assets.Asset = Asset;
})(Assets || (Assets = {}));
/// <reference path="common/Assets/asset.ts" />
class TiltApp {
    constructor(targetElement, assetsBase) {
        this.targetElement = targetElement;
        this.assetsBase = assetsBase;
        console.log("Creating TiltApp");
        this.target = document.getElementById(targetElement);
        this.initialise();
    }
    initialise() {
        // preload game assets
        let al = new Assets.AssetLoader(this.target);
        al.Add(new Assets.ImageAsset(this.assetsBase + "0.png", "0"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "1.png", "1"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "2.png", "2"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "3.png", "3"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "4.png", "4"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "5.png", "5"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "6.png", "6"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "7.png", "7"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "8.png", "8"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "9.png", "9"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "circle-01.png", "circle"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "marble.png", "marble"));
        al.Add(new Assets.ImageAsset(this.assetsBase + "tilt.png", "title"));
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
/// <reference path="asset.ts" />
var Assets;
(function (Assets) {
    class ImageAsset extends Assets.Asset {
        constructor(assetUri, tag) {
            super(assetUri, tag, Assets.AssetTypeEnum.Image);
        }
        createElement(assetLoader, parentELement) {
            let elm = document.createElement("img");
            elm.setAttribute("style", "display: hiddens; width: 24px;"); // TODO: hide the element
            elm.src = this.assetUri;
            let self = this;
            elm.addEventListener("load", () => {
                assetLoader.assetLoaded(self);
            });
            elm.addEventListener("error", () => {
                assetLoader.assetLoadError(self);
            });
            parentELement.appendChild(elm);
            return;
        }
    }
    Assets.ImageAsset = ImageAsset;
})(Assets || (Assets = {}));
/// <reference path="asset.ts" />
/*
    Class to handle the pre-loading of assets
*/
var Assets;
(function (Assets) {
    class AssetLoader extends EventTarget {
        constructor(parentElement) {
            super();
            this.parentElement = parentElement;
            this.assets = new Array;
            this.loadedAssets = 0;
            this.onAssetsLoaded = new Event('onAssetsLoaded');
            this.onLoadError = new Event('onLoadError');
            this.progressBar = null;
            this.dialog = null;
        }
        ;
        Add(asset) {
            this.assets.push(asset);
        }
        // start off the loading of all the assets
        Load() {
            //TODO: Create an asset loading dialog with progress bar
            this.dialog = document.createElement('div');
            this.dialog.setAttribute("class", "dlg-background");
            this.parentElement.appendChild(this.dialog);
            let loadDlg = document.createElement('div');
            loadDlg.setAttribute("class", "dlg");
            this.dialog.appendChild(loadDlg);
            let loadDlgMsg = document.createElement('div');
            loadDlgMsg.innerHTML = "Please wait, loading...";
            loadDlg.appendChild(loadDlgMsg);
            let progbarBackground = document.createElement('div');
            progbarBackground.setAttribute("class", "dlg-progress-bar");
            loadDlg.appendChild(progbarBackground);
            this.progressBar = document.createElement('div');
            this.progressBar.setAttribute("class", "dlg-progress");
            progbarBackground.appendChild(this.progressBar);
            // create a hidden div to hold all the assets
            let assetsContainer = document.createElement('div');
            assetsContainer.setAttribute("style", "visibility: hidden;");
            assetsContainer.setAttribute("id", "assetContainer");
            this.parentElement.appendChild(assetsContainer);
            this.assets.forEach((theAsset) => {
                theAsset.createElement(this, assetsContainer);
            });
        }
        assetLoaded(asset) {
            this.loadedAssets++;
            // update the progress bar
            this.progressBar.style.width = ((this.loadedAssets / this.assets.length) * 100) + "%";
            // dispatch asset loaded event
            let onAssetLoadedMsg = {
                asset: asset,
                loadedAssets: this.loadedAssets,
                totalAssets: this.assets.length
            };
            this.dispatchEvent(new CustomEvent('onLoadProgress', { detail: onAssetLoadedMsg }));
            // are all the assets loaded?
            if (this.loadedAssets == this.assets.length) {
                // for ux niceness... users like to see the progress bar hit 100%...
                // wait a short delay then hide the loading dialog and signal
                // loading is complete
                setTimeout(() => {
                    this.dispatchEvent(this.onAssetsLoaded);
                    // remove the loading dialog
                    this.dialog.remove();
                    this.dialog = null;
                    this.progressBar = null;
                }, 500);
            }
        }
        assetLoadError(asset) {
            this.dispatchEvent(this.onLoadError);
        }
    }
    Assets.AssetLoader = AssetLoader;
})(Assets || (Assets = {}));
window.addEventListener("load", () => {
    console.log("Window Load");
    let app = new TiltApp("tiltGame", "../assets/");
});
//# sourceMappingURL=tilt.js.map