import { Variable } from "@angular/compiler/src/render3/r3_ast";

export class UserModel {
    private id: number;
    private username: string;
    private email: string;
    private password: string;



    public constructor() {
        this.id = 0;
        this.username = '';
        this.email = '';
        this.password = '';
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public deserialize(datas: any): UserModel {
        for (const property in datas) {
            if (this.hasOwnProperty(property)) {
                this[property] = datas[property];
            }
        }
        return this;

        /**
         * Bad way
         */
        Object.assign(this, datas);
    }
}
