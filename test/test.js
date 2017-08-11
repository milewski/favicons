"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Favicon_1 = require("../source/Favicon");
const path = require("path");
describe('Tests', () => {
    // beforeEach(() => cleanUp())
    // after(() => cleanUp())
    it('demo api', (done) => {
        const favicon = new Favicon_1.Favicon();
        favicon.generate({
            source: path.resolve(__dirname, 'fixtures/icon.png'),
            destination: 'test/temp',
        }).then(icons => {
            console.log(icons);
            done();
        });
    });
});
//# sourceMappingURL=test.js.map