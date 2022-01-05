export class Input {
    private name: string
    private label: string
    private type: string
    private placeholder: string
    private info: string
    private required: boolean
    private error: boolean

    constructor(name: string, label:string, type: string, placeholder: string, required: boolean, error: boolean, info?: string) {
        this.name = name
        this.label = label
        this.type = type
        this.placeholder = placeholder
        this.info = info || ""
        this.required = required
        this.error = error
    }

    public getNameValue(): string {
        return this.name
    }

    public getLabelValue(): string {
        return this.label
    }

    public getTypeValue(): string {
        return this.type
    }

    public getPlaceholderValue(): string {
        return this.placeholder
    }

    public getInfoValue(): string {
        return this.info
    }

    public setInfoValue(info: string) {
        this.info = info
    }

    public getRequiredValue(): boolean {
        return this.required
    }

    public getErrorValue(): boolean {
        return this.error
    }

    public setErrorValue(error: boolean): void {
        this.error = error
    }
}
