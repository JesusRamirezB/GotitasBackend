import { IsNumber, IsNotEmpty } from 'class-validator';
import { Prisma } from 'generated/prisma'

export class CreatePaymentDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    amount: Prisma.Decimal;
}
