import { Favicon } from "../source/Favicon";
import * as path from "path";

describe('Tests', () => {

    // beforeEach(() => cleanUp())
    // after(() => cleanUp())

    it('demo api', (done) => {

        const favicon = new Favicon()

        favicon.generate({
            source: path.resolve(__dirname, 'fixtures/icon.png'),
            destination: 'test/temp',
        }).then(icons => {
            console.log(icons)
            done()
        })

    })

})
