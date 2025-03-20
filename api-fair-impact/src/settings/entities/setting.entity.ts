import { IsNotEmpty } from "class-validator/types/decorator/common/IsNotEmpty";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Unique } from "typeorm/decorator/Unique";

@Entity()
@Unique(['id'])
export class Setting {
    
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    value: string;
}
