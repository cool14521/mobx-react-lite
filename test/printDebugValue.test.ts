import { $mobx, autorun, observable } from "mobx"
import { printDebugValue } from "../src/printDebugValue"

test("printDebugValue", () => {
    const money = observable({
        euro: 10,
        get pound() {
            return this.euro / 1.15
        }
    })

    const disposer = autorun(() => {
        const { euro, pound } = money
        if (euro === pound) {
            // tslint:disable-next-line: no-console
            console.log("Weird..")
        }
    })

    const refLike = {
        current: (disposer as any)[$mobx]
    }

    expect(printDebugValue(refLike)).toMatchSnapshot()

    disposer()

    expect(printDebugValue(refLike)).toMatchSnapshot()
})
