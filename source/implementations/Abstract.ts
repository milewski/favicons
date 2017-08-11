import { GeneratorMetaData } from "../Generator";
import * as Jimp from "jimp";
import * as path from "path";
import { Configuration } from "../interfaces/Configuration";

export abstract class Abstract {

    public icons: Jimp[] = []

    constructor() {}

    /**
     * Get base configuration
     */
    abstract get configuration(): Configuration

    /**
     * @todo write what its doing
     */
    abstract getSource(image: GeneratorMetaData)

    public html() {
        // return this.generator.html()
    }

    public write(destination: string, images: GeneratorMetaData[]): Promise<GeneratorMetaData> {

        const promises = images.map(image => {

            return new Promise((accept, reject) => {

                const filename = path.join(destination, image.name + '.' + image.extension);

                image.source.write(filename, error => {
                    error ? reject(error) : accept(image)
                })

            }) as Promise<GeneratorMetaData>

        })

        return Promise.all(promises).then(images => this.writeManifest(images))

    }

    public untokenizer<A>(tokens: A, replacer): A {

        let stringify = JSON.stringify(tokens)

        for (let property in replacer) {
            stringify = stringify.replace(
                new RegExp('\\[' + property + '\\]', 'g'), replacer[ property ]
            )
        }

        return JSON.parse(stringify)

    }

    private writeManifest(images: GeneratorMetaData[]): any {

        // const destination = path.resolve(this.manifest)
        // const icons = images.map(image => this.getSource(image))
        //
        // fs.writeFileSync(destination, JSON.stringify({ icons }))
        //
        // return Promise.resolve(images[ 0 ])

    }

}
