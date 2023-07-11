import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { MYSQL_CONNECTION } from 'src/constants';
import * as schema from './schema';

@Module({
  providers: [
    {
      provide: MYSQL_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connection = await mysql.createConnection({
            host: 'http://localhost/',
            user: 'root',
            password: '',
            database:'drizzle_db'
        })
        /* 
        mysql.createConnection({
          host: configService.get<string>('DB_HOST'),
          user: configService.get<string>('DB_USER'),
          database: configService.get<string>('DB_NAME'),
          password: configService.get<string>('DB_PASSWORD'),
        });
        */

        return drizzle(connection, { schema });
      },
    },
  ],
  exports: [MYSQL_CONNECTION],
})
export class DrizzleModule {}
