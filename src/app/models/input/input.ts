export class Input {
    name: string
    label: string
    type: string
    placeholder: string
    info: string

    constructor(name: string, label:string, type: string, placeholder: string, info: string) {
        this.name = name
        this.label = label
        this.type = type
        this.placeholder = placeholder
        this.info = info
    }
}
