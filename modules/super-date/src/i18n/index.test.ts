import rewire from "rewire"
const index = rewire("./index")
const callback = index.__get__("callback")
// @ponicode
describe("callback", () => {
    test("0", () => {
        let callFunction: any = () => {
            callback()
        }
    
        expect(callFunction).not.toThrow()
    })
})
