import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from 'generated/prisma';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
        return this.paymentsService.createPayment(createPaymentDto);
    }

    @Get()
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(+id, updatePaymentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(+id);
    }
}
