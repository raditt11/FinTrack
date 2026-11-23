import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  amount: number;

  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDateString()
  date: string;
}