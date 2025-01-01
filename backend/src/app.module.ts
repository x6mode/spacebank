import { Module } from "@nestjs/common";

import { UsersModule } from "@apps/users/users.module";
import { TransactionsModule } from "@apps/transactions/transactions.module";

@Module({
  imports: [UsersModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
