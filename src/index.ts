import "reflect-metadata";


const textMetaData = "text";


function first(mod: string = "hello") {

    return function (target: object, key: string, descriptor: PropertyDescriptor) {

        const original: Function = descriptor.value;

        let existingMetaData: number[] = Reflect.getMetadata(textMetaData, target, key)
        console.log("param type: " + Reflect.getMetadata("design:paramtypes", target, key)[0].name)

        descriptor.value = function (...args: any[]) {

            for (const i of existingMetaData) {
                args[i] = mod
            }

            original.apply(this, args)

        }




    }
}



function text() {
    return function (target: Object, key: string | symbol, parameterIndex: number) {

        let existingMetaData: number[] = Reflect.getMetadata(textMetaData, target, key) || []
        existingMetaData.push(parameterIndex)
        Reflect.defineMetadata(textMetaData, existingMetaData, target, key)
    }
}


class A {

    name: string;
    constructor() {
        this.name = "ramesh"
    }

    @first("testing")
    fun(@text() text: string) {
        console.log(text)
    }

}


const a = new A();
a.fun('hi')
