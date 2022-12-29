import "reflect-metadata";


const textMetaData = "text";


// method decorator
function first(mod: string = "hello") {

    return function (target: object, key: string, descriptor: PropertyDescriptor) {

        const original: Function = descriptor.value;

        // read metadata
        let existingMetaData: number[] = Reflect.getMetadata(textMetaData, target, key)

        console.log("param type: " + Reflect.getMetadata("design:paramtypes", target, key)[0].name)

        // wrapper for original method
        descriptor.value = function (...args: any[]) {

            for (const i of existingMetaData) {
                args[i] = mod
            }

            original.apply(this, args)

        }




    }
}


// param decorator
function text() {
    return function (target: Object, key: string | symbol, parameterIndex: number) {

        // get metadata
        let existingMetaData: number[] = Reflect.getMetadata(textMetaData, target, key) || []
        existingMetaData.push(parameterIndex)
        // add metadata
        Reflect.defineMetadata(textMetaData, existingMetaData, target, key)
    }
}


class A {

    name: string;
    constructor(name: string) {
        this.name = name
    }

    @first("testing")
    fun(@text() text: string) {
        console.log(text)
    }

}


const a = new A("ramesh");
a.fun('hi')
