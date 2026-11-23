
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';
import { Transaction } from './entities/transaction.entity.js';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [
    {
      id: 1,
      title: 'Gaji Bulanan',
      amount: 5000000,
      type: 'income',
      category: 'Salary',
      date: '2026-11-01',
    },
    {
      id: 2,
      title: 'Belanja Bulanan',
      amount: 750000,
      type: 'expense',
      category: 'Food',
      date: '2026-11-03',
    },
    {
      id: 3,
      title: 'Freelance Project',
      amount: 1500000,
      type: 'income',
      category: 'Freelance',
      date: '2026-11-05',
    },
    {
      id: 4,
      title: 'Transportasi',
      amount: 200000,
      type: 'expense',
      category: 'Transport',
      date: '2026-11-07',
    },
    {
      id: 5,
      title: 'Internet Bulanan',
      amount: 300000,
      type: 'expense',
      category: 'Bills',
      date: '2026-11-10',
    },
  ];

  findAll(): Transaction[] {
    return this.transactions;
  }

  findOne(id: number): Transaction {
    const transaction = this.transactions.find(
      (item) => item.id === id,
    );

    if (!transaction) {
      throw new NotFoundException(
        `Transaction with ID ${id} not found`,
      );
    }

    return transaction;
  }

  create(dto: CreateTransactionDto): Transaction {
    const newTransaction: Transaction = {
      id:
        this.transactions.length > 0
          ? Math.max(...this.transactions.map((item) => item.id)) + 1
          : 1,
      ...dto,
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }

  update(
    id: number,
    dto: UpdateTransactionDto,
  ): Transaction {
    const transaction = this.findOne(id);

    Object.assign(transaction, dto);

    return transaction;
  }

  remove(id: number): { message: string } {
    const transaction = this.findOne(id);

    this.transactions = this.transactions.filter(
      (item) => item.id !== transaction.id,
    );

    return {
      message: `Transaction with ID ${id} deleted successfully`,
    };
  }
}