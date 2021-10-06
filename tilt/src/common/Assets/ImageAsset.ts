/// <reference path="asset.ts" />

namespace Assets {
    export class ImageAsset extends Asset{
        constructor(assetUri:string, tag:string) {
            super(assetUri, tag, AssetTypeEnum.Image );
        }

        createElement(assetLoader:AssetLoader, parentELement:HTMLElement) {
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
}