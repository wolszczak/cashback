export class Util {
    static removeCpfMask(cpf: string) {
        return cpf.replace(/[^\d]+/g,'')
    }
}