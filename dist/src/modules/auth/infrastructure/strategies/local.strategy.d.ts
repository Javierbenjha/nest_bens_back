import { Strategy } from 'passport-local';
import { AuthService } from '../../application/auth.service';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(correo: string, pass: string): Promise<import("../../domain/auth.entity").AuthUser>;
}
export {};
