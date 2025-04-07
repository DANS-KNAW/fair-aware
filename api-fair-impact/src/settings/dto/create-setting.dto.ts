import { PickType } from "@nestjs/mapped-types";
import { Setting } from "../entities/setting.entity";

export class CreateSettingDto extends PickType(Setting, 
    [
    'id', 
    'value',
    ] as const,
) {}