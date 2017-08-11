import { Abstract } from "./Abstract";
import { GeneratorMetaData } from "../Generator";
import { Configuration } from "../interfaces/Configuration";

export class Browser extends Abstract {

    get configuration(): Configuration {
        return require('../configurations/browser.json')
    }

    get manifest() { return 'manifest.json' }

    get sizes() {
        return []
    }

    getSource(image: GeneratorMetaData) {
        return this.untokenizer(
            { src: '[name]', sizes: '[width]x[height]', type: '[mime]' }, image
        )
    }

}
