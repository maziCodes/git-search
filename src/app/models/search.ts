import { User } from "./user";

export interface Search {
    incomplete_results: boolean
    items: Array<User>
    total_count: number
}