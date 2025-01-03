import { AuthChecker } from "type-graphql";
import { UserContext } from "../Contexts/user-context";

export const customAuthChecker : AuthChecker<UserContext> = ({ context }, roles) => {
    return roles.some(role => context.user?.roles.includes(role))
}