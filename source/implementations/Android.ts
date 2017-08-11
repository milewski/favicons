import { Abstract } from "./Abstract";
import { GeneratorMetaData } from "../Generator";
import { Configuration } from "../interfaces/Configuration";

export class Android extends Abstract {

    get configuration(): Configuration {
        return require('../configurations/google.json')
    }

    getSource(image: GeneratorMetaData) {
        return this.untokenizer(
            { src: '[name]', sizes: '[width]x[height]', type: '[mime]' }, image
        )
    }

}
