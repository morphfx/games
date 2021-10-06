/// <reference path="asset.ts" />
/*
    Class to handle the pre-loading of assets
*/

namespace Assets {
    export interface IOnAssetLoad {
        asset:Asset,
        loadedAssets:number,
        totalAssets:number
    }

    export class AssetLoader extends EventTarget {

        private assets: Asset[] = new Array;
        private loadedAssets:number = 0;

        private onAssetsLoaded: Event = new Event('onAssetsLoaded');
        private onLoadError: Event = new Event('onLoadError');
        private progressBar:HTMLElement = null;
        private dialog:HTMLElement = null;

        constructor(protected parentElement:HTMLElement) {
            super();
        };


        Add(asset:Asset) {
            this.assets.push(asset);
        }

        // start off the loading of all the assets
        Load() {

            //TODO: Create an asset loading dialog with progress bar
            this.dialog = document.createElement('div');
            this.dialog.setAttribute("class", "dlg-background");
            this.parentElement.appendChild(this.dialog);

            let loadDlg:HTMLElement = document.createElement('div');
            loadDlg.setAttribute("class", "dlg");
            this.dialog.appendChild(loadDlg);

            let loadDlgMsg:HTMLElement = document.createElement('div');
            loadDlgMsg.innerHTML = "Please wait, loading...";
            loadDlg.appendChild(loadDlgMsg);

            let progbarBackground:HTMLElement = document.createElement('div');
            progbarBackground.setAttribute("class", "dlg-progress-bar");
            loadDlg.appendChild(progbarBackground);

            this.progressBar = document.createElement('div');
            this.progressBar.setAttribute("class", "dlg-progress");
            progbarBackground.appendChild(this.progressBar);

            // create a hidden div to hold all the assets
            let assetsContainer:HTMLElement = document.createElement('div');
            assetsContainer.setAttribute("style", "visibility: hidden;");
            assetsContainer.setAttribute("id", "assetContainer");
            this.parentElement.appendChild(assetsContainer);

            this.assets.forEach( (theAsset) => {
                theAsset.createElement(this, assetsContainer);
            });
        }

        assetLoaded(asset:Asset) {
            this.loadedAssets++;

            // update the progress bar
            this.progressBar.style.width = ((this.loadedAssets/this.assets.length)*100)+"%";

            // dispatch asset loaded event
            let onAssetLoadedMsg:IOnAssetLoad = {
                asset: asset,
                loadedAssets: this.loadedAssets,
                totalAssets: this.assets.length
            }
            this.dispatchEvent( new CustomEvent('onLoadProgress', { detail: onAssetLoadedMsg } ));

            // are all the assets loaded?
            if(this.loadedAssets==this.assets.length) {

                // for ux niceness... users like to see the progress bar hit 100%...
                // wait a short delay then hide the loading dialog and signal
                // loading is complete
                setTimeout(()=> {
                    this.dispatchEvent(this.onAssetsLoaded);

                    // remove the loading dialog
                    this.dialog.remove();
                    this.dialog = null;
                    this.progressBar = null;
                }, 500);

                
            }
        }

        assetLoadError(asset:Asset) {
            this.dispatchEvent(this.onLoadError)
        }
    } 
}