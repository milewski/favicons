import * as Jimp from 'jimp';
import { Abstract } from "./implementations/Abstract";
import { Icon } from "./interfaces/Configuration";
import * as toIco from 'to-ico';
import * as path from "path";
import * as fs from "fs";

export interface GeneratorMetaData {
    width: number
    height: number
    mime: string
    extension: string
    name: string
    source: Jimp
    buffer: Promise<Buffer>
}

export class Generator {

    private cache: { [key: string]: GeneratorMetaData } = {}
    private platforms: Abstract[]

    constructor(private source: string | Jimp, platforms: (new () => Abstract)[]) {
        this.platforms = platforms.map(platform => new platform())
    }

    html(): string[] {

        let html = []

        for (let property in this.cache) {
            const { name, width, height } = this.cache[ property ]
            html.push(
                `<link rel="icon" sizes="${width}x${height}" href="${name}">`
            )
        }

        return html

    }

    public getData(): Promise<any> {

        const promises = [] as Promise<GeneratorMetaData>[]

        this.platforms.forEach(platform => {
            promises.push(...platform.configuration.icons.map(icon => {
                return this.generate(icon)
            }))
        })

        return Promise.all(promises).then(icons => {
            return this.write(...icons).then(buffers => {
                console.log(buffers)
            })
        })

    }

    private generate(options: Icon): Promise<GeneratorMetaData> {

        /**
         * If source haven't been read yet, read it
         */
        if (typeof this.source === 'string') {

            return Jimp.read(this.source)
                .then(image => this.source = image)
                .then(() => this.generate(options))

        }

        let width, height

        /**
         * Accept format as '128x128' or 128 or [128]
         */
        if (typeof options.size === 'string') {

            [ width, height ] = options.size.split('x').map(n => parseInt(n))

        } else if (Array.isArray(options.size)) {
            //todo
        } else {
            width = height = options.size
        }

        const cacheKey = width + 'x' + height

        if (this.cache[ cacheKey ]) {
            return Promise.resolve(this.cache[ cacheKey ])
        }

        const source = this.source.clone().resize(width, height)
        const mime = options.mime || source.getMIME()
        const buffer = this.getBuffer(mime, source)
        const [ name, extension ] = options.name.split('.')

        return Promise.resolve(
            this.cache[ cacheKey ] = { name, width, height, mime, extension, source, buffer }
        )

    }

    private write(...icons: GeneratorMetaData[]): Promise<Buffer> {

        const promises = icons.map(icon => {

            const location = path.resolve('test/temp', icon.name + '.' + icon.extension)

            return icon.buffer.then(buffer => {
                fs.writeFileSync(location, buffer)
            })

        })

        return Promise.all(promises) as any

    }

    private getBuffer(mime: string, source: Jimp): Promise<Buffer> {

        if (mime === 'image/x-icon') {
            return this
                .getBuffer('image/png', source)
                .then(buffer => toIco(buffer, {
                    resize: true,
                    sizes: [ 16 ] //@todo
                }))
        }

        return new Promise((accept, reject) => {
            source.getBuffer(mime, (error, buffer: Buffer) => {
                error ? reject(error) : accept(buffer)
            })
        })

    }

}
