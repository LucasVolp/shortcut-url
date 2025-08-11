import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UrlStatus } from 'generated/prisma';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
    @ApiProperty({
        description: "The new original URL (optional)",
        example: "https://new-example.com",
        required: false,
    })
    @IsOptional()
    @IsString()
    originalUrl?: string;

    @ApiProperty({
        description: "The new short code for the URL (optional)",
        example: "xyz789",
        required: false,
    })
    @IsOptional()
    @IsString()
    shortCode?: string;

    @ApiProperty({
        description: "New custom alias for the URL (optional)",
        example: "my-new-custom-alias",
        required: false,
    })
    @IsOptional()
    @IsString()
    customAlias?: string;

    @ApiProperty({
        description: "New title for the URL (optional)",
        example: "My New Example URL",
        required: false,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        description: "New description for the URL (optional)",
        example: "This is a new example URL",
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: "URL Status (optional)",
        example: "ACTIVE",
        required: false,
    })
    @IsOptional()
    @IsEnum(UrlStatus)
    status?: UrlStatus;

    @ApiProperty({
        description: "New expiration date for the URL (optional)",
        example: "2024-12-31T23:59:59.999Z",
        required: false,
    })
    @IsOptional()
    @IsDateString()
    expiresAt?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    deletedAt?: string;

}
