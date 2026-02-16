import { DomainError } from "src/core/errors/domain-error";

export class ConversationNotFoundError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params: {
        fields: Record<string, string[]>
        }) {
        super({
            code: "CONVERSATION_NOT_FOUND",
            message: "Conversation not found",
            statusCode: 404,
            fields: {},
            details: {}
        });

        this.fields = params.fields;
    }
}