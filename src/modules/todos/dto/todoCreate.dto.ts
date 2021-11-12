import {IsString} from "class-validator";
import { Trim } from "class-sanitizer";

export class TodoCreateDto {
    @IsString()
    @Trim()
    public title:string;

    @IsString()
    @Trim()
    public content:string;
}