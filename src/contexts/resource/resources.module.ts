import { Module } from "@nestjs/common";
import { ResourceGroupeController } from "./resources.controller";

@Module({
    imports: [],
    controllers: [ResourceGroupeController],
    providers: [],
})
export class ResourceModule {}