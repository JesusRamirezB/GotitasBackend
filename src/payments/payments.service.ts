import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Payment } from 'generated/prisma';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { userId, amount } = createPaymentDto;

        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new BadRequestException('User not found.');
            }

            const newPayment = await tx.payment.create({
                data: {
                    userId: userId,
                    amount: amount,
                },
            });

            const newBalance = user.balance.plus(amount);
            await tx.user.update({
                where: { id: userId },
                data: { balance: newBalance },
            });

            return newPayment;
        });
    }

    findAll() {
        return `This action returns all payments`;
    }

    findOne(id: number) {
        return `This action returns a #${id} payment`;
    }

    update(id: number, updatePaymentDto: UpdatePaymentDto) {
        return `This action updates a #${id} payment`;
    }

    remove(id: number) {
        return `This action removes a #${id} payment`;
    }
}
