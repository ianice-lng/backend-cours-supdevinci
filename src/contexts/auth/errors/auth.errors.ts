import { DomainError } from "src/core/errors/domain-error";

export class PlayerNotFoundError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params: {
        fields: Record<string, string[]>
        }) {
        super({
            code: "PLAYER_NOT_FOUND",
            message: "Player not found",
            statusCode: 404,
            fields: {},
            details: {}
        });

        this.fields = params.fields;
    }
}

export class EmailAlreadyInUseError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params: {
        fields: Record<string, string[]>
        }) {
        super({
            code: "EMAIL_ALREADY_IN_USE",
            message: "Email already in use",
            statusCode: 400,
            fields: {},
            details: {}
        });

        this.fields = params.fields;
    }
}

export class InvalidCredentialsError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params: {
        fields: Record<string, string[]>
        }) {
        super({
            code: "INVALID_CREDENTIALS",
            message: "Invalid credentials",
            statusCode: 401,
            fields: {},
            details: {}
        });

        this.fields = params.fields;
    }
}

export class InvalidPasswordError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params: {
        fields: Record<string, string[]>
        }) {
        super({
            code: "INVALID_PASSWORD",
            message: "Invalid password",
            statusCode: 400,
            fields: {},
            details: {}
        });

        this.fields = params.fields;
    }
}