import { DomainError } from "src/core/errors/domain-error";

export class MessageNotFoundError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params?: { fields: Record<string, string[]> }) {
        super({
            code: "MESSAGE_NOT_FOUND",
            message: "Message not found",
            statusCode: 404,
            fields: {},
            details: {}
        });

        this.fields = params?.fields || {};
    }
}

export class MessageUnauthorizedError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params?: { fields: Record<string, string[]> }) {
        super({
            code: "MESSAGE_UNAUTHORIZED",
            message: "Unauthorized to access this message",
            statusCode: 403,
            fields: {},
            details: {}
        });

        this.fields = params?.fields || {};
    }
}  

export class ConversationNotFoundError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params?: { fields: Record<string, string[]> }) {
        super({
            code: "CONVERSATION_NOT_FOUND",
            message: "Conversation not found",
            statusCode: 404,
            fields: {},
            details: {}
        });

        this.fields = params?.fields || {};
    }
}

export class MessageError extends DomainError{
    public readonly fields: Record<string, string[]>;
    public readonly details: Record<string, any>;
    constructor(params?: { fields: Record<string, string[]>, details?: Record<string, any> }) {
        super({
            code: "MESSAGE_ERROR",
            message: "Error creating message",
            statusCode: 400,
            fields: {},
            details: {}
        });

        this.fields = params?.fields || {};
        this.details = params?.details || {};
    }
}