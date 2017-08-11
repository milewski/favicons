import { OptionsInterface } from "./interfaces/OptionsInterface";
import { Android } from "./implementations/Android";
import { Generator } from "./Generator";
import * as fs from "fs";

export class Favicon {

    generate(options: OptionsInterface): Promise<any> {

        /**
         * Add All Supported Implementations
         */
        const generator = new Generator(options.source, [
            Android
        ]);

        return generator.getData()

    }

    private generateManifest(images) {

        const icons = images.map(image => {
            return {
                "src": image.destination,
                "sizes": image.width + 'x' + image.height,
                "type": image.type
            }
        })

        fs.writeFileSync('test/temp/manifest.json', JSON.stringify({ icons }))

    }

}
