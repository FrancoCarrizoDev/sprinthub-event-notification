import { Module } from '@nestjs/common';
import { SendGridService } from './send-grid.service';

@Module({
  providers: [SendGridService],
  exports: [SendGridService], // Exporta el servicio para usarlo en otros módulos
})
export class SendGridModule {}
