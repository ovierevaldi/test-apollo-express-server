export interface UserContext {
    user?: {
        id: string;
        username: string;
        roles: string[];
    };
}