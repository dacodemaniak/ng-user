import { Subject } from "rxjs";

export interface Popable {
    close: Subject<null>;
}
