import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateUrlDto {
    @ApiProperty({
        description: "The URL to be shortened",
        example: "https://example.com",})
    @IsString()
    originalUrl: string;

    @ApiProperty({
        description: "The short code for the URL",
        example: "abc123",
    })
    @IsString()
    shortCode: string;

    @ApiProperty({
        description: "Custom alias for the URL (optional)",
        example: "my-custom-alias",
        required: false,
    })
    @IsString()
    @IsOptional()
    customAlias?: string;

    @ApiProperty({
        description: "Title for the URL (optional)",
        example: "My Example URL",
        required: false,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        description: "Description for the URL (optional)",
        example: "This is an example URL",
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: "Expiration date for the URL (optional)",
        example: "2023-12-31T23:59:59.999Z",
        required: false,
    })
    @IsOptional()
    @IsDateString()
    expiresAt?: string;


}
